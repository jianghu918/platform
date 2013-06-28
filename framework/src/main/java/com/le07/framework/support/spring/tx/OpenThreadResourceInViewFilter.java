package com.le07.framework.support.spring.tx;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class OpenThreadResourceInViewFilter extends OncePerRequestFilter {

    public static final String DEFAULT_THREAD_RESOURCE_MANAGER_BEAN_NAME = "threadResourceManager";

    private String threadResourceManagerBeanName = DEFAULT_THREAD_RESOURCE_MANAGER_BEAN_NAME;


    public String getThreadResourceManagerBeanName() {
        return threadResourceManagerBeanName;
    }

    public void setThreadResourceManagerBeanName(String threadResourceManagerBeanName) {
        this.threadResourceManagerBeanName = threadResourceManagerBeanName;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        ThreadResourceManager resourceManager = lookupSessionFactory(request);
        boolean participate = false;
        if (resourceManager.hasBind()) {
            participate = true;
        } else {
            logger.debug("Bind threadResources in OpenThreadResourceInViewFilter");
            resourceManager.bind();
        }
        try {
            filterChain.doFilter(request, response);
        } finally {
            if (!participate) {
                logger.debug("Unbind threadResources in OpenThreadResourceInViewFilter");
                resourceManager.unbind();
            }
        }
    }

    protected ThreadResourceManager lookupSessionFactory(HttpServletRequest request) {
        return lookupThreadResourceManager();
    }

    protected ThreadResourceManager lookupThreadResourceManager() {
        if (logger.isDebugEnabled()) {
            logger.debug("Using ThreadResourceManager '" + getThreadResourceManagerBeanName() + "' for OpenThreadResourceInViewFilter");
        }
        WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
        return wac.getBean(getThreadResourceManagerBeanName(), ThreadResourceManager.class);
    }
}
