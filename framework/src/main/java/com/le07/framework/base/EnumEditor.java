package com.le07.framework.base;

import com.le07.framework.global.type.LabeledEnum;

import java.beans.PropertyEditorSupport;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-29
 * Time: 下午1:56
 */
public class EnumEditor extends PropertyEditorSupport {

    private Class clazz;
    public EnumEditor(Class clazz)
    {
        this.clazz = clazz;
    }

    @Override
    public String getAsText() {
        System.out.println("getAsText");
        return (getValue() == null ? "" : ((Enum<? extends LabeledEnum>) getValue()).name());
    }

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        System.out.println("setAsText:"+text);
        setValue(Enum.valueOf(clazz, text));
    }
}
