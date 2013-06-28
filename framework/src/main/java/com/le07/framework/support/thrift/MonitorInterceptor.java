package com.le07.framework.support.thrift;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import java.lang.management.ManagementFactory;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class MonitorInterceptor implements MethodInterceptor {
    protected static Logger LOG = LoggerFactory.getLogger(MonitorInterceptor.class);
    private final ConcurrentMap<String, Statistics> stats = new ConcurrentHashMap<String, Statistics>();
    private final String serviceName;
    protected final MBeanServer mbs;
    private static final byte[] LOCK = new byte[0];

    public MonitorInterceptor(String serviceName) {
        this.serviceName = serviceName;
        this.mbs = ManagementFactory.getPlatformMBeanServer();
    }

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        String methodName = invocation.getMethod().getName();
        Statistics stat = stats.get(methodName);
        if (stat == null) {
            stats.putIfAbsent(methodName, new Statistics());
            stat = stats.get(methodName);
            initJMX(stat, serviceName, methodName);
        }
        long start = System.currentTimeMillis();
        stat.incrementConcurrent(1);
        try {
            Object ret = invocation.proceed();
            stat.incrementSuccess(1);
            return ret;
        } finally {
            stat.incrementTotal(1);
            stat.incrementElapsed(System.currentTimeMillis() - start);
            stat.incrementConcurrent(-1);
        }
    }

    protected void initJMX(Statistics stat, String serviceName, String methodName) {
    	synchronized(LOCK){
	        try {
	            ObjectName name = new ObjectName("sanyuan.any123.thrift:" + "type=" + serviceName + ",name=" + methodName);
	            if (!this.mbs.isRegistered(name)) {
	                this.mbs.registerMBean(stat, name);
	            }
	        } catch (Exception e) {
	            LOG.error("Unable to start JMX", e);
	        }
    	}
    }
}
