package com.le07.framework.support.spring.tx;



public interface ResourceProvider<T> {

    Object getKey();

    T getResource();

    void releaseResource(T resource);
}
