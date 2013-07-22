package com.le07.commonservice.favorite.manager.impl;

import com.le07.commonservice.app.manager.BizManager;
import com.le07.commonservice.favorite.dao.FavoriteDao;
import com.le07.commonservice.favorite.manager.FavoriteManager;
import com.le07.commonservice.favorite.model.Favorite;
import com.le07.commonservice.favorite.util.Query;
import com.le07.commonservice.util.BaseManagerImpl;
import com.le07.framework.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private FavoriteDao favoriteDao;

    @Override
    public Favorite saveFavorite(Favorite favorite) {
        favorite.setCreateAt(new Date());
        favorite.setBizId((int) getBizId(favorite.getBizKey()));
        return favoriteDao.saveFavorite(favorite);
    }


    @Override
    public void removeFavorites(Long... ids) {
        favoriteDao.removeFavorites(ids);
    }

    @Override
    public void removeFavoritesByOwner(String bizKey, String owner) {
        favoriteDao.removeFavoritesByOwner(bizKey, owner);
    }

    @Override
    @Transactional(readOnly = true)
    public Favorite getFavorite(long id) {
        return favoriteDao.getFavorite(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, Favorite> getFavoriteMap(List<Long> ids) {
        return favoriteDao.getFavoriteMap(ids);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Favorite> getFavorites(String bizKey, long userId, String keyword, int start, int size) {
        return favoriteDao.getFavorites(bizKey, userId, keyword, start, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Integer> getFavoriteCountMap(String bizKey, List<String> owners) {
        return favoriteDao.getFavoriteCountMap(bizKey, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Favorite> listFavorites(Query query, long offset, long limit) {
        return favoriteDao.listFavorites(query, offset, limit);
    }

    @Override
    @Transactional(readOnly = true)
    public long countFavorites(String bizKey, long userId, String owner) {
        return favoriteDao.countFavorites(bizKey, userId, owner);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, String>> getTopOwners(String bizKey, int size) {
        return favoriteDao.getTopOwners(bizKey, size);
    }
}
