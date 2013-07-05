package com.le07.commonservice.identity.ex;

import com.le07.framework.ex.AnyException;

/**
 * Created with IDEA
 * User: jh
 * Date: 13-7-3
 * Time: 下午2:18
 */
public class IdentityException extends AnyException {

    private static final long serialVersionUID = -7577826293096868492L;

    public IdentityException() {
        super();
    }

    public IdentityException(int code, String defaultMessage, Object... args) {
        super(code, defaultMessage, args);
    }

    public IdentityException(int code, String defaultMessage,Throwable cause, Object... args) {
        super(code, defaultMessage, cause, args);
    }

    public IdentityException(int code) {
        super(code);
    }

    public IdentityException(String message, Throwable cause) {
        super(message, cause);
    }

    public IdentityException(String message) {
        super(message);
    }

    public IdentityException(Throwable cause) {
        super(cause);
    }

}
