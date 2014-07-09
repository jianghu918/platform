package com.le07.commonservice.standard.dao;

import com.le07.commonservice.standard.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Unit Dao
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午3:04
 */
@Repository
public interface UnitDao extends JpaRepository<Unit, Long> {




}
