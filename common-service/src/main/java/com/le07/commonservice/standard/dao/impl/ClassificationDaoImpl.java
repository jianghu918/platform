package com.le07.commonservice.standard.dao.impl;

import com.google.common.collect.Lists;
import com.le07.commonservice.standard.dao.ClassificationDao;
import com.le07.commonservice.standard.model.Classification;
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
 * Classification Dao Implements
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午3:39
 */
@Repository
public class ClassificationDaoImpl extends HibernateEntityDAO<Classification, Long> implements ClassificationDao {

    @Override
    public List<Classification> listClassificationByPids(Set<Long> pids, long bizId, Set<Status> status) {
        List<Criterion> criterions = Lists.newArrayListWithCapacity(3);
        if(!CollectionUtils.isEmpty(pids))
            criterions.add(Restrictions.in("pid", pids));
        if(!CollectionUtils.isEmpty(status))
            criterions.add(Restrictions.in("status", status));
        criterions.add(Restrictions.eq("bizId", bizId));
        return query(newCriteria(criterions));
    }

    @Override
    public Page<Classification> listClassification(String name, Set<Status> status, long bizId, long offset, long size) {
        List<Criterion> criterions = Lists.newArrayListWithCapacity(3);
        if(StringUtils.isNotBlank(name))
            criterions.add(Restrictions.like("name", name));
        if(!CollectionUtils.isEmpty(status))
            criterions.add(Restrictions.in("status", status));
        criterions.add(Restrictions.eq("bizId", bizId));
        return pageQuery(newCriteria(criterions), (int)offset, (int)size);
    }
}
