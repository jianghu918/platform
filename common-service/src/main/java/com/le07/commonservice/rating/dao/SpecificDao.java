package com.le07.commonservice.rating.dao;

import com.le07.commonservice.rating.model.Rating;
import com.le07.framework.util.Page;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-4
 * Time: 下午5:42
 */
public interface SpecificDao {

    Page<Rating> getRatings(int bizId, List<Integer> types, long userId, int start, int size);

    Map<String, Integer> getScoreMap(int bizId, int type, long userId, List<String> owners);

    Map<String,Map<Integer, Integer>> getScoreDetailMap(int bizId, int type, List<String> owners);

    Map<String, Integer> getScoreCountMap(int bizId, int type, List<String> owners);

    Map<String, Double> getScoreAverageMap(int bizId, int type, List<String> owners);

    Map<String,Double> getHotOwnerMap(int bizId, int type, int size);

    Map<String,Double> getGreaterPercentMap(int bizId, int type, int score, List<String> owners);

    Map<String, Double> getScoreMapByUidAndOwner(int bizId, int type, Set<String> owners, Set<Long> userIds);

    Map<Long, Double> getScoreMapByUserIds(int bizId, int type, Set<String> owners, Set<Long> userIds);
}
