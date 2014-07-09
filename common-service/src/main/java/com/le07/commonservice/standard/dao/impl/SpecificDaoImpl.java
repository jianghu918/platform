package com.le07.commonservice.standard.dao.impl;

import com.le07.commonservice.standard.dao.SpecificDao;
import com.le07.commonservice.standard.model.Classification;
import com.le07.commonservice.standard.model.Unit;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.text.MessageFormat;
import java.util.Set;

/**
 * JPA复杂查询
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-3
 * Time: 下午4:49
 */
@Repository(value = "specificStandardDaoImpl")
public class SpecificDaoImpl implements SpecificDao{
    @PersistenceContext
    private EntityManager em;


    @Override
    public Page<Unit> listUnit(String name, Set<Status> status, long bizId, long offset, long size) {
        Page<Unit> page = new Page<Unit>();

        StringBuffer jpql = new StringBuffer("select {0} from Unit u where u.bizId =").append(bizId);
        if(StringUtils.isNotBlank(name))
        {
            jpql.append(" and u.name like ").append(name);
        }
        if(!CollectionUtils.isEmpty(status))
        {
            jpql.append(" and u.status in (").append(status).append(")");
        }

        Query q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"u"}));
        q.setFirstResult((int) offset);
        q.setMaxResults((int) size);
        page.setItems(q.getResultList());

        q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"count(u)"}));
        page.setTotal((Integer) q.getSingleResult());
        return page;
    }

    @Override
    public Page<Classification> listClassification(String name, Set<Status> status, long bizId, long offset, long size) {
        Page<Classification> page = new Page<Classification>();

        StringBuffer jpql = new StringBuffer("select {0} from Classificati c where c.bizId =").append(bizId);
        if(StringUtils.isNotBlank(name))
        {
            jpql.append(" and c.name like ").append(name);
        }
        if(!CollectionUtils.isEmpty(status))
        {
            jpql.append(" and c.status in (").append(status).append(")");
        }

        Query q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"c"}));
        q.setFirstResult((int) offset);
        q.setMaxResults((int) size);
        page.setItems(q.getResultList());

        q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"count(c)"}));
        page.setTotal((Integer) q.getSingleResult());
        return page;
    }
}
