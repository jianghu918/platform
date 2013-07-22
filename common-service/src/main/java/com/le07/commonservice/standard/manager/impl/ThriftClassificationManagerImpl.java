package com.le07.commonservice.standard.manager.impl;


import com.google.common.collect.Lists;
import com.le07.api.standard.Classification;
import com.le07.api.standard.ClassificationPage;
import com.le07.api.standard.ClassificationService;
import com.le07.api.type.AnyException;
import com.le07.api.type.Status;
import com.le07.commonservice.standard.manager.ClassificationManager;
import com.le07.commonservice.standard.util.ClassificationConverter;
import com.le07.framework.util.Page;
import com.le07.framework.util.ThriftUtils;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Thrift Classification Manager Implements
 * <p/>
 * User: 虎
 * Date: 13-7-17
 * Time: 下午9:19
 *
 */
@Service("thriftClassificationService")
public class ThriftClassificationManagerImpl implements ClassificationService.Iface{

    @Autowired
    private ClassificationManager manager;

    @Override
    public Classification saveOrUpdate(Classification classification) throws AnyException, TException {
        com.le07.commonservice.standard.model.Classification origin = null;
        if(classification.isSetId())
        {
            origin = manager.get(classification.getId());
        }
        return ClassificationConverter.toApiClassification(manager.saveOrUpdate(ClassificationConverter.toClassification(origin, classification)));
    }

    @Override
    public void updateStatus(long id, Status status) throws AnyException, TException {
        manager.updateStatus(id, ThriftUtils.toStatus(status));
    }

    @Override
    public void batchUpdateStatus(Set<Long> ids, Status status) throws AnyException, TException {
        manager.batchUpdateStatus(ids, ThriftUtils.toStatus(status));
    }

    @Override
    public Classification get(long id) throws AnyException, TException {
        return ClassificationConverter.toApiClassification(manager.get(id));
    }

    @Override
    public List<Classification> listClassificationByPids(Set<Long> pids, String bizKey, Set<Status> status) throws AnyException, TException {
        List<com.le07.commonservice.standard.model.Classification> classifications = manager.listClassificationByPids(pids, bizKey, ThriftUtils.toStatus(status));
        List<Classification> list = Lists.newArrayListWithCapacity(classifications.size());
        for (com.le07.commonservice.standard.model.Classification classification : classifications) {
            list.add(ClassificationConverter.toApiClassification(classification));
        }
        return list;
    }

    @Override
    public ClassificationPage listClassification(String name, Set<Status> status, String bizKey, long offset, long size) throws AnyException, TException {
        ClassificationPage classificationPage = new ClassificationPage();
        Page<com.le07.commonservice.standard.model.Classification> page = manager.listClassification(name, ThriftUtils.toStatus(status), bizKey, offset, size);
        classificationPage.setTotal(page.getTotal());
        classificationPage.setItems(ClassificationConverter.toApiClassifications(page.getItems()));
        return classificationPage;
    }
}
