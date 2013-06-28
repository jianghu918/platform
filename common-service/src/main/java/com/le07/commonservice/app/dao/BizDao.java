package com.le07.commonservice.app.dao;

import com.le07.commonservice.app.model.Biz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 简述
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-6-28
 * Time: 上午11:07
 */
@Repository
public interface BizDao extends JpaRepository<Biz, Long> {

}
