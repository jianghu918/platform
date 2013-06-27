package com.le07.framework.ex;

public class AnyException extends RuntimeException implements ErrorCode {
	private static final long serialVersionUID = 4595549517180869921L;
	private int code = SERVER_ERROR;
	private Object args[];

	private boolean logStackTrace = true;

	private String renderedMessage;

	public AnyException() {
	}

	public AnyException(String message) {
		super(message);
	}

	public AnyException(String message, Throwable cause) {
		super(message, cause);
	}

	public AnyException(Throwable cause) {
		super(cause);
	}

	public AnyException(int code) {
		super();
		this.code = code;
	}

	public AnyException(int code, Throwable cause) {
		this(cause);
		this.code = code;
	}

	public AnyException(int code, String defaultMessage, Object... args) {
		super(defaultMessage);
		this.code = code;
		this.args = args;
	}

	public AnyException(int code, String defaultMessage, Throwable cause,
			Object... args) {
		super(defaultMessage, cause);
		this.code = code;
		this.args = args;
	}

	public int getCode() {
		return code;
	}

	public Object[] getArgs() {
		return args;
	}

	@Override
	public String getMessage() {
		if (renderedMessage == null) {
			renderedMessage = ExceptionUtils.buildMessage(code, args,
					super.getMessage(), getCause());
		}
		return renderedMessage;
	}

	@Override
	public String toString() {
		return getMessage();
	}

	public static AnyException fromRoot(Exception e) {
		return new AnyException(ExceptionUtils.getRootCause(e));
	}

	public void setRenderedMessage(String renderedMessage) {
		this.renderedMessage = renderedMessage;
	}

	public boolean isLogStackTrace() {
		return logStackTrace;
	}

	public void setLogStackTrace(boolean logStackTrace) {
		this.logStackTrace = logStackTrace;
	}

	public AnyException loggable(boolean loggable) {
		this.setLogStackTrace(loggable);
		return this;
	}

	
}