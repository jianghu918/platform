package com.le07.commonservice.rating.manager;

import com.le07.framework.util.Page;
import com.le07.commonservice.rating.model.Rating;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 评分管理
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 上午10:35
 */
public interface RatingManager {

    /**
     * 更新一个评分
     *
     * @param rating 评分对象
     */
    void updateRating(Rating rating);

    /**
     * 批量获取用户的评分page
     *
     * @param bizKey 业务key
     * @param types  评分类型列表
     * @param userId 用户id
     * @param start  开始位置
     * @param size   获取个数
     * @return 评分分页对象
     * @tables cs_rating
     */
    Page<Rating> getRatings(String bizKey, List<Integer> types, long userId, int start, int size);

    /**
     * 批量获取用户的评分map
     *
     * @param bizKey 业务key
     * @param type   评分类型
     * @param userId 用户id
     * @param owners 所有者列表
     * @return 评分map
     */
    Map<String, Integer> getScoreMap(String bizKey, int type, long userId, List<String> owners);

    /**
     * 批量获取业务对象的各个分数的评分次数map
     *
     * @param bizKey 业务key
     * @param type   评分类型
     * @param owners 所有者列表
     * @return 各个分数的评分次数map
     */
    Map<String, Map<Integer, Integer>> getScoreDetailMap(String bizKey, int type, List<String> owners);

    /**
     * 批量获取业务对象的评分次数
     *
     * @param bizKey 业务key
     * @param type   评分类型
     * @param owners 所有者列表
     * @return 评分次数map
     */
    Map<String, Integer> getScoreCountMap(String bizKey, int type, List<String> owners);

    /**
     * 批量获取业务对象的平均评分
     *
     * @param bizKey 业务key
     * @param type   评分类型
     * @param owners 所有者列表
     * @return 平均评分map
     */
    Map<String, Double> getScoreAverageMap(String bizKey, int type, List<String> owners);

    /**
     * 获取热门评分map,key为owner,value为平均分
     *
     * @param bizKey 业务key
     * @param type   评分类型
     * @param size   个数
     * @return 热门评分map
     */
    Map<String, Double> getHotOwnerMap(String bizKey, int type, int size);

    /**
     * 批量获取大于指定分数评分的百分比
     *
     * @param bizKey 业务key
     * @param type   评分类型
     * @param score  分数
     * @param owners 所有者列表
     * @return 小于1的百分比map
     */
    Map<String, Double> getGreaterPercentMap(String bizKey, int type, int score, List<String> owners);


    Map<String, Double> getScoreMapByUidAndOwner(String bizKey, int type,
                                                 Set<String> owners, Set<Long> userIds);

}
