package com.le07.framework.support.spring.tx;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.List;


public class DefaultThreadResourceManager implements ThreadResourceManager {
    private static Logger LOG = LoggerFactory.getLogger(DefaultThreadResourceManager.class);
    private List<ResourceProvider> providers;

    public void setProviders(List<ResourceProvider> providers) {
        this.providers = providers;
    }

    @Override
    public boolean hasBind() {
        return TransactionSynchronizationManager.hasResource(this);
    }

    @Override
    public void bind() {
        TransactionSynchronizationManager.bindResource(this, this);
        for (ResourceProvider provider : providers) {
            Object resource = provider.getResource();
            if (resource != null) {
                TransactionSynchronizationManager.bindResource(provider.getKey(), resource);
            }
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public void unbind() {
        TransactionSynchronizationManager.unbindResource(this);
        for (ResourceProvider provider : providers) {
            try {
                Object key = provider.getKey();
                provider.releaseResource(key != null ? TransactionSynchronizationManager.unbindResource(key) : null);
            } catch (Throwable e) {
                LOG.error("Unbind resource error", e);
            }
        }
    }
}
