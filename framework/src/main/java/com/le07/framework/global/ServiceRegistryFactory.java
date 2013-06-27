
package com.le07.framework.global;

import java.util.Iterator;
import java.util.ServiceLoader;


public final class ServiceRegistryFactory {
    private static ServiceRegistryFactory INSTANCE = new ServiceRegistryFactory();

    public static ServiceRegistryFactory getInstance() {
        return INSTANCE;
    }

    private ServiceRegistry serviceRegistry;

    private ServiceRegistryFactory() {
        Iterator<ServiceRegistry> iterator = ServiceLoader.load(ServiceRegistry.class).iterator();
        if (iterator.hasNext()) {
            serviceRegistry = iterator.next();
        } else {
            throw new ServiceUnavailableException("serviceRegistry not found");
        }
    }

    public ServiceRegistry getServiceRegistry() {
        return serviceRegistry;
    }
}
