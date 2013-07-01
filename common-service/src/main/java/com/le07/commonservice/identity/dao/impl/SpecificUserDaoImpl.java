package com.le07.commonservice.identity.dao.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.SimpleDateFormat;

/**
 * 复杂用户查询实现
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:05
 */
@Repository
@SuppressWarnings({"unchecked", "unused"})
public class SpecificUserDaoImpl {
    Logger log = LoggerFactory.getLogger(SpecificUserDaoImpl.class);
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    @PersistenceContext
    private EntityManager em;




}
