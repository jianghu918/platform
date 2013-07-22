package com.le07.commonservice.standard.manager.impl;

import com.google.common.collect.Lists;
import com.le07.commonservice.standard.dao.ClassificationDao;
import com.le07.commonservice.standard.manager.ClassificationManager;
import com.le07.commonservice.standard.model.Classification;
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
 * Classification Manager Implements
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午3:40
 */
@Service
@Transactional
public class ClassificationManagerImpl extends BaseManagerImpl implements ClassificationManager {

    @Autowired
    private ClassificationDao classificationDao;

    @Override
    public Classification saveOrUpdate(Classification classification) {
        classification.setBizId(getBizId(classification.getBizKey()));
        Classification c = classificationDao.save(classification);
        return c;
    }

    @Override
    public void updateStatus(long id, Status status) {
        Classification c = get(id);
        c.setStatus(status);
        classificationDao.save(c);
    }

    @Override
    public void batchUpdateStatus(Set<Long> ids, Status status) {
        if(CollectionUtils.isEmpty(ids))
            return;
        List<Classification> classifications = Lists.newArrayListWithCapacity(ids.size());
        for (Long id : ids) {
            classifications.add(classificationDao.get(id));
        }
        classificationDao.save(classifications);
    }

    @Override
    public List<Classification> listClassificationByPids(Set<Long> pids, String bizKey, Set<Status> status) {
        return classificationDao.listClassificationByPids(pids, getBizId(bizKey), status);
    }

    @Override
    public Page<Classification> listClassification(String name, Set<Status> status, String bizKey, long offset, long size) {
        return classificationDao.listClassification(name, status, getBizId(bizKey), offset, size);
    }

    @Override
    public Classification get(long id) {
        return classificationDao.get(id);
    }
}
