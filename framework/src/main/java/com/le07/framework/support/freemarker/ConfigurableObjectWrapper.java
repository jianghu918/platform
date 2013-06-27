package com.le07.framework.support.freemarker;

import freemarker.template.DefaultObjectWrapper;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

import java.lang.reflect.Constructor;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


public class ConfigurableObjectWrapper extends DefaultObjectWrapper {

    private Map<Class, Class<TemplateModel>> classMapping = Collections.emptyMap();
    private Map<Class, Constructor> cache = new HashMap<Class, Constructor>();

    public void setClassMapping(Map<Class, Class<TemplateModel>> classMapping) {
        this.classMapping = classMapping;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected TemplateModel handleUnknownType(Object obj) throws TemplateModelException {
        Class clazz = obj.getClass();
        Constructor constructor = null;
        if (cache.containsKey(clazz)) {
            constructor = cache.get(clazz);
        } else {
            for (Map.Entry<Class, Class<TemplateModel>> entry : classMapping.entrySet()) {
                if (entry.getKey().isAssignableFrom(clazz)) {
                    constructor = entry.getValue().getConstructors()[0];
                    break;
                }
            }
            cache.put(clazz, constructor);
        }
        if (constructor != null) {
            try {
                return (TemplateModel) constructor.newInstance(obj, this);
            } catch (Exception ignored) {
            }
        }
        return super.handleUnknownType(obj);
    }
}
