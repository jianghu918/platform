package com.le07.framework.api.metadata;


import java.util.List;

public class Object extends Node {
    private static final long serialVersionUID = -978582165329987451L;
    private boolean isEx;
    private List<Field> fields;

    public boolean isEx() {
        return isEx;
    }

    public void setEx(boolean ex) {
        isEx = ex;
    }

    public List<Field> getFields() {
        return fields;
    }

    public void setFields(List<Field> fields) {
        this.fields = fields;
    }

    public Field getField(String name) {
        return find(fields, name);
    }
}
