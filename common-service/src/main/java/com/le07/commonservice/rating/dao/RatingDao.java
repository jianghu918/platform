package com.le07.commonservice.rating.dao;

import com.le07.framework.util.Page;
import com.le07.commonservice.rating.model.Rating;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Rating Dao
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 上午10:38
 */
public interface RatingDao {

    void updateRating(Rating rating);

    Page<Rating> getRatings(int bizId, List<Integer> types, long userId, int start, int size);

    Rating getRating(int bizId, int type, String owner, long userId);

    Map<String, Integer> getScoreMap(int bizId, int type, long userId, List<String> owners);

    Map<String,Map<Integer, Integer>> getScoreDetailMap(int bizId, int type, List<String> owners);

    Map<String, Integer> getScoreCountMap(int bizId, int type, List<String> owners);

    Map<String, Double> getScoreAverageMap(int bizId, int type, List<String> owners);

    Map<String,Double> getHotOwnerMap(int bizId, int type, int size);

    Map<String,Double> getGreaterPercentMap(int bizId, int type, int score, List<String> owners);

    Map<String, Double> getScoreMapByUidAndOwner(int bizId, int type, Set<String> owners, Set<Long> userIds);

    Map<Long, Double> getScoreMapByUserIds(int bizId, int type, Set<String> owners, Set<Long> userIds);

}
