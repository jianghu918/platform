
package com.le07.framework.support.spring.tx;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import java.util.concurrent.*;


public class ThreadResourceSupportTaskScheduler extends ThreadPoolTaskScheduler {
    private static final long serialVersionUID = 3347419989136614868L;
    private ThreadResourceManager threadResourceManager;

    @Autowired
    public void setThreadResourceManager(ThreadResourceManager threadResourceManager) {
        this.threadResourceManager = threadResourceManager;
    }

    @Override
    protected ScheduledExecutorService createExecutor(int poolSize, ThreadFactory threadFactory, RejectedExecutionHandler rejectedExecutionHandler) {
        return new ScheduledThreadPoolExecutor(poolSize, threadFactory, rejectedExecutionHandler) {
            @Override
            public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit) {
                return super.schedule(TaskHelper.wrapTask(command, threadResourceManager), delay, unit);
            }

            @Override
            public <V> ScheduledFuture<V> schedule(Callable<V> callable, long delay, TimeUnit unit) {
                return super.schedule(TaskHelper.wrapTask(callable, threadResourceManager), delay, unit);
            }

            @Override
            public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit) {
                return super.scheduleAtFixedRate(TaskHelper.wrapTask(command, threadResourceManager), initialDelay, period, unit);
            }

            @Override
            public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit) {
                return super.scheduleWithFixedDelay(TaskHelper.wrapTask(command, threadResourceManager), initialDelay, delay, unit);
            }
        };
    }


}
