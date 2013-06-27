package com.le07.framework.message;


import java.util.Locale;


public interface MessageProvider {

    String getMessage(String key);

    String getMessage(String key, Object[] args);

    String getMessage(String key, Object[] args, String defaultMessage);

    String getMessage(String key, Object[] args, String defaultMessage, Locale locale);
}
