package com.le07.framework.api.metadata;


import java.util.List;


public class Service extends Node {
    private static final long serialVersionUID = 4853195290756666115L;
    private List<Method> methods;

    public List<Method> getMethods() {
        return methods;
    }

    public void setMethods(List<Method> methods) {
        this.methods = methods;
    }

    public Method getMethod(String name) {
        return find(methods, name);
    }
}
