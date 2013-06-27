
package com.le07.framework.support.spring.tx;


public interface ThreadResourceManager {

    boolean hasBind();

    void bind();

    void unbind();
}
