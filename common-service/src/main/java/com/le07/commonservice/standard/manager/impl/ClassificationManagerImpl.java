package com.le07.commonservice.standard.manager.impl;

import com.google.common.collect.Lists;
import com.le07.commonservice.standard.dao.SpecificDao;
import com.le07.commonservice.standard.manager.ClassificationManager;
import com.le07.commonservice.standard.model.Classification;
import com.le07.commonservice.base.BaseManagerImpl;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private SpecificDao specificDao;

    @Override
    public Classification saveOrUpdate(Classification classification) {
        classification.setBizId(getBizId(classification.getBizKey()));
        Classification c = classificationDao.save(classification);
        return c;
    }

    @Override
    public void updateStatus(long id, Status status) {
        Classification c = get(id);
        c.setStatus(status.getValue());
        classificationDao.save(c);
    }

    @Override
    public void batchUpdateStatus(Set<Long> ids, Status status) {
        if(CollectionUtils.isEmpty(ids))
            return;
        List<Classification> classifications = Lists.newArrayListWithCapacity(ids.size());
        for (Long id : ids) {
            classifications.add(classificationDao.findOne(id));
        }
        classificationDao.save(classifications);
    }

    @Override
    public List<Classification> listClassificationByPids(Set<Long> pids, String bizKey, Set<Status> status) {
        return classificationDao.listClassificationByPids(pids, getBizId(bizKey), status);
    }

    @Override
    public Page<Classification> listClassification(String name, Set<Status> status, String bizKey, long offset, long size) {
        return specificDao.listClassification(name, status, getBizId(bizKey), offset, size);
    }

    @Override
    public Classification get(long id) {
        return classificationDao.findOne(id);
    }

    @Override
    public List<Classification> findAll(Long companyId, Long pid) {
        return classificationDao.findAll(companyId, pid);
    }

    @Override
    public void deleteByPid(Long classificationId) {
        classificationDao.deleteByPid(classificationId);
    }

    @Override
    public Classification get_node(Long id, String bizKey) {
        return classificationDao.findOne(id);
    }

    @Override
    public List<Classification> get_children(Long pid, int typeId, String bizKey) {
        return StringUtils.isNotBlank(bizKey)
                ?  classificationDao.findByPidAndTypeAndBizId(pid, typeId, getBizId(bizKey))
                :  classificationDao.findByPidAndType(pid, typeId);
    }

    @Override
    public List<Classification> get_children(long pid, int typeId) {
        return classificationDao.findByPidAndType(pid, typeId);
    }

    @Override
    public boolean isParent(Long id) {
        return classificationDao.countWithPid(id) > 0;
    }

    @Override
    public void updateClassificationPid(Long id, Long pid) {
        classificationDao.updatePid(id, pid);
    }

    @Override
    public Classification save(Classification entity) {
        entity.setBizId(StringUtils.isNotBlank(entity.getBizKey()) ? getBizId(entity.getBizKey()) : 0);
        return classificationDao.save(entity);
    }

    @Override
    public <S extends Classification> List<S> save(Iterable<S> entities) {
        return classificationDao.save(entities);
    }

    @Override
    public void delete(Long id) {
        classificationDao.delete(id);
    }

    @Override
    public void delete(Iterable<? extends Classification> entities) {
        classificationDao.delete(entities);
    }

    @Override
    public Classification findOne(Long id) {
        return classificationDao.findOne(id);
    }

    @Override
    public long count() {
        return classificationDao.count();
    }

    @Override
    public Iterable<Classification> findAll(Iterable<? extends Long> ids) {
        return null;
    }

    @Override
    public Iterable<Classification> findAll(Sort orders) {
        return null;
    }

    @Override
    public org.springframework.data.domain.Page<Classification> findAll(Pageable pageable) {
        return classificationDao.findAll(pageable);
    }
}
