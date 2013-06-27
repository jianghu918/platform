package com.le07.framework.api.metadata;


import java.util.Collections;
import java.util.List;
import java.util.Map;


public class Package extends Node {
    public static final String JAVA_NS = "javans";
    public static final String CSHARP_NS = "csharpns";
    public static final String JS_NS = "jsns";
    public static final String PHP_NS = "phpns";
    private static final long serialVersionUID = 1967852210760220214L;

    private List<Field> consts = Collections.emptyList();
    private List<Enum> enums = Collections.emptyList();
    private List<Object> objects = Collections.emptyList();
    private List<Service> services = Collections.emptyList();
    private Map<String, String> namespaces = Collections.emptyMap();

    public List<Field> getConsts() {
        return consts;
    }

    public void setConsts(List<Field> consts) {
        this.consts = consts;
    }

    public List<Enum> getEnums() {
        return enums;
    }

    public void setEnums(List<Enum> enums) {
        this.enums = enums;
    }

    public List<Object> getObjects() {
        return objects;
    }

    public void setObjects(List<Object> objects) {
        this.objects = objects;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public Map<String, String> getNamespaces() {
        return namespaces;
    }

    public void setNamespaces(Map<String, String> namespaces) {
        this.namespaces = namespaces;
    }

    public Field getConst(String name) {
        return find(consts, name);
    }

    public Enum getEnum(String name) {
        return find(enums, name);
    }

    public Object getObject(String name) {
        return find(objects, name);
    }

    public Service getServices(String name) {
        return find(services, name);
    }

    public String getNamespace(String lang) {
        return namespaces.get(lang + "ns");
    }

    public boolean isHasType() {
        return !(consts.isEmpty() && enums.isEmpty() && objects.isEmpty());
    }

    public boolean isHasService() {
        return !services.isEmpty();
    }
}
