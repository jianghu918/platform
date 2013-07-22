package com.le07.commonservice.standard.dao.impl;

import com.google.common.collect.Lists;
import com.le07.commonservice.standard.dao.UnitDao;
import com.le07.commonservice.standard.model.Unit;
import com.le07.framework.global.type.Status;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import com.le07.framework.util.Page;
import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Set;

/**
 * Unit Dao Implements
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午3:05
 */
@Repository
public class UnitDaoImpl extends HibernateEntityDAO<Unit, Long> implements UnitDao{

    @Override
    public Page<Unit> listUnit(String name, Set<Status> status, long bizId, long offset, long size) {
        List<Criterion> criterions = Lists.newArrayListWithCapacity(5);
        criterions.add(Restrictions.eq("bizId", bizId));

        if(StringUtils.isNotBlank(name))
            criterions.add(Restrictions.eq("name", name));
        if(!CollectionUtils.isEmpty(status))
            criterions.add(Restrictions.in("status", status));

        return pageQuery(newCriteria(criterions), (int)offset, (int)size);
    }

    @Override
    public long count() {
        return getTotalCount(newCriteria());
    }



}
