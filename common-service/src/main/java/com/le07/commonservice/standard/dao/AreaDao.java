package com.le07.commonservice.standard.dao;

import com.le07.commonservice.standard.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午4:56
 */
@Repository
public interface AreaDao extends JpaRepository<Area, Long> {


    List<Area> findByPid(Long pid);

    @Query("select a from Area a where a.pid = ?1 and a.level <= ?2")
    List<Area> findByPid(Long pid, Long level);
}
