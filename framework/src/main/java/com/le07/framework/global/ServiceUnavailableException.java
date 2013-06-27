
package com.le07.framework.global;


public class ServiceUnavailableException extends RuntimeException {
    private static final long serialVersionUID = -3156649703805111048L;

    public ServiceUnavailableException() {
        super();
    }

    public ServiceUnavailableException(String message) {
        super(message);
    }

    public ServiceUnavailableException(Throwable cause) {
        super(cause);
    }

    public ServiceUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
