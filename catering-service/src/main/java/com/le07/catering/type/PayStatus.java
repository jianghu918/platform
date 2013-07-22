package com.le07.catering.type;

import com.le07.framework.global.type.LabeledEnum;

/**
 * 支付状态
 * Created with IDEA.
 * User: hu
 * Date: 13-7-22
 * Time: 上午10:50
 */
public enum PayStatus implements LabeledEnum{


    ;


    private int value;
    private String label;

    PayStatus(int value, String label)
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
