package com.le07.framework.api.metadata;


import java.util.HashMap;
import java.util.Map;


public class Field extends Node {
	private static final long serialVersionUID = 954175656707596954L;
	public static final Map<String, String> PRIMITIVE_DEFALUTS = new HashMap<String, String>();

	static {
		PRIMITIVE_DEFALUTS.put("bool", "true");
		PRIMITIVE_DEFALUTS.put("byte", "1");
		PRIMITIVE_DEFALUTS.put("i16", "1");
		PRIMITIVE_DEFALUTS.put("i32", "1");
		PRIMITIVE_DEFALUTS.put("i64", "1");
		PRIMITIVE_DEFALUTS.put("double", "1.0");
		PRIMITIVE_DEFALUTS.put("string", "\"STR\"");
		PRIMITIVE_DEFALUTS.put("binary", "\"bin\"");
		PRIMITIVE_DEFALUTS.put("Type.Timestamp", String.valueOf(System.currentTimeMillis()));
		PRIMITIVE_DEFALUTS.put("Type.Boolean", "1");
	}

	private int index;
	private String type;
	private String value;
	private boolean required;

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isRequired() {
		return required;
	}

	public void setRequired(boolean required) {
		this.required = required;
	}

	public boolean isPrimitiveType() {
		return PRIMITIVE_DEFALUTS.containsKey(type);
	}
}
