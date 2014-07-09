package com.le07.framework.global.type;



public enum Status implements LabeledEnum {
	ENABLED(0,"正常"),
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


    public static Status findByValue(int value){
        switch (value){
            case 0:
                return ENABLED;
            case 1:
                return DISABLED;
            case 2:
                return DISABLED;
            default:
                return ENABLED;
        }
    }

}
