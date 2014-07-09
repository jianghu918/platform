package com.le07.commonservice.counter.dao;

import com.le07.commonservice.counter.model.Count;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-9
 * Time: 下午5:13
 */
@Repository
public interface CountDao extends JpaRepository<Count, Long>{

    @Query("select count(c) from Count c where c.bizId = ?1 and c.type = ?2 and c.owner = ?3")
    int getCount(int bizId, int type, String owner);

    @Modifying
    @Query("delete from Count c where c.id = ?1 and c.type = ?2 and c.owner = ?3")
    void resetCount(int bizId, int type, String owner);

    @Modifying
    @Query("update Count c set c.num = ?4 where c.id = ?1 and c.type = ?2 and c.owner = ?3")
    void increaseCount(int bizId, int type, String owner, int count);


}
