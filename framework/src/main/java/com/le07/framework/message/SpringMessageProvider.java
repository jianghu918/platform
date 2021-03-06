package com.le07.framework.message;


import org.springframework.context.MessageSource;

import java.util.Locale;


public class SpringMessageProvider implements MessageProvider {

    private MessageSource messageSource;

    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    public String getMessage(String key) {
        return getMessage(key, null, null, null);
    }

    @Override
    public String getMessage(String key, Object[] args) {
        return getMessage(key, args, null, null);
    }

    @Override
    public String getMessage(String key, Object[] args, String defaultMessage) {
        return getMessage(key, args, defaultMessage, null);
    }

    @Override
    public String getMessage(String key, Object[] args, String defaultMessage, Locale locale) {
        return messageSource.getMessage(key, args, defaultMessage, locale);
    }
}
