package com.le07.commonservice.rating.dao.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.rating.dao.RatingDao;
import com.le07.commonservice.rating.model.Rating;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import com.le07.framework.support.hibernate.HibernateUtils;
import com.le07.framework.util.Page;
import org.apache.commons.collections.CollectionUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Dao Impl
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 上午10:40
 */
@Repository
public class RatingDaoImpl extends HibernateEntityDAO<Rating, Long> implements RatingDao{


    @Override
    public void updateRating(Rating rating) {
        Rating dbRating = getRating(rating.getBizId(), rating.getType(), rating.getOwner(), rating.getUserId());
        if (dbRating != null) {
            rating.setId(dbRating.getId());
        }
        merge(rating);
    }

    @Override
    public Page<Rating> getRatings(int bizId, List<Integer> types, long userId, int start, int size) {
        Criteria criteria = newCriteria(Restrictions.eq("bizId", bizId), Restrictions.eq("userId", userId));
        if (CollectionUtils.isNotEmpty(types)) {
            criteria.add(Restrictions.in("type", types));
        }
        criteria.addOrder(Order.desc("updateAt"));
        return pageQuery(criteria, start, size);
    }

    @Override
    public Rating getRating(int bizId, int type, String owner, long userid) {
        return unique(newCriteria(
                Restrictions.eq("bizId", bizId),
                Restrictions.eq("type", type),
                Restrictions.eq("owner", owner),
                Restrictions.eq("userId", userid)));
    }

    @Override
    public Map<String, Integer> getScoreMap(int bizId, int type, long userId, List<String> owners) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(4);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("userId", userId);
        args.put("owners", owners);
        Query query = newHqlQuery("select owner,score from Rating where bizId=:bizId and type=:type and userId=:userId and owner in(:owners) group by owner", args);
        return HibernateUtils.toIntMap(query.list());
    }

    @Override
    @SuppressWarnings("unchecked")
    public Map<String, Map<Integer, Integer>> getScoreDetailMap(int bizId, int type, List<String> owners) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(4);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owners", owners);
        Query query = newHqlQuery("select owner,score,count(id) from Rating where bizId=:bizId and type=:type and owner in(:owners) group by owner,score", args);
        Map<String, Map<Integer, Integer>> map = Maps.newHashMap();
        for (Object[] arr : (List<Object[]>) query.list()) {
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
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(4);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owners", owners);
        Query query = newHqlQuery("select owner,count(id) from Rating where bizId=:bizId and type=:type and owner in(:owners) group by owner", args);
        return HibernateUtils.toIntMap(query.list());
    }

    @Override
    public Map<String, Double> getScoreAverageMap(int bizId, int type, List<String> owners) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(4);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owners", owners);
        Query query = newHqlQuery("select owner,avg(score) from Rating where bizId=:bizId and type=:type and owner in(:owners) group by owner", args);
        return HibernateUtils.toDoubleMap(query.list());
    }

    @Override
    public Map<String, Double> getScoreMapByUidAndOwner(int bizId, int type,
                                                        Set<String> owners, Set<Long> userIds) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(4);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owners", owners);
        args.put("userIds", userIds);
        Query query = newHqlQuery("select userId, owner,avg(score) from Rating where  bizId=:bizId and type=:type and owner in(:owners) and userId in(:userIds) group by userId, owner", args);

        Map<String, Double> map = Maps.newHashMap();
        for (Object[] arr : (List<Object[]>) query.list()) {
            map.put(arr[0] + "_" + arr[1], HibernateUtils.getDouble(arr[2]));
        }
        return map;
    }


    @Override
    public Map<Long, Double> getScoreMapByUserIds(int bizId, int type,
                                                  Set<String> owners, Set<Long> userIds) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(4);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owners", owners);
        args.put("userIds", userIds);
        Query query = newHqlQuery("select userId, score from Rating where  bizId=:bizId and type=:type and owner in(:owners) and userId in(:userIds) group by userId", args);
        return HibernateUtils.toDoubleMap1(query.list());
    }

    @Override
    public Map<String, Double> getHotOwnerMap(int bizId, int type, int size) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(2);
        args.put("bizId", bizId);
        args.put("type", type);
        Query query = newHqlQuery("select owner,avg(score) from Rating where bizId=:bizId and type=:type group by owner order by avg(score) desc", args);
        if (size > 0) {
            query.setMaxResults(size);
        }
        return HibernateUtils.toDoubleMap(query.list());
    }

    @Override
    public Map<String, Double> getGreaterPercentMap(int bizId, int type, int score, List<String> owners) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(3);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owners", owners);
        Map<String, Object> args1 = Maps.newHashMap(args);
        args1.put("score", score);
        Query totalQuery = newHqlQuery("select owner,count(id) from Rating where bizId=:bizId and type=:type and owner in (:owners) group by owner", args);
        Query greaterQuery = newHqlQuery("select owner,count(id) from Rating where bizId=:bizId and type=:type and score>=:score and owner in (:owners) group by owner", args1);
        Map<String, Integer> total = HibernateUtils.toIntMap(totalQuery.list());
        Map<String, Integer> greater = HibernateUtils.toIntMap(greaterQuery.list());
        Map<String, Double> map = Maps.newHashMapWithExpectedSize(greater.size());
        for (Map.Entry<String, Integer> entry : greater.entrySet()) {
            String key = entry.getKey();
            map.put(key, entry.getValue() / (double) total.get(key));
        }
        return map;
    }
}
