package com.le07.framework.api.metadata;


import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.ToStringBuilder;


public class Node implements Serializable, Comparable<Node> {
    public static final char SEPARATOR = '.';
    private static final long serialVersionUID = -2661888485317160971L;
    private String id;
    private String name;
    private Doc doc;
    private Map<String, Object> attrs = new HashMap<String, Object>(4);
    private Node parent;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Doc getDoc() {
        return doc;
    }

    public void setDoc(Doc doc) {
        this.doc = doc;
    }

    public Map<String, Object> getAttrs() {
        return attrs;
    }

    public void setAttrs(Map<String, Object> attrs) {
        this.attrs = attrs;
    }

    public Node getParent() {
        return parent;
    }

    public void setParent(Node parent) {
        this.parent = parent;
        this.id = parent.getId() + SEPARATOR + name;
    }

    public void putAttr(String key, String value) {
        if (StringUtils.isNotEmpty(value)) {
            attrs.put(key, value);
        }
    }

    public boolean hasAttr(String key) {
        return attrs.containsKey(key);
    }

    public Object getAttr(String key) {
        return attrs.get(key);
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    public static <T extends Node> T find(List<T> list, String name) {
        if (list != null) {
            for (T el : list) {
                if (el.getName().equals(name)) {
                    return el;
                }
            }
        }
        return null;
    }

    @Override
    public int compareTo(Node o) {
        return name.compareTo(o.getName());
    }
}
