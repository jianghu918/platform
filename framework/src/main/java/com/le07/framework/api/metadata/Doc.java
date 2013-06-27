package com.le07.framework.api.metadata;


import org.apache.commons.lang.builder.ToStringBuilder;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;


public class Doc implements Serializable {
    private static final long serialVersionUID = 7805090221981433539L;
    private String label;
    private String desc;
    private Map<String, String> tags = new LinkedHashMap<String, String>(4);

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Map<String, String> getTags() {
        return tags;
    }

    public void setTags(Map<String, String> tags) {
        this.tags = tags;
    }

    public boolean hasTag(String key){
        return tags.containsKey(key);
    }

    public String getTag(String key) {
        return tags.get(key);
    }

    public void putTag(String key, String value) {
        tags.put(key, value);
    }

    public void putTagIfAbsent(String key, String value) {
        if (!tags.containsKey(key)) {
            putTag(key, value);
        }
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
