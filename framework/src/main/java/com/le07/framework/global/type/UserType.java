package com.le07.framework.global.type;

/**
 * Created with IDEA
 * User: jh
 * Date: 13-7-3
 * Time: 下午1:55
 */
public enum UserType implements LabeledEnum{

    ADMIN(0,"管理员"),
    BUSINESS(1,"商家"),
    INTERNAL(2,"商家内部用户"),
    CONSUMER(3,"普通用户");

    private int value;
    private String label;

    private UserType(int value, String label) {
        this.value = value;
        this.label = label;
    }


    public int getValue() {
        return this.value;
    }

    public String getLabel()
    {
        return this.label;
    }


    public static UserType findByValue(int value) {
        switch (value) {
            case 0:
                return ADMIN;
            case 1:
                return BUSINESS;
            case 2:
                return INTERNAL;
            case 3:
                return CONSUMER;
            default:
                return null;
        }
    }

}
