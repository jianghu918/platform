package com.le07.commonservice.favorite.manager.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.base.BaseManagerImpl;
import com.le07.commonservice.favorite.dao.SpecificDao;
import com.le07.commonservice.favorite.manager.FavoriteManager;
import com.le07.commonservice.favorite.model.Favorite;
import com.le07.commonservice.favorite.util.Query;
import com.le07.framework.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Favorite Manager
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午1:57
 */
@Service
@Transactional
public class FavoriteManagerImpl extends BaseManagerImpl implements FavoriteManager{

    @Autowired
    private SpecificDao specificDao;

    @Override
    public Favorite saveFavorite(Favorite favorite) {
        favorite.setCreateAt(new Date());
        favorite.setBizId((int) getBizId(favorite.getBizKey()));
        return favoriteDao.save(favorite);
    }


    @Override
    public void removeFavorites(Long... ids) {
        favoriteDao.removeFavorites(ids);
    }

    @Override
    public void removeFavoritesByOwner(String bizKey, String owner) {
        favoriteDao.removeFavoritesByOwner(getBizId(bizKey), owner);
    }

    @Override
    @Transactional(readOnly = true)
    public Favorite getFavorite(long id) {
        return favoriteDao.findOne(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, Favorite> getFavoriteMap(List<Long> ids) {
        if(CollectionUtils.isEmpty(ids))
            return Collections.EMPTY_MAP;

        Map<Long, Favorite> map = Maps.newHashMapWithExpectedSize(ids.size());
        for (Long id : ids) {
            map.put(id, getFavorite(id));
        }
        return map;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Favorite> getFavorites(String bizKey, long userId, String keyword, int start, int size) {
        return specificDao.getFavorites(getBizId(bizKey), userId, keyword, start, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Integer> getFavoriteCountMap(String bizKey, List<String> owners) {
        return specificDao.getFavoriteCountMap(getBizId(bizKey), owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Favorite> listFavorites(Query query, long offset, long limit) {
        return specificDao.listFavorites(query, offset, limit);
    }

    @Override
    @Transactional(readOnly = true)
    public long countFavorites(String bizKey, long userId, String owner) {
        return favoriteDao.countFavorites(getBizId(bizKey), userId, owner);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, String>> getTopOwners(String bizKey, int size) {
        return specificDao.getTopOwners(getBizId(bizKey), size);
    }
}
