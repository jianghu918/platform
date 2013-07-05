package com.le07.commonservice.app.dao;

import com.le07.commonservice.app.model.Biz;
import com.le07.framework.global.type.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-6-28
 * Time: 上午11:07
 */
@Repository
public interface BizDao extends JpaRepository<Biz, Long> {

    @Modifying
    @Query("update Biz set status = ?1 where id in (?2)")
    void updateBizStatus(Status status, Long[] ids);

    @Query("select id from Biz where key = ?1")
    long getBizId(String key);

    @Query("select key from Biz where id = ?1")
    String getBizKey(long id);

}
