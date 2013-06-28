package com.le07.framework.support.thrift;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.util.ClassUtils;


public class ClassLoaderInterceptor implements MethodInterceptor {
    private ClassLoader classLoader;

    public ClassLoaderInterceptor(ClassLoader classLoader) {
        this.classLoader = classLoader;
    }

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        ClassLoader originalClassLoader = ClassUtils.overrideThreadContextClassLoader(classLoader);
        try {
            return invocation.proceed();
        } finally {
            Thread.currentThread().setContextClassLoader(originalClassLoader);
        }
    }
}
