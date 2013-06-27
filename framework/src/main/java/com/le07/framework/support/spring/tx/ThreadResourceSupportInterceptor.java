
package com.le07.framework.support.spring.tx;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;


public class ThreadResourceSupportInterceptor implements MethodInterceptor {
    private ThreadResourceManager threadResourceManager;

    public ThreadResourceSupportInterceptor(ThreadResourceManager threadResourceManager) {
        this.threadResourceManager = threadResourceManager;
    }

    public void setThreadResourceManager(ThreadResourceManager threadResourceManager) {
        this.threadResourceManager = threadResourceManager;
    }

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        try {
            threadResourceManager.bind();
            return invocation.proceed();
        } finally {
            threadResourceManager.unbind();
        }
    }
}
