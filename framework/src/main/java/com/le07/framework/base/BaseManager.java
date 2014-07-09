package com.le07.framework.base;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.io.Serializable;
import java.util.List;

/**
 * Created with IDEA.
 * User: hu
 * Date: 13-8-6
 * Time: 下午5:09
 */
public interface BaseManager<T, ID extends Serializable> {
    T save(T entity);

    <S extends T> List<S> save(Iterable<S> entities);

    void delete(ID id);

    void delete(Iterable<? extends T> entities);


    T findOne(ID id);

    long count();

    Iterable<T> findAll(Iterable<? extends ID> ids);

    Iterable<T> findAll(Sort orders);

    Page<T> findAll(Pageable pageable);

}
