
package com.le07.framework.util;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;



public class ThreadPool {
    public static final ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() * 2);

    public static void execute(Runnable task) {
        executor.execute(task);
    }

    public static Future submit(Runnable task) {
        return executor.submit(task);
    }
}
