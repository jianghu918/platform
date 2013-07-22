package com.le07.commonservice.standard.dao;

import com.le07.commonservice.standard.model.Classification;
import com.le07.framework.entity.GeneralEntityDAO;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;

import java.util.List;
import java.util.Set;

/**
 * Classification Dao
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午3:38
 */
public interface ClassificationDao extends GeneralEntityDAO<Classification, Long>{

    List<Classification> listClassificationByPids(Set<Long> pids, long bizId, Set<Status> status);

    Page<Classification> listClassification(String name, Set<Status> status, long bizId, long offset, long size);
}
