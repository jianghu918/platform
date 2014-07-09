package com.le07.commonservice.favorite.dao;

import com.le07.commonservice.favorite.model.Favorite;
import com.le07.framework.util.Page;
import org.springframework.data.jpa.repository.Query;

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
public interface SpecificDao {

    Page<Favorite> getFavorites(long bizId, long userId, String keyword, int start, int size);

    Map<String, Integer> getFavoriteCountMap(long bizId, List<String> owners);

    Page<Favorite> listFavorites(com.le07.commonservice.favorite.util.Query query, long offset, long limit);

    List<Map<String, String>> getTopOwners(long bizId, int size);
}
