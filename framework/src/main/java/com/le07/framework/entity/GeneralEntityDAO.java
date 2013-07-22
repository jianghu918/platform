
package com.le07.framework.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface GeneralEntityDAO<E, PK extends Serializable> {

    E save(E entity) throws EntityExistException;

    List<E> save(List<E> entities);

    void deleteByPk(PK id) throws EntityNotFoundException;

    void delete(E entity) ;

    void batchDeleteByPK(Collection<PK> ids) ;

    void batchDelete(Collection<E> entities) ;

    E get(PK id) throws EntityNotFoundException;

    E load(PK id) ;

    Map<PK, E> batchGet(Collection<PK> ids) throws EntityNotFoundException;

    List<E> getAll();

}
