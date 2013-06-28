package com.le07.framework.support.thrift;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;


public class Statistics implements StatisticsMBean{
    private final AtomicLong total = new AtomicLong();
    private final AtomicLong success = new AtomicLong();
    private final AtomicLong elapsed = new AtomicLong();
    private final AtomicInteger concurrent = new AtomicInteger();

    public long getTotal() {
        return total.longValue();
    }

    public long getSuccess() {
        return success.longValue();
    }

    public long getElapsed() {
        return elapsed.longValue();
    }

    public int getConcurrent() {
        return concurrent.intValue();
    }

    public void incrementTotal(int delta) {
        total.addAndGet(delta);
    }

    public void incrementSuccess(int delta) {
        success.addAndGet(delta);
    }

    public void incrementElapsed(long delta) {
        elapsed.addAndGet(delta);
    }

    public void incrementConcurrent(int delta) {
        concurrent.addAndGet(delta);
    }

    public void reset() {
        total.set(0l);
        success.set(0l);
        elapsed.set(0l);
        concurrent.set(0);
    }
}
