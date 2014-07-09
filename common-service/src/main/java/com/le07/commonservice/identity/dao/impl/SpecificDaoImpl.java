package com.le07.commonservice.identity.dao.impl;

import com.le07.commonservice.identity.dao.SpecificDao;
import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * JPA的一些复杂查询
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-3
 * Time: 下午1:51
 */
@Repository(value = "specificIdentityDaoImpl")
@SuppressWarnings("all")
public class SpecificDaoImpl implements SpecificDao{
    protected Logger LOG = LoggerFactory.getLogger(SpecificDaoImpl.class);
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> listUsers(Query query, long offset, long size) {
        javax.persistence.Query q = em.createQuery("select u from User u");
        q.setFirstResult((int) offset);
        q.setMaxResults((int) size);
        return q.getResultList();
    }
}
