package com.le07.framework.global.type;



public enum Status implements LabeledEnum {
	ENABLED(0,"启用"),
    DISABLED(1,"停用"),
    DELETED(2,"删除");

    private int value;
	private String label;


	Status(int value,String title) {
        this.value = value;
		this.label = title;
	}

	public String getLabel() {
		return label;
	}

    public int getValue() {
        return this.value;
    }
}
