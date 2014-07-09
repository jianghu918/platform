package com.le07.commonservice.favorite.dao.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.favorite.dao.SpecificDao;
import com.le07.commonservice.favorite.model.Favorite;
import com.le07.framework.message.NLS;
import com.le07.framework.support.hibernate.HibernateUtils;
import com.le07.framework.util.Page;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-4
 * Time: 下午4:34
 */
@Repository(value = "specificFavoriteDaoImpl")
public class SpecificDaoImpl implements SpecificDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Favorite> getFavorites(long bizId, long userId, String keyword, int start, int size) {
        Page<Favorite> page = new Page<Favorite>();
        StringBuffer jpql = new StringBuffer("select {0} from Favorites f");
        jpql.append(" where f.bizId = ").append(bizId);
        jpql.append(" and f.userId = ").append(userId);
        if(StringUtils.isNotBlank(keyword))
        {
            jpql.append(" and f.title like ").append(keyword);
        }

        javax.persistence.Query q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"f"}));
        q.setFirstResult(start);
        q.setMaxResults(size);
        page.setItems(q.getResultList());

        q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"count(f)"}));
        page.setTotal((Integer) q.getSingleResult());
        return page;
    }

    @Override
    public Map<String, Integer> getFavoriteCountMap(long bizId, List<String> owners) {
        Assert.notEmpty(owners, NLS.getMessage("org.hibernate.validator.constraints.NotEmpty.message"));
        String jpql = "select f.owner, count(f.id) from Favorite f where f.bizId =: bizId and f.owner in(:owners) group by owner";
        javax.persistence.Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("owners", owners);
        return HibernateUtils.toIntMap(q.getResultList());
    }

    @Override
    public Page<Favorite> listFavorites(com.le07.commonservice.favorite.util.Query query, long offset, long limit) {
        Page<Favorite> page = new Page<Favorite>();
        StringBuffer jpql = new StringBuffer("select {0} from Favorite where 1=1");
        if(null != query)
        {

        }

        javax.persistence.Query q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"f"}));
        q.setFirstResult((int)offset);
        q.setMaxResults((int)limit);
        page.setItems(q.getResultList());

        q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"count(f)"}));
        page.setTotal((Integer) q.getSingleResult());

        return page;
    }

    @Override
    public List<Map<String, String>> getTopOwners(long bizId, int size) {
        String jpql = "SELECT f.owner, COUNT(f.owner) FROM Favorite f WHERE f.bizId = :bizId GROUP BY f.owner ORDER BY COUNT(f.owner) DESC";
        javax.persistence.Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setFirstResult(0);
        q.setMaxResults(size);
        List<Object[]> resultList = q.getResultList();
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        for (Object[] arr : resultList) {
            Map<String, String> map = Maps.newHashMapWithExpectedSize(2);
            map.put("owner", String.valueOf(arr[0]));
            map.put("count", String.valueOf(arr[1]));
            list.add(map);
        }
        return list;
    }
}
