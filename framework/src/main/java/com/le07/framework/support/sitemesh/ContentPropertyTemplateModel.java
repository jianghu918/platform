package com.le07.framework.support.sitemesh;

import freemarker.template.TemplateHashModel;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;
import freemarker.template.TemplateScalarModel;
import org.apache.commons.lang.StringUtils;
import org.sitemesh.content.Content;
import org.sitemesh.content.ContentChunk;
import org.sitemesh.content.ContentProperty;


public class ContentPropertyTemplateModel implements TemplateHashModel, TemplateScalarModel {

    private ContentProperty contentProperty;
    private ContentChunk data;

    public ContentPropertyTemplateModel(ContentProperty contentProperty) {
        this.contentProperty = contentProperty;
    }

    public ContentPropertyTemplateModel(Content content) {
        this.contentProperty = content.getExtractedProperties();
        this.data = content.getData();
    }

    public TemplateModel get(String key) throws TemplateModelException {
        return new ContentPropertyTemplateModel(contentProperty.getChild(key));
    }

    public boolean isEmpty() throws TemplateModelException {
        return contentProperty.hasChildren();
    }

    public String getAsString() throws TemplateModelException {
        return StringUtils.defaultString(data != null ? data.getValue() : contentProperty.getValue());
    }
}
