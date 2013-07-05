package com.le07.framework.global.type;

/**
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 上午10:58
 */
public enum Sort implements LabeledEnum{

    ASC(0,"ASC"),

    DESC(1,"DESC");

    private int value;
    private String label;

    Sort(int value, String label)
    {
        this.value = value;
        this.label = label;
    }

    @Override
    public String getLabel() {
        return null;
    }

    @Override
    public int getValue() {
        return 0;
    }
}
