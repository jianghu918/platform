package com.le07.framework.support.thrift;

public interface StatisticsMBean {

    long getTotal();

    long getSuccess();

    long getElapsed();

    int getConcurrent();
}
