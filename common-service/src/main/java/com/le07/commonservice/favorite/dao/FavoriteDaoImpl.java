package com.le07.commonservice.favorite.dao;

import com.google.common.collect.Maps;
import com.le07.commonservice.app.manager.BizConfigManager;
import com.le07.framework.entity.EntityNotFoundException;
import com.le07.framework.global.type.Status;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import com.le07.commonservice.favorite.model.Favorite;
import com.le07.framework.support.hibernate.HibernateUtils;
import com.le07.framework.util.Page;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * //TODO
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午2:01
 */
@Repository
public class FavoriteDaoImpl extends HibernateEntityDAO<Favorite, Long> implements FavoriteDao{

    @Autowired
    private BizConfigManager bizManager;

    @Override
    public Favorite saveFavorite(Favorite favorite) {
        return save(favorite);
    }

    @Override
    public void removeFavorites(Long... ids) {
        try {
            batchDeleteByPK(Arrays.asList(ids));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removeFavoritesByOwner(String bizKey, String owner) {
        update(newHqlQuery("update Favorite set status=? where bizId=? and owner=?", Status.DELETED, getBizId(bizKey), owner));
    }

    @Override
    public Favorite getFavorite(long id) {
        return load(id);
    }

    @Override
    public Map<Long, Favorite> getFavoriteMap(List<Long> ids) {
        List<Favorite> comments = query(newCriteria(Restrictions.in("id", ids)));
        Map<Long, Favorite> map = Maps.newHashMapWithExpectedSize(comments.size());
        for (Favorite fav : comments) {
            map.put(fav.getId(), fav);
        }
        return map;
    }

    @Override
    public Page<Favorite> getFavorites(String bizKey, long userId, String keyword, int start, int size) {
        Criteria criteria = newCriteria(Restrictions.eq("bizId", getBizId(bizKey)), Restrictions.eq("userId", userId));
        if (StringUtils.isNotBlank(keyword)) {
            criteria.add(Restrictions.like("title", keyword, MatchMode.ANYWHERE));
        }
        return pageQuery(criteria, start, size);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Map<String, Integer> getFavoriteCountMap(String bizKey, List<String> owners) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(3);
        args.put("status", Status.ENABLED);
        args.put("bizId", getBizId(bizKey));
        args.put("owners", owners);
        Query query = newHqlQuery("select owner,count(id) from Favorite where status=:status and bizId=:bizId and owner in(:owners) group by owner", args);
        return HibernateUtils.toIntMap(query.list());
    }

    protected Favorite prepare(Favorite entity) {
        try {
            entity.setBizKey(getBizKey(entity.getBizId()));
        } catch (EntityNotFoundException ignored) {
        }
        return entity;
    }

    @Override
    protected Favorite beforeSave(Favorite entity) {
        try {
            if (entity.getBizId() < 1) {
                entity.setBizId(getBizId(entity.getBizKey()));
            }
        } catch (EntityNotFoundException ignored) {
        }
        return entity;
    }

    private int getBizId(String bizKey) {
        return (int) bizManager.getBizId(bizKey);
    }

    private String getBizKey(long bizId)
    {
        return bizManager.getBizKey(bizId);
    }

    @Override
    public Page<Favorite> listFavorites(com.le07.commonservice.favorite.util.Query query, long offset, long limit) {
        List<Criterion> criterions = new ArrayList<Criterion>();
        if(null != query)
        {
            if(CollectionUtils.isNotEmpty(query.getUserId()))
                criterions.add(Restrictions.in("userId", query.getUserId()));
            if(StringUtils.isNotBlank(query.getBizKey()))
                criterions.add(Restrictions.eq("bizId", getBizId(query.getBizKey())));
            if(StringUtils.isNotBlank(query.getOwner()))
                criterions.add(Restrictions.eq("owner", query.getOwner()));
            if(StringUtils.isNotBlank(query.getTitle()))
                criterions.add(Restrictions.like("title", "%" + query.getTitle() + "%"));
            if(StringUtils.isNotBlank(query.getRemark()))
                criterions.add(Restrictions.like("remark","%" + query.getRemark() + "%"));
            if(StringUtils.isNotBlank(query.getUrl()))
                criterions.add(Restrictions.like("url","%" + query.getUrl() + "%"));
            if(null != query.getBeginTime())
                criterions.add(Restrictions.ge("createAt", query.getBeginTime()));
            if(null != query.getEndTime())
                criterions.add(Restrictions.le("createAt", query.getEndTime()));
        }
        return pageQuery(newCriteria(criterions), (int)offset, (int)limit);
    }

    @Override
    public long countFavorites(String bizKey, long userId, String owner) {
        Criteria criteria = newCriteria(
                Restrictions.eq("bizId", getBizId(bizKey)),
                Restrictions.eq("userId", userId),
                Restrictions.eq("owner", owner));
        return getTotalCount(criteria);
    }

    @Override
    public List<Map<String, String>> getTopOwners(String bizKey, int size) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("bizId", getBizId(bizKey));
        params.put("status", Status.ENABLED);
        Query query = newHqlQuery("SELECT owner, COUNT(owner) FROM Favorite WHERE biz_id = :bizId AND status = :status GROUP BY owner ORDER BY COUNT(owner) DESC", params);
        query.setFirstResult(0);
        query.setMaxResults(size);
        List<Object[]> resultList = query.list();
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
