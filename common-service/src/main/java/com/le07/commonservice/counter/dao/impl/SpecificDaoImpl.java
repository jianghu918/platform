package com.le07.commonservice.counter.dao.impl;

import com.le07.commonservice.counter.dao.SpecificDao;
import com.le07.framework.message.NLS;
import com.le07.framework.support.hibernate.HibernateUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * JPA复杂查询实现
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-4
 * Time: 下午4:10
 */
@Repository(value = "specificCounterDaoImpl")
public class SpecificDaoImpl implements SpecificDao{

    @PersistenceContext
    private EntityManager em;


    @Override
    public Map<String, Integer> getCountMap(int bizId, int type, Collection<String> owners) {
        Assert.notEmpty(owners, NLS.getMessage("org.hibernate.validator.constraints.NotEmpty.message"));
        String jpql = "select owner,sum(num) from Count where bizId=:bizId and type=:type and owner in(:owners) group by owner";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setParameter("owners", owners);

        return HibernateUtils.toIntMap(q.getResultList());
    }

    @Override
    public List<String> getHotOwner(int bizId, int type, int size, int algorithm) {
        String jpql = "select c.owner from Count c where c.bizId=:bizId and c.type=:type group by c.owner order by sum(c.num) desc";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setMaxResults(size);
        return q.getResultList();
    }

    @Override
    public void upgrade0() {

    }
}
