package com.le07.commonservice.comment.dao.impl;

import com.le07.commonservice.comment.dao.SpecificDao;
import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.SortType;
import com.le07.framework.message.NLS;
import com.le07.framework.support.hibernate.HibernateUtils;
import com.le07.framework.util.Page;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.MessageFormat;
import java.util.List;
import java.util.Map;

/**
 * JPA复杂查询实现
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-4
 * Time: 下午12:11
 */
@Repository(value = "specificCommentDaoImpl")
public class SpecificDaoImpl implements SpecificDao {
    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Comment> getComments(long bizId, String owner, int start, int size) {
        Assert.hasText(owner, NLS.getMessage("org.hibernate.validator.constraints.NotBlank.message"));
        Page<Comment> page = new Page<Comment>();

        StringBuffer jpql = new StringBuffer("select {0} from Comment c where c.bizId = ").append(bizId);
        jpql.append("and c.owner = ").append(owner);
        javax.persistence.Query q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"c"}));
        q.setFirstResult(start);
        q.setMaxResults(size);
        page.setItems(q.getResultList());

        q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"count(c)"}));
        page.setTotal((Integer) q.getSingleResult());
        return page;
    }

    @Override
    public Page<Comment> getUserComments(long bizId, long userId, int start, int size) {
        Page<Comment> page = new Page<Comment>();

        StringBuffer jpql = new StringBuffer("select {0} from Comment c where c.bizId = ").append(bizId);
        jpql.append("and c.userId = ").append(userId);
        javax.persistence.Query q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"c"}));
        q.setFirstResult(start);
        q.setMaxResults(size);
        page.setItems(q.getResultList());

        q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"count(c)"}));
        page.setTotal((Integer) q.getSingleResult());
        return page;
    }

    @Override
    public Map<String, Integer> getCommentCountMap(long bizId, List<String> owners) {
        Assert.notEmpty(owners, NLS.getMessage("org.hibernate.validator.constraints.NotEmpty.message"));
        StringBuffer jpql = new StringBuffer();
        jpql.append("select owner,count(id) from Comment where status=:status and bizId=:bizId and owner in(:owners) group by owner");

        javax.persistence.Query q = em.createQuery(jpql.toString());
        q.setParameter("bizId", bizId);
        q.setParameter("owners", owners);
        return HibernateUtils.toIntMap(q.getResultList());
    }

    @Override
    public Page<Comment> listComment(com.le07.commonservice.comment.util.Query query, long offset, long limit, List<SortType> sortTypes) {
        Page<Comment> page = new Page<Comment>();
        StringBuffer jpql = new StringBuffer("select {0} from Comment c where 1 = 1");
        if(null != query)
        {

        }

        javax.persistence.Query q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"c"}));
        q.setFirstResult((int)offset);
        q.setMaxResults((int)limit);
        page.setItems(q.getResultList());
        q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"count(c)"}));
        page.setTotal((Integer) q.getSingleResult());
        return page;
    }
}
