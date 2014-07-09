package com.le07.commonservice.standard.manager.impl;

import com.google.common.collect.Lists;
import com.le07.commonservice.standard.dao.SpecificDao;
import com.le07.commonservice.standard.manager.UnitManager;
import com.le07.commonservice.standard.model.Unit;
import com.le07.commonservice.base.BaseManagerImpl;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Set;

/**
 * Unit Manager Implements
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午2:56
 */
@Service
@Transactional
public class UnitManagerImpl extends BaseManagerImpl implements UnitManager{

    @Autowired
    private SpecificDao specificDao;


    @Override
    public Unit saveOrUpdate(Unit unit) {
        unit.setBizId(getBizId(unit.getBizKey()));
        Unit u = unitDao.save(unit);
        return u;
    }

    @Override
    public void updateStatus(long id, Status status) {
        Unit unit = get(id);
        unit.setStatus(status.getValue());
        unitDao.save(unit);
    }

    @Override
    public void batchUpdateStatus(Set<Long> ids, Status status) {
        if(CollectionUtils.isEmpty(ids))
            return;
        List<Unit> units = Lists.newArrayListWithCapacity(ids.size());
        for (Long id : ids) {
            units.add(get(id));
        }
        unitDao.save(units);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Unit> listUnit(String name, Set<Status> status, String bizKey, long offset, long size) {
        return specificDao.listUnit(name, status, getBizId(bizKey), offset, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Unit get(long id) {
        return unitDao.findOne(id);
    }

    @Override
    public Unit save(Unit entity) {
        return unitDao.save(entity);
    }

    @Override
    public <S extends Unit> List<S> save(Iterable<S> entities) {
        return unitDao.save(entities);
    }

    @Override
    public void delete(Long id) {
        unitDao.delete(id);
    }

    @Override
    public void delete(Iterable<? extends Unit> entities) {
        unitDao.delete(entities);
    }

    @Override
    public Unit findOne(Long id) {
        return unitDao.findOne(id);
    }

    @Override
    public long count() {
        return unitDao.count();
    }

    @Override
    public Iterable<Unit> findAll(Iterable<? extends Long> ids) {
        return null;
    }

    @Override
    public Iterable<Unit> findAll(Sort orders) {
        return unitDao.findAll(orders);
    }

    @Override
    public org.springframework.data.domain.Page<Unit> findAll(Pageable pageable) {
        return unitDao.findAll(pageable);
    }
}
