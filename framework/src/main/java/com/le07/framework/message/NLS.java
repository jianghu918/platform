package com.le07.framework.message;


import java.util.Locale;


public final class NLS {
    private static MessageProvider messageProvider;

    public void setMessageProvider(MessageProvider messageProvider) {
        NLS.messageProvider = messageProvider;
    }

    public static String getMessage(String key) {
        return getMessage(key, null, null, null);
    }

    public static String getMessage(String key, Object[] args) {
        return getMessage(key, args, null, null);
    }

    public static String getMessage(String key, Object[] args, String defaultMessage) {
        return getMessage(key, args, defaultMessage, null);
    }

    public static String getMessage(String key, Object[] args, String defaultMessage, Locale locale) {
        return messageProvider.getMessage(key, args, defaultMessage, locale);
    }

}
