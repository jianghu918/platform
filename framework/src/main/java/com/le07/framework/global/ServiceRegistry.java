package com.le07.framework.global;


import java.util.Collection;


public interface ServiceRegistry {

    <T> void exportService(Class<T> type, T service);

    <T> void unexportService(Class<T> type);

    <T> ServiceReference<T> getService(Class<T> type);

    Collection<ServiceReference> getServices();
}
