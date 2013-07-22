package com.le07.commonservice.standard.manager.impl;

import com.google.common.collect.Lists;
import com.le07.commonservice.standard.dao.UnitDao;
import com.le07.commonservice.standard.manager.UnitManager;
import com.le07.commonservice.standard.model.Unit;
import com.le07.commonservice.util.BaseManagerImpl;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
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
    private UnitDao unitDao;

    @Override
    public Unit saveOrUpdate(Unit unit) {
        unit.setBizId(getBizId(unit.getBizKey()));
        Unit u = unitDao.save(unit);
        return u;
    }

    @Override
    public void updateStatus(long id, Status status) {
        Unit unit = get(id);
        unit.setStatus(status);
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
        return unitDao.listUnit(name, status, getBizId(bizKey), offset, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Unit get(long id) {
        return unitDao.get(id);
    }
}
