package com.le07.framework.context;

import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.bridge.SLF4JBridgeHandler;
import org.springframework.beans.CachedIntrospectionResults;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.core.env.AbstractEnvironment;
import org.springframework.util.ResourceUtils;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.le07.framework.Constants;


public class ContextLoaderListener extends ContextLoader implements ServletContextListener {
    private Logger logger;

    @Override
    public void contextInitialized(ServletContextEvent event) {
        initWebApplicationContext(event.getServletContext());
    }

    @Override
    public WebApplicationContext initWebApplicationContext(ServletContext servletContext) {
        //init config and profile
        GlobalConfigLoader.load();
        String activeProfile = System.getProperty(Constants.ANY_PROFILE_ACTIVE);
        if (activeProfile == null) {
            activeProfile = loadFromApplicationProperties(servletContext);
            if (activeProfile == null) {
                activeProfile = System.getProperty(AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME);
                if (activeProfile == null) {
                    activeProfile = servletContext.getInitParameter(AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME);
                    if (activeProfile == null) {
                        activeProfile = Constants.PROFILE_DEV;
                    }
                }
            }
        }
        if ("${profile.active}".equals(activeProfile)) {
            activeProfile = Constants.PROFILE_DEV;
        }
        System.setProperty(Constants.ANY_PROFILE_ACTIVE, activeProfile);
        System.setProperty(AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME, activeProfile);

        //init log
        if (System.getProperty(Constants.FILE_LOG) == null && activeProfile.contains(Constants.PROFILE_PRODUCTION)) {
            System.setProperty(Constants.FILE_LOG, "true");
        }
        if (!"true".equals(System.getProperty(Constants.FILE_LOG))) {
            System.clearProperty(Constants.FILE_LOG);
        }
        SLF4JBridgeHandler.install();
        logger = LoggerFactory.getLogger(getClass());

        //fix memleak
        CachedIntrospectionResults.acceptClassLoader(Thread.currentThread().getContextClassLoader());
        return super.initWebApplicationContext(servletContext);
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        try {
            closeWebApplicationContext(event.getServletContext());
        } finally {
            SLF4JBridgeHandler.uninstall();
            cleanup(event.getServletContext());
        }
    }

    @Override
    protected void customizeContext(ServletContext servletContext, ConfigurableWebApplicationContext applicationContext) {
        super.customizeContext(servletContext, applicationContext);
    }

    private String loadFromApplicationProperties(ServletContext sc) {
        String location = sc.getInitParameter("profileConfigFileLocation");
        if (location == null) {
            location = "classpath:/application.properties";
        }
        InputStream is = null;
        try {
            is = ResourceUtils.getURL(location).openStream();
            Properties props = new Properties();
            props.load(is);
            return (String) props.get(Constants.ANY_PROFILE_ACTIVE);
        } catch (Exception ignored) {
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException ignored) {
                }
            }
        }
        return null;
    }

    private void cleanup(ServletContext sc) {
        cleanupAttributes(sc);
        CachedIntrospectionResults.clearClassLoader(Thread.currentThread().getContextClassLoader());
    }

    private void cleanupAttributes(ServletContext sc) {
        Enumeration attrNames = sc.getAttributeNames();
        while (attrNames.hasMoreElements()) {
            String attrName = (String) attrNames.nextElement();
            if (attrName.startsWith("org.springframework.")) {
                Object attrValue = sc.getAttribute(attrName);
                if (attrValue instanceof DisposableBean) {
                    try {
                        ((DisposableBean) attrValue).destroy();
                    } catch (Throwable ex) {
                        logger.error("Couldn't invoke destroy method of attribute with name '" + attrName + "'", ex);
                    }
                }
            }
        }
    }
}
