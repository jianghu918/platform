package com.le07.catering.type;

import com.le07.framework.global.type.LabeledEnum;

/**
 * 餐桌状态
 * 记录餐桌的用餐状态：0-空闲；1-用餐中；2-预定；3-禁用
 * Created with IDEA
 * User: 虎
 * Date: 13-7-21
 * Time: 下午10:46
 */
public enum BoardStatus implements LabeledEnum{

    DEFAULT(0,"空闲"),

    DINNER(1,"正在用餐中"),

    PREDETERMINE(2,"预定"),

    DISABLE(3,"禁用"),

    DELETE(4,"删除")
    ;

    private int value;
    private String label;

    BoardStatus(int value, String label){
        this.value = value;
        this.label = label;
    }


    @Override
    public String getLabel() {
        return label;
    }

    @Override
    public int getValue() {
        return value;
    }

    public static BoardStatus findByValue(int value){
        switch (value)
        {
            case 0 :
                return DEFAULT;
            case 1:
                return DINNER;
            case 2:
                return PREDETERMINE;
            case 3:
                return DISABLE;
            case 4:
                return DELETE;
            default:
                return DEFAULT;
        }
    }
}
