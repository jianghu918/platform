package com.le07.framework.global.type;

/**
 * 评分类型：
 * 环境，服务，味道等
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-7-20
 * Time: 下午8:05
 */
public enum RatingType implements LabeledEnum{
    DEFAULT(0,"默认"),
    TASTE(1,"味道"),
    ENVIRONMENT(2,"环境"),
    SERVICE(3,"服务")
    ;

    RatingType(int value, String label){
        this.value = value;
        this.label = label;
    }
    private int value;
    private String label;

    @Override
    public String getLabel() {
        return label;
    }

    @Override
    public int getValue() {
        return value;
    }

    public static RatingType findByValue(int value) {
        switch (value) {
            case 0:
                return DEFAULT;
            case 1:
                return TASTE;
            case 2:
                return ENVIRONMENT;
            case 3:
                return SERVICE;
            default:
                return DEFAULT;
        }
    }


}
