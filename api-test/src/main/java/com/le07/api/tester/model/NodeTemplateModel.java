package com.le07.api.tester.model;

import freemarker.ext.beans.BeanModel;
import freemarker.ext.beans.BeansWrapper;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;
import com.le07.framework.api.metadata.Doc;
import com.le07.framework.api.metadata.Node;

public class NodeTemplateModel extends BeanModel {

    public NodeTemplateModel(Object object, BeansWrapper wrapper) {
        super(object, wrapper);
    }

    @Override
    public TemplateModel get(String key) throws TemplateModelException {
        Node node = (Node) object;
        Doc doc = node.getDoc();
        Object v = null;
        if ("desc".equals(key)) {
            v = doc.getDesc();
        } else if ("label".equals(key)) {
            v = doc.getLabel();
        } else if (node.hasAttr(key)) {
            v = node.getAttr(key);
        } else if (doc.hasTag(key)) {
            v = doc.getTag(key);
        }
        return v != null ? wrap(v) : super.get(key);
    }
}
