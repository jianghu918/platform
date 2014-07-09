package com.le07.catering.manager.impl;

import com.le07.catering.dao.DishesDao;
import com.le07.catering.manager.DishesManager;
import com.le07.catering.model.Dishes;
import com.le07.commonservice.base.BaseManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-23
 * Time: 下午1:30
 */
@Service
@Transactional
public class DishesManagerImpl extends BaseManagerImpl implements DishesManager
{
    @Autowired
    private DishesDao dishesDao;

    @Override
    public Dishes save(Dishes entity) {
        return dishesDao.save(entity);
    }

    @Override
    public <S extends Dishes> List<S> save(Iterable<S> entities) {
        return dishesDao.save(entities);
    }

    @Override
    public void delete(Long id) {
         dishesDao.delete(id);
    }

    @Override
    public void delete(Iterable<? extends Dishes> entities) {

    }

    @Override
    public Dishes findOne(Long id) {
        return dishesDao.findOne(id);
    }

    @Override
    public long count() {
        return dishesDao.count();
    }

    @Override
    public Iterable<Dishes> findAll(Iterable<? extends Long> ids) {
        return dishesDao.findAll((Iterable<Long>) ids);
    }

    @Override
    public Iterable<Dishes> findAll(Sort orders) {
        return null;
    }

    @Override
    public Page<Dishes> findAll(Pageable pageable) {
        return dishesDao.findAll(pageable);
    }
}
