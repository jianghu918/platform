package com.le07.commonservice.standard.util;


import com.google.common.collect.Lists;
import com.le07.api.type.Status;
import com.le07.commonservice.standard.model.Classification;
import com.le07.framework.util.ThriftUtils;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;

/**
 * Classification Converter
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午2:42
 */
public class ClassificationConverter {

    public static Classification toClassification(Classification origin, com.le07.api.standard.Classification classification) {
        Classification entity = null != origin ? origin : new Classification();
        entity.setBizKey(classification.getBizKey());
        entity.setName(classification.getName());
        entity.setPid(classification.getPid());
        entity.setStatus(classification.getStatus().getValue());
        entity.setRemark(classification.getRemark());
        return entity;
    }

    public static com.le07.api.standard.Classification toApiClassification(Classification classification) {
        com.le07.api.standard.Classification entity = new com.le07.api.standard.Classification();
        entity.setId(classification.getId());
        entity.setBizKey(classification.getBizKey());
        entity.setName(classification.getName());
        entity.setPid(classification.getPid());
        entity.setStatus(Status.findByValue(classification.getStatus()));
        entity.setRemark(classification.getRemark());
        return entity;
    }

    public static List<com.le07.api.standard.Classification> toApiClassifications(List<Classification> classifications) {
        if(CollectionUtils.isEmpty(classifications))
            return Collections.EMPTY_LIST;
        List<com.le07.api.standard.Classification> list = Lists.newArrayListWithCapacity(classifications.size());
        for (Classification classification : classifications) {
            list.add(toApiClassification(classification));
        }
        return list;
    }
}
