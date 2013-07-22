package com.le07.commonservice.standard.dao;

import com.le07.commonservice.standard.model.Area;
import com.le07.framework.entity.GeneralEntityDAO;

import java.util.List;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午4:56
 */
public interface AreaDao extends GeneralEntityDAO<Area, Long>{


    List<Area> findByPid(Long pid);

}
