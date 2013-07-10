package com.le07.commonservice.favorite.manager;

import com.le07.commonservice.favorite.util.Query;
import com.le07.framework.util.Page;
import com.le07.commonservice.favorite.model.Favorite;

import java.util.List;
import java.util.Map;

/**
 * Favorite Manager
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午1:55
 */
public interface FavoriteManager {

    /**
     * 保存一个收藏
     *
     * @param favorite 收藏
     * @return 收藏
     */
    Favorite saveFavorite(Favorite favorite);

    /**
     * 删除多个收藏
     *
     * @param ids 收藏id列表
     */
    void removeFavorites(Long... ids);

    /**
     * 根据所有者批量删除收藏
     *
     * @param bizKey 业务key
     * @param owner  所有者
     */
    void removeFavoritesByOwner(String bizKey, String owner);

    /**
     * 获取一个收藏
     *
     * @param id 收藏id
     * @return 收藏
     */
    Favorite getFavorite(long id);

    /**
     * 根据id批量获取收藏
     *
     * @param ids id列表
     * @return 收藏map
     */
    Map<Long, Favorite> getFavoriteMap(List<Long> ids);

    /**
     * 获取一页收藏
     *
     * @param bizKey  业务key
     * @param userId  用户id
     * @param keyword 收藏标题检索关键字
     * @param start   开始位置
     * @param size    获取个数
     * @return 收藏列表分页对象
     */
    Page<Favorite> getFavorites(String bizKey, long userId, String keyword, int start, int size);

    /**
     * 获取收藏数量map
     *
     * @param bizKey 业务key
     * @param owners 所有者列表
     * @return 收藏数量map
     */
    Map<String, Integer> getFavoriteCountMap(String bizKey, List<String> owners);

    /**
     * @param query
     * @param offset
     * @param limit
     * @return
     */
    Page<Favorite> listFavorites(Query query, long offset, long limit);


    long countFavorites(String bizKey, long userId, String owner);

    /**
     * 查询收藏排行榜
     * @return
     */
    List<Map<String, String>> getTopOwners(String bizKey, int size);

}
