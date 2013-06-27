package com.le07.framework.support.spring;


import org.springframework.beans.factory.FactoryBean;

import com.le07.framework.global.ServiceRegistry;
import com.le07.framework.global.ServiceRegistryFactory;



public class ServiceRegistryFactoryBean implements FactoryBean<ServiceRegistry> {
    @Override
    public ServiceRegistry getObject() throws Exception {
        return ServiceRegistryFactory.getInstance().getServiceRegistry();
    }

    @Override
    public Class<?> getObjectType() {
        return ServiceRegistry.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
