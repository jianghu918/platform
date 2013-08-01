package com.le07.framework.support.thrift;

import com.le07.api.type.AnyException;
import com.le07.api.type.StackTrace;
import com.le07.framework.global.ServiceReference;
import com.le07.framework.global.ServiceRegistry;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.thrift.TApplicationException;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocolFactory;
import org.apache.thrift.transport.TTransport;
import org.springframework.aop.framework.ProxyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.remoting.RemoteAccessException;
import org.springframework.remoting.support.UrlBasedRemoteAccessor;
import org.springframework.util.Assert;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.rmi.ConnectException;
import java.util.List;

/**
 * Created with IDEA.
 * User: hu
 * Date: 13-8-1
 * Time: 上午9:44
 */
public abstract class ThriftClientInterceptor extends UrlBasedRemoteAccessor implements MethodInterceptor{
    private TProtocolFactory protocolFactory = new TBinaryProtocol.Factory(true, true);
    private Object serviceProxy;
    private Constructor<?> clientConstructor;
    private ServiceRegistry serviceRegistry;

    public void setProtocolFactory(TProtocolFactory protocolFactory) {
        this.protocolFactory = protocolFactory;
    }

    public Object getServiceProxy() {
        return serviceProxy;
    }

    @Autowired(required = false)
    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object invoke(MethodInvocation invocation) throws Throwable {
        Method method = invocation.getMethod();
        Object[] args = invocation.getArguments();
        if (serviceRegistry != null) {
            ServiceReference sr = serviceRegistry.getService(getServiceInterface());
            if (sr != null) {
                try {
                    return method.invoke(sr.getService(), args);
                } catch (InvocationTargetException e) {
                    throw e.getTargetException();
                }
            }
        }
        String name = method.getName();
        if (args.length == 0) {
            if ("toString".equals(name)) {
                return "Thrift proxy for service URL [" + getServiceUrl() + "]";
            } else if ("hashCode".equals(name)) {
                return getServiceUrl().hashCode();
            }
        } else if (args.length == 1 && "equals".equals(name)) {
            return getServiceUrl().equals(args[0]);
        }
        Object client = clientConstructor.newInstance(protocolFactory.getProtocol(getTransport()));
        Assert.notNull(client, "the Thrift RPC client was not correctly created. Aborting.");
        ClassLoader originalClassLoader = overrideThreadContextClassLoader();
        try {
            return method.invoke(client, args);
        } catch (InvocationTargetException e) {
            Throwable target = e.getTargetException();
            if (target instanceof TApplicationException && ((TApplicationException) target).getType() == TApplicationException.MISSING_RESULT) {
                return null;
            }
            throw convertException(target);
        } catch (Throwable ex) {
            throw convertException(ex);
        } finally {
            resetThreadContextClassLoader(originalClassLoader);
        }
    }

    @Override
    public void afterPropertiesSet() {
        super.afterPropertiesSet();
        if (getServiceInterface() == null) {
            throw new IllegalArgumentException("property serviceInterface is required.");
        }
        try {
            clientConstructor = ThriftHelper.getClientConstructor(getServiceInterface());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        ProxyFactory pf = new ProxyFactory(getServiceInterface(), this);
        this.serviceProxy = pf.getProxy(getBeanClassLoader());
    }

    protected RemoteAccessException convertException(Throwable ex) {
        if (ex instanceof AnyException) {
            throw recreateAnyException((AnyException) ex);
        } else if (ex instanceof TException) {
            throw new com.le07.framework.ex.AnyException("Thrift service invoker error", ex);
        } else if (ex instanceof ConnectException) {
            throw new com.le07.framework.ex.AnyException("Could not connect to remote service at [" + getServiceUrl() + "]", ex);
        } else {
            throw new com.le07.framework.ex.AnyException("Could not access HTTP invoker remote service at [" + getServiceUrl() + "]", ex);
        }
    }

    protected com.le07.framework.ex.AnyException recreateAnyException(AnyException ex) {
        com.le07.framework.ex.AnyException ae = new com.le07.framework.ex.AnyException(ex.getCode(), ex.getMsg());
        ae.setRenderedMessage(ex.getMsg());// force client not to build message from error properties
        List<StackTrace> list = ex.getStackTraces();
        if (list != null) {
            StackTraceElement[] clientStack = ae.getStackTrace();
            StackTraceElement[] serverStack = new StackTraceElement[list.size()];
            for (int i = 0, len = serverStack.length; i < len; i++) {
                StackTrace st = list.get(i);
                serverStack[i] = new StackTraceElement(st.getClassName(), st.getMethodName(), st.getFileName(), st.getLineNumber());
            }
            StackTraceElement[] combinedStack = new StackTraceElement[serverStack.length + clientStack.length + 1];
            System.arraycopy(serverStack, 0, combinedStack, 0, serverStack.length);
            combinedStack[serverStack.length] = new StackTraceElement("-----------------------------", "^server^.-----------------------------", "", -2);
            System.arraycopy(clientStack, 0, combinedStack, serverStack.length + 1, clientStack.length);
            ae.setStackTrace(combinedStack);
        }
        return ae;
    }

    protected abstract TTransport getTransport();
}
