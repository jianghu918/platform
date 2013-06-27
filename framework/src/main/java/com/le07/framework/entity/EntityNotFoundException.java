
package com.le07.framework.entity;

import java.io.Serializable;

import com.le07.framework.ex.AnyException;


public class EntityNotFoundException extends AnyException {
    private static final long serialVersionUID = -316544274085347903L;

    public EntityNotFoundException(Class clazz, Serializable key) {
        super(ENTITY_NOT_FOUND, null, clazz.getSimpleName(), key);
    }
}
