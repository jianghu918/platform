package com.le07.framework.api.metadata;


import java.util.List;


public class Enum extends Node {
    private static final long serialVersionUID = -8063388033967273280L;
    private List<Field> fields;

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
