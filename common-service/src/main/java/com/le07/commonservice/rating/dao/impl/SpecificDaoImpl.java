package com.le07.commonservice.rating.dao.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.rating.dao.SpecificDao;
import com.le07.commonservice.rating.model.Rating;
import com.le07.framework.message.NLS;
import com.le07.framework.support.hibernate.HibernateUtils;
import com.le07.framework.util.Page;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-4
 * Time: 下午5:44
 */
@Repository(value = "specificRatingDaoImpl")
public class SpecificDaoImpl implements SpecificDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Rating> getRatings(int bizId, List<Integer> types, long userId, int start, int size) {
        Page<Rating> page = new Page<Rating>();
        StringBuffer jpql = new StringBuffer("select {0} from Rating r where r.bizId =: bizId");
        jpql.append(" and r.types in(:types)");
        jpql.append(" and r.userId =: userId");
        Query q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"r"}));
        q.setParameter("bizId", bizId);
        q.setParameter("types", types);
        q.setParameter("userId", userId);
        q.setFirstResult(start);
        q.setMaxResults(size);
        page.setItems(q.getResultList());

        q = em.createQuery(MessageFormat.format(jpql.toString(), new String[]{"count(r)"}));
        page.setTotal((Integer) q.getSingleResult());
        return page;
    }

    @Override
    public Map<String, Integer> getScoreMap(int bizId, int type, long userId, List<String> owners) {
        Assert.notEmpty(owners, NLS.getMessage("org.hibernate.validator.constraints.NotEmpty.message"));
        String jpql = "select r.owner,r.score from Rating r where r.bizId=:bizId and r.type=:type and r.userId=:userId and r.owner in(:owners) group by r.owner";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setParameter("userId", userId);
        q.setParameter("owners", owners);

        return HibernateUtils.toIntMap(q.getResultList());
    }

    @Override
    public Map<String, Map<Integer, Integer>> getScoreDetailMap(int bizId, int type, List<String> owners) {
        String jpql = "select r.owner,r.score,count(r.id) from Rating r where r.bizId=:bizId and r.type=:type and r.owner in(:owners) group by r.owner,r.score";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setParameter("owners", owners);

        Map<String, Map<Integer, Integer>> map = Maps.newHashMap();
        for (Object[] arr : (List<Object[]>) q.getResultList()) {
            String owner = (String) arr[0];
            Map<Integer, Integer> map1 = map.get(owner);
            if (map1 == null) {
                map.put(owner, map1 = new HashMap<Integer, Integer>());
            }
            map1.put(HibernateUtils.getInt(arr[1]), HibernateUtils.getInt(arr[2]));
        }
        return map;
    }

    @Override
    public Map<String, Integer> getScoreCountMap(int bizId, int type, List<String> owners) {
        String jpql = "select r.owner,count(r.id) from Rating r where r.bizId=:bizId and r.type=:type and r.owner in(:owners) group by r.owner";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setParameter("owners", owners);

        return HibernateUtils.toIntMap(q.getResultList());
    }

    @Override
    public Map<String, Double> getScoreAverageMap(int bizId, int type, List<String> owners) {
        String jpql = "select r.owner,avg(r.id) from Rating r where r.bizId=:bizId and r.type=:type and r.owner in(:owners) group by r.owner";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setParameter("owners", owners);
        return HibernateUtils.toDoubleMap(q.getResultList());
    }

    @Override
    public Map<String, Double> getHotOwnerMap(int bizId, int type, int size) {
        String jpql = "select r.owner,avg(r.score) from Rating r where r.bizId=:bizId and r.type=:type group by r.owner order by avg(r.score) desc";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setFirstResult(0);
        q.setMaxResults(size);
        return HibernateUtils.toDoubleMap(q.getResultList());
    }

    @Override
    public Map<String, Double> getGreaterPercentMap(int bizId, int type, int score, List<String> owners) {
        String jpql = "select r.owner,r.count(r.id) from Rating r where r.bizId=:bizId and r.type=:type and r.owner in (:owners) group by r.owner";
        String jpql1 ="select r.owner,r.count(r,id) from Rating r where r.bizId=:bizId and r.type=:type and r.score>=:score and r.owner in (:owners) group by r.owner";
        Query totalQuery = em.createQuery(jpql);
        totalQuery.setParameter("bizId", bizId);
        totalQuery.setParameter("type", type);
        totalQuery.setParameter("owners", owners);

        Query greaterQuery = em.createQuery(jpql);
        greaterQuery.setParameter("bizId", bizId);
        greaterQuery.setParameter("type", type);
        greaterQuery.setParameter("score", score);
        greaterQuery.setParameter("owners", owners);

        Map<String, Integer> total = HibernateUtils.toIntMap(greaterQuery.getResultList());
        Map<String, Integer> greater = HibernateUtils.toIntMap(greaterQuery.getResultList());
        Map<String, Double> map = Maps.newHashMapWithExpectedSize(greater.size());
        for (Map.Entry<String, Integer> entry : greater.entrySet()) {
            String key = entry.getKey();
            map.put(key, entry.getValue() / (double) total.get(key));
        }
        return map;
    }

    @Override
    public Map<String, Double> getScoreMapByUidAndOwner(int bizId, int type, Set<String> owners, Set<Long> userIds) {
        String jpql = "select r.userId, r.owner, avg(r.score) from Rating r where  r.bizId=:bizId and r.type=:type and r.owner in(:owners) and r.userId in(:userIds) group by r.userId, owner";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setParameter("owners", owners);
        q.setParameter("userIds", userIds);

        Map<String, Double> map = Maps.newHashMap();
        for (Object[] arr : (List<Object[]>) q.getResultList()) {
            map.put(arr[0] + "_" + arr[1], HibernateUtils.getDouble(arr[2]));
        }
        return map;
    }

    @Override
    public Map<Long, Double> getScoreMapByUserIds(int bizId, int type, Set<String> owners, Set<Long> userIds) {
        String jpql = "select r.userId, r.score from Rating r where  r.bizId=:bizId and r.type=:type and r.owner in(:owners) and r.userId in(:userIds) group by r.userId";
        Query q = em.createQuery(jpql);
        q.setParameter("bizId", bizId);
        q.setParameter("type", type);
        q.setParameter("owners", owners);
        q.setParameter("userIds", userIds);

        return HibernateUtils.toDoubleMap1(q.getResultList());
    }
}
