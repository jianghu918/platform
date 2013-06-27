package com.le07.framework.api.metadata;


import java.util.List;


public class Method extends Node {
    private static final long serialVersionUID = -307396470197194760L;
    private String returntype;
    private List<Field> args;
    private List<Field> exs;

    public String getReturntype() {
        return returntype;
    }

    public void setReturntype(String returntype) {
        this.returntype = returntype;
    }

    public List<Field> getArgs() {
        return args;
    }

    public void setArgs(List<Field> args) {
        this.args = args;
    }

    public List<Field> getExs() {
        return exs;
    }

    public void setExs(List<Field> exs) {
        this.exs = exs;
    }

    public Field getArg(String name) {
        return find(args, name);
    }

    public Field getEx(String name) {
        return find(exs, name);
    }
}
