package com.le07.commonservice.app.dao;

import com.le07.commonservice.app.model.App;
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
 * Time: 上午11:06
 */
@Repository
public interface AppDao extends JpaRepository<App, Long> {

    @Modifying
    @Query("update App set status = ?1 where id in(?2)")
    void updateAppStatus(Status status, Long[] ids);
}
