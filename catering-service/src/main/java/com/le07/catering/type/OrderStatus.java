package com.le07.catering.type;

import com.le07.framework.global.type.LabeledEnum;

/**
 * 订单状态
 * Created with IDEA.
 * User: hu
 * Date: 13-7-22
 * Time: 上午10:54
 */
public enum OrderStatus implements LabeledEnum{

    UNCONFIRMED(0, "未确认"),

    CONFIRMED(1, "已确认"),

    CANCEL(2, "取消"),

    COMPLETED(3, "完成")
    ;


    private int value;
    private String label;

    OrderStatus(int value, String label)
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

    public static OrderStatus findByValue(int value)
    {
        switch (value)
        {
            case 0 :
                return UNCONFIRMED;
            case 1 :
                return CONFIRMED;
            case 2 :
                return CANCEL;
            case 3 :
                return COMPLETED;
            default:
                return UNCONFIRMED;
        }
    }
}
