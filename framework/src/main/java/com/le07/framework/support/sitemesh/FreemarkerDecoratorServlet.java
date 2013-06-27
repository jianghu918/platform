package com.le07.framework.support.sitemesh;

import freemarker.cache.TemplateLoader;
import freemarker.ext.servlet.FreemarkerServlet;
import freemarker.log.Logger;
import freemarker.template.*;
import org.sitemesh.content.Content;
import org.sitemesh.content.memory.InMemoryContent;
import org.sitemesh.webapp.WebAppContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class FreemarkerDecoratorServlet extends FreemarkerServlet {
    private static final long serialVersionUID = 1650083915569192505L;
    private static final Logger logger = Logger.getLogger("freemarker.servlet");

    @Override
    protected Configuration createConfiguration() {
        WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
        if (context == null) {
            throw new IllegalStateException("Unable to find the WebApplicationContext in the Servlet Context");
        }
        return context.getBean(FreeMarkerConfigurer.class).getConfiguration();
    }

    @Override
    protected TemplateLoader createTemplateLoader(String templatePath) throws IOException {
        return getConfiguration().getTemplateLoader();
    }

    @Override
    protected ObjectWrapper createObjectWrapper() {
        return getConfiguration().getObjectWrapper();
    }

    @Override
    protected boolean preTemplateProcess(HttpServletRequest request, HttpServletResponse response, Template template, TemplateModel data) throws ServletException, IOException {
        SimpleHash hash = (SimpleHash) data;
        Content content = (Content) request.getAttribute(WebAppContext.CONTENT_KEY);
        if (content == null) {
            content = new InMemoryContent();
        }
        TemplateHashModel model = new ContentPropertyTemplateModel(content);
        hash.put("decorator", model);
        try {
            hash.put("_body", model.get("body"));
            hash.put("_meta", model.get("meta"));
            hash.put("_title", model.get("title"));
            hash.put("_head", model.get("head"));
        } catch (TemplateModelException e) {
            logger.error("Error to set decorator value", e);
        }
        return true;
    }
}
