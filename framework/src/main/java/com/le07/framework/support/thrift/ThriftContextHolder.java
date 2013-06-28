package com.le07.framework.support.thrift;

import org.springframework.core.NamedInheritableThreadLocal;
import org.springframework.util.CollectionUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public abstract class ThriftContextHolder {
	private static final String ATTR_APP_KEY = "appKey";
	private static final String ATTR_CLIENT_IP = "ip";

	private static final ThreadLocal<MultiValueMap<String, String>> requestHeadersHolder = new NamedInheritableThreadLocal<MultiValueMap<String, String>>(
			"Thrift context");

	public static void init() {
		requestHeadersHolder.set(new LinkedMultiValueMap<String, String>());
	}

	public static void reset() {
		requestHeadersHolder.remove();
	}

	// public static void setContext(MultiValueMap<String, String> context) {
	// if (context == null) {
	// resetContext();
	// } else {
	// requestHeadersHolder.set(context);
	// }
	// }

	public static MultiValueMap<String, String> getContext() {
		return requestHeadersHolder.get();
	}

	private static String getSingleValue(String key) {
		MultiValueMap<String, String> context = getContext();
		if (CollectionUtils.isEmpty(context))
			return null;

		return context.getFirst(key);
	}

	private static void setSingleValue(String key, String value) {
		MultiValueMap<String, String> context = getContext();
		if (context == null) {
			init();
			context = getContext();
		}

		context.set(key, value);
	}

	public static String getAppKey() {
		return getSingleValue(ATTR_APP_KEY);
	}

	public static void setAppKey(String appKey) {
		setSingleValue(ATTR_APP_KEY, appKey);
	}

	public static String getClientIP() {
		return getSingleValue(ATTR_CLIENT_IP);
	}

	public static void setClientIP(String ip) {
		setSingleValue(ATTR_CLIENT_IP, ip);
	}
}
