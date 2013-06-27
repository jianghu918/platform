
package com.le07.framework.support.freemarker;

import freemarker.template.Configuration;
import freemarker.template.ObjectWrapper;
import freemarker.template.TemplateException;

import java.io.IOException;


public class FreeMarkerConfigurer extends org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer {
    private ObjectWrapper objectWrapper;

    public void setObjectWrapper(ObjectWrapper objectWrapper) {
        this.objectWrapper = objectWrapper;
    }

    @Override
    protected void postProcessConfiguration(Configuration config) throws IOException, TemplateException {
        if (objectWrapper != null) {
            config.setObjectWrapper(objectWrapper);
        }
    }
}
