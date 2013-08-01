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

    NONPAYMENT(0, "未付款"),

    PAYMENT(1, "已付款")

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

    public static PayStatus findByValue(int value){
        switch (value)
        {
            case 0:
                return NONPAYMENT;
            case 1:
                return PAYMENT;
            default:
                return NONPAYMENT;
        }
    }

}
