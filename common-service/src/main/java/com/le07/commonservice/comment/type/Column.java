package com.le07.commonservice.comment.type;

import com.le07.framework.global.type.LabeledEnum;

/**
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 上午11:05
 */
public enum Column implements LabeledEnum {

    /**
     * ID
     */
    ID(0, "id"),
    /**
     * BIZKEY
     */
    BIZKEY(1, "bizId"),
    /**
     * OWNER
     */
    OWNER(2, "owner"),
    /**
     * USERID
     */
    USERID(3, "userId"),
    /**
     * PARENTID
     */
    PARENTID(4, "parentId"),
    /**
     * TITLE
     */
    TITLE(5, "title"),
    /**
     * BODY
     */
    BODY(6, "body"),
    /**
     * CREATEAT
     */
    CREATEAT(7, "createAt"),
    /**
     * STATUS
     */
    STATUS(8, "status");

    private int value;
    private String label;

    Column(int value, String label) {
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
