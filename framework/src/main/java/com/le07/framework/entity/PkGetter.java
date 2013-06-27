
package com.le07.framework.entity;

import java.io.Serializable;


public interface PkGetter<E, PK extends Serializable> {
    PK getPK(E entity);
}
