
package com.le07.framework.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;


public interface GeneralEntityDAO<E, PK extends Serializable> {

    E save(E entity) throws Exception;

    void deleteByPk(PK id) throws Exception;

    void delete(E entity) throws Exception;

    void batchDeleteByPK(Collection<PK> ids) throws Exception;

    void batchDelete(Collection<E> entities) throws Exception;

    E get(PK id) throws EntityNotFoundException;

    E load(PK id) throws Exception;

    Map<PK, E> batchGet(Collection<PK> ids) throws EntityNotFoundException;

    List<E> getAll();
}
