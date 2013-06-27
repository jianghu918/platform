
package com.le07.framework.support.spring.tx;

import java.util.concurrent.Callable;


public class TaskHelper {
    private TaskHelper() {
    }

    public static Runnable wrapTask(final Runnable task, final ThreadResourceManager resourceManager) {
        return new Runnable() {
            @Override
            public void run() {
                try {
                    resourceManager.bind();
                    task.run();
                } finally {
                    resourceManager.unbind();
                }
            }
        };
    }

    public static <V> Callable<V> wrapTask(final Callable<V> callable, final ThreadResourceManager resourceManager) {
        return new Callable<V>() {
            @Override
            public V call() throws Exception {
                try {
                    resourceManager.bind();
                    return callable.call();
                } finally {
                    resourceManager.unbind();
                }
            }
        };
    }
}
