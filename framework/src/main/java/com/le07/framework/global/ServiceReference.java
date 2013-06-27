
package com.le07.framework.global;


public interface ServiceReference<T> {

    T getService() throws ServiceUnavailableException;

    void destroy();
}
