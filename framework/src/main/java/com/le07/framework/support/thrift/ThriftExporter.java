package com.le07.framework.support.thrift;

import com.le07.framework.global.ServiceRegistry;
import com.le07.framework.support.spring.tx.ThreadResourceManager;
import com.le07.framework.support.spring.tx.ThreadResourceSupportInterceptor;
import org.aopalliance.intercept.MethodInterceptor;
import org.apache.commons.lang.ArrayUtils;
import org.apache.thrift.TProcessor;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.protocol.TProtocolFactory;
import org.springframework.aop.framework.ProxyFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.remoting.support.RemoteExporter;

import java.util.ArrayList;
import java.util.List;


public class ThriftExporter extends RemoteExporter implements InitializingBean, DisposableBean {
	private TProtocolFactory protocolFactory = new TBinaryProtocol.Factory(true, true);
	private TProcessor processor;
	private Object[] interceptors = new Object[] {};
	private ServiceRegistry serviceRegistry;
	private ThreadResourceManager threadResourceManager;
	private boolean proxyTargetClass = true;
	private boolean enableMonitor = true;
	private boolean registered = true; // 标识是否需要注册到serviceRegistry，默认为true

	public void setProtocolFactory(TProtocolFactory inProtocolFactory) {
		this.protocolFactory = inProtocolFactory;
	}

	public TProtocolFactory getProtocolFactory() {
		return protocolFactory;
	}

	public void setProcessor(TProcessor processor) {
		this.processor = processor;
	}

	@Override
	public void setInterceptors(Object[] interceptors) {
		this.interceptors = interceptors;
	}

	@Autowired(required = false)
	public void setServiceRegistry(ServiceRegistry serviceRegistry) {
		this.serviceRegistry = serviceRegistry;
	}

	@Autowired(required = false)
	public void setTransactionManager(ThreadResourceManager threadResourceManager) {
		this.threadResourceManager = threadResourceManager;
	}

	protected void doInvoke(TProtocol in, TProtocol out) throws Throwable {
		processor.process(in, out);
	}

	public void setProxyTargetClass(boolean proxyTargetClass) {
		this.proxyTargetClass = proxyTargetClass;
	}

	public void setEnableMonitor(boolean enableMonitor) {
		this.enableMonitor = enableMonitor;
	}

	@Override
	@SuppressWarnings("unchecked")
	public void afterPropertiesSet() throws Exception {
		MonitorInterceptor monitorInterceptor = new MonitorInterceptor(getServiceInterface().getName());
		if (serviceRegistry != null) {
			List<MethodInterceptor> il = new ArrayList<MethodInterceptor>();
			il.add(new ClassLoaderInterceptor(getBeanClassLoader()));
			if (enableMonitor) {
				il.add(monitorInterceptor);
			}
			if (threadResourceManager != null) {
				il.add(new ThreadResourceSupportInterceptor(threadResourceManager));
			}

			if (this.registered) {
				serviceRegistry.exportService(getServiceInterface(), getProxyForService0(il));
			}
		}
		Object[] interceptors0 = ArrayUtils.add(interceptors, 0, monitorInterceptor);
		interceptors0 = ArrayUtils.add(interceptors0, new ExceptionConvertInterceptor());
		super.setInterceptors(interceptors0);
		this.processor = ThriftHelper.buildProcessor(getServiceInterface(), getProxyForService());
	}

	@Override
	@SuppressWarnings("unchecked")
	public void destroy() throws Exception {
		if (serviceRegistry != null && this.registered) {
			serviceRegistry.unexportService(getServiceInterface());
		}
	}

	private Object getProxyForService0(List<MethodInterceptor> interceptors) {
		ProxyFactory proxyFactory = new ProxyFactory();
		proxyFactory.addInterface(getServiceInterface());
		for (MethodInterceptor interceptor : interceptors) {
			proxyFactory.addAdvice(interceptor);
		}
		proxyFactory.setTarget(getService());
		proxyFactory.setOptimize(proxyTargetClass);
		proxyFactory.setProxyTargetClass(proxyTargetClass);
		return proxyFactory.getProxy(getBeanClassLoader());
	}

	public void setRegistered(boolean registered) {
		this.registered = registered;
	}
}
