package com.le07.commonservice.standard.dao;

import com.le07.commonservice.standard.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 简述
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-7-1
 * Time: 下午4:56
 */
@Repository
public interface AreaDao extends JpaRepository<Area, Long>{


    List<Area> findByPid(Long pid);

}
