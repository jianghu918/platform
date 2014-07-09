package com.le07.catering.web.controller;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.StringUtils;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import javax.servlet.ServletContext;
import java.io.File;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-18
 * Time: 上午9:55
 */
public class StaticResourceMappingManagerImpl implements StaticResourceMappingManager,
        ServletContextAware, ApplicationContextAware, InitializingBean{
    private ApplicationContext applicationContext;
    private ServletContext servletContext;
    private ResourceLoader resourceLoader = new DefaultResourceLoader();
    private String DEFAULT_UPLOAD_PATH;
    private int cacheSeconds = 31556926;



    private void initStaticResourceHandlerMapping() {
        Map<String, HttpRequestHandler> urlMap = new LinkedHashMap<String, HttpRequestHandler>();
        ResourceHttpRequestHandler requestHandler = new ResourceHttpRequestHandler();
        //file system
        requestHandler.setLocations(Collections.singletonList(resourceLoader.getResource(StringUtils.cleanPath(DEFAULT_UPLOAD_PATH) + File.separator)));
        requestHandler.setCacheSeconds(cacheSeconds);
        requestHandler.setServletContext(servletContext);
        requestHandler.setApplicationContext(applicationContext);
        urlMap.put("/attached/**", requestHandler);

        SimpleUrlHandlerMapping handlerMapping = new SimpleUrlHandlerMapping();
        handlerMapping.setUrlMap(urlMap);
        applicationContext.getAutowireCapableBeanFactory().initializeBean(
                handlerMapping, null);
        ConfigurableApplicationContext configurableApplicationContext = (ConfigurableApplicationContext) applicationContext;
        DefaultListableBeanFactory defaultListableBeanFactory =
                (DefaultListableBeanFactory) configurableApplicationContext.getBeanFactory();
        defaultListableBeanFactory.registerSingleton("fileResourceHandlerMapping", handlerMapping);

        // refresh context
        applicationContext.publishEvent(new ContextRefreshedEvent(
                applicationContext));

    }

    public void afterPropertiesSet() throws Exception {
        DEFAULT_UPLOAD_PATH = servletContext.getContextPath() + "/attached/";
        initStaticResourceHandlerMapping();
    }


    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
         this.applicationContext = applicationContext;
    }

    @Override
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }
}
