package com.le07.commonservice.standard.dao;

import com.le07.commonservice.standard.model.Classification;
import com.le07.framework.global.type.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
@Repository
public interface ClassificationDao extends JpaRepository<Classification, Long> {

    @Query("select c from Classification c where c.pid in(?1) and c.bizId = ?2 and c.status in(?3)")
    List<Classification> listClassificationByPids(Set<Long> pids, long bizId, Set<Status> status);

    @Query("select c from Classification  c where c.pid = ?2 and c.bizId = ?1")
    List<Classification> findAll(Long bizId, Long pid);

    @Query("select c from Classification c where c.pid = ?1 and c.type = ?2 and c.bizId = ?3")
    List<Classification> findByPidAndTypeAndBizId(Long pid, int typeId, Long bizId);

    @Query("select count(c) from Classification c where c.pid = ?1")
    long countWithPid(Long id);

    @Modifying
    @Query("delete from Classification c where c.pid = ?1")
    void deleteByPid(Long classificationId);

    @Modifying
    @Query("update Classification c set c.pid = ?2 where c.id = ?1")
    void updatePid(Long id, Long pid);

    List<Classification> findByPidAndType(long pid, int typeId);
}
