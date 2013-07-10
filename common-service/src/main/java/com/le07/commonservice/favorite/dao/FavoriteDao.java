package com.le07.commonservice.favorite.dao;

import com.le07.commonservice.favorite.model.Favorite;
import com.le07.commonservice.favorite.util.Query;
import com.le07.framework.util.Page;

import java.util.List;
import java.util.Map;

/**
 * Favorite Dao
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午2:00
 */
public interface FavoriteDao {

    Favorite saveFavorite(Favorite favorite);

    void removeFavorites(Long... ids);

    void removeFavoritesByOwner(String bizKey, String owner);

    Favorite getFavorite(long id);

    Map<Long,Favorite> getFavoriteMap(List<Long> ids);

    Page<Favorite> getFavorites(String bizKey, long userId, String keyword, int start, int size);

    Map<String, Integer> getFavoriteCountMap(String bizKey, List<String> owners);

    Page<Favorite> listFavorites(Query query, long offset, long limit);

    long countFavorites(String bizKey, long userId, String owner);

    List<Map<String, String>> getTopOwners(String bizKey, int size);
}
