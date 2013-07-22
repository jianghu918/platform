package com.le07.commonservice.standard.dao;

import com.le07.commonservice.standard.model.Unit;
import com.le07.framework.entity.GeneralEntityDAO;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;

import java.util.Set;

/**
 * Unit Dao
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午3:04
 */
public interface UnitDao extends GeneralEntityDAO<Unit, Long>{


    Page<Unit> listUnit(String name, Set<Status> status, long bizId, long offset, long size);

    long count();
}
