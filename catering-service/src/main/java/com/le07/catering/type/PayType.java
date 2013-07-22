package com.le07.catering.type;

import com.le07.framework.global.type.LabeledEnum;

/**
 * 支付类型
 * Created with IDEA.
 * User: hu
 * Date: 13-7-22
 * Time: 上午10:36
 */
public enum PayType implements LabeledEnum{
    DEFAULT(0, "到店结算"),

    //cash on delivery
    COD(1, "货到付款"),

    BALANCE(2, "余额付款"),

    ALIPAY(3, "支付宝"),

    TENPAY(4, "财付通"),

    BANK(5, "银行汇款/转帐"),

    PAYPAL(6, "银联")


    ;

    private int value;
    private String label;

    PayType(int value, String label)
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


    public static PayType findByValue(int value){
        switch (value){
            case 0:
                return DEFAULT;
            case 1:
                return COD;
            case 2:
                return BALANCE;
            case 3:
                return ALIPAY;
            case 4:
                return TENPAY;
            case 5:
                return BANK;
            case 6:
                return PAYPAL;
            default:
                return DEFAULT;
        }
    }

}
