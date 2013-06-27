
package com.le07.framework.entity;

import com.le07.framework.util.Loader;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;


public interface EntityCache<E, PK extends Serializable> {

    E save(E entity) throws Exception;

    void deleteByPK(PK id) throws Exception;

    void delete(E entity);

    void batchDelete(Collection<E> entities);

    void batchDeleteByPK(Collection<PK> ids);

    void evict(String region, Serializable... keys);

    void clear(String region);

    E get(PK id);

    E load(PK id) throws Exception;

    Map<PK, E> batchGet(Collection<PK> ids);

    E get(String region, Loader<E> loader, Serializable... keys);

    List<E> getList(String region, Loader<List<E>> loader, Serializable... keys);

    Map<PK, E> getMap(String region, Loader<Map<PK, E>> loader, Serializable... keys);
}
