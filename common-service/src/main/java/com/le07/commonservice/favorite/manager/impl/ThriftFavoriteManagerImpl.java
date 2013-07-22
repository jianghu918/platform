package com.le07.commonservice.favorite.manager.impl;

import com.google.common.collect.Maps;
import com.le07.api.favorite.FavoritePage;
import com.le07.api.favorite.FavoriteService;
import com.le07.api.type.AnyException;
import com.le07.commonservice.favorite.manager.FavoriteManager;
import com.le07.api.favorite.Favorite;
import com.le07.commonservice.favorite.util.Converter;
import com.le07.framework.util.Page;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Map;

/**
 * Favorite Manager Implements
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 上午9:52
 */
@Service("thriftFavoriteService")
public class ThriftFavoriteManagerImpl implements FavoriteService.Iface{

    @Autowired
    private FavoriteManager manager;


    @Override
    public Favorite saveFavorite(Favorite favorite) throws AnyException, TException {
        com.le07.commonservice.favorite.model.Favorite origin = null;
        if(favorite.isSetId())
        {
            origin = manager.getFavorite(favorite.getId());
        }
        return Converter.toApiFavorite(manager.saveFavorite(Converter.toFavorite(origin, favorite)));
    }

    @Override
    public void removeFavorites(List<Long> ids) throws AnyException, TException {
        manager.removeFavorites(ids.toArray(new Long[ids.size()]));
    }

    @Override
    public void removeFavoritesByOwner(String bizKey, String owner) throws AnyException, TException {
        manager.removeFavoritesByOwner(bizKey, owner);
    }

    @Override
    public Favorite getFavorite(long id) throws AnyException, TException {
        return Converter.toApiFavorite(manager.getFavorite(id));
    }

    @Override
    public Map<Long, Favorite> getFavoriteMap(List<Long> ids) throws AnyException, TException {
        if(CollectionUtils.isEmpty(ids))
            return Maps.newHashMap();
        Map<Long, com.le07.commonservice.favorite.model.Favorite> favoriteMap = manager.getFavoriteMap(ids);
        Map<Long, Favorite> map = Maps.newHashMapWithExpectedSize(favoriteMap.size());
        for (Long id : favoriteMap.keySet()) {
            map.put(id, Converter.toApiFavorite(favoriteMap.get(id)));
        }
        return map;
    }

    @Override
    public FavoritePage getFavorites(String bizKey, long userId, String keyword, int start, int size) throws AnyException, TException {
        FavoritePage favoritePage = new FavoritePage();
        Page<com.le07.commonservice.favorite.model.Favorite> page = manager.getFavorites(bizKey, userId, keyword, start, size);
        favoritePage.setTotal(page.getTotal());
        favoritePage.setItems(Converter.toApiFavorites(page.getItems()));
        return favoritePage;
    }

    @Override
    public Map<String, Integer> getFavoriteCountMap(String bizKey, List<String> owners) throws AnyException, TException {
        return manager.getFavoriteCountMap(bizKey, owners);
    }

    @Override
    public FavoritePage listFavorites(com.le07.api.favorite.Query query, long offset, long limit) throws AnyException, TException {
        FavoritePage favoritePage = new FavoritePage();
        Page<com.le07.commonservice.favorite.model.Favorite> page = manager.listFavorites(Converter.toQuery(query), offset, limit);
        favoritePage.setTotal(page.getTotal());
        favoritePage.setItems(Converter.toApiFavorites(page.getItems()));
        return favoritePage;
    }

    @Override
    public boolean isFavorited(String bizKey, long userId, String owner) throws AnyException, TException {
        return manager.countFavorites(bizKey, userId, owner) > 0;
    }

    @Override
    public List<Map<String, String>> getTopOwners(String bizKey, int size) throws AnyException, TException {
        return manager.getTopOwners(bizKey, size);
    }
}
