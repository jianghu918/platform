package com.le07.commonservice.app.dao;

import com.le07.commonservice.app.model.Biz;
import com.le07.framework.entity.GeneralEntityDAO;
import com.le07.framework.global.type.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-6-28
 * Time: 上午11:07
 */
@Repository
public interface BizDao extends GeneralEntityDAO<Biz, Long> {

    void updateBizStatus(Status status, Long[] ids);

    long getBizId(String key);

    String getBizKey(long id);

    List<Biz> getAppBizs(long appId);
}
