package com.le07.framework.global.type;



public enum Status implements LabeledEnum {
	ENABLED("启用"),
    DISABLED("停用"),
    DELETED("删除");
	private String label;

	Status(String title) {
		this.label = title;
	}

	public String getLabel() {
		return label;
	}
}
