package com.le07.framework.support.thrift;


import com.le07.framework.util.ThriftUtils;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

public class ExceptionConvertInterceptor implements MethodInterceptor{
    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        try {
            return invocation.proceed();
        } catch (Throwable ex) {
            throw ThriftUtils.wrapEx(ex);
        }
    }
}
