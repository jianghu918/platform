package com.le07.commonservice.rating.manager.impl;

import com.le07.api.rating.Rating;
import com.le07.api.rating.RatingPage;
import com.le07.api.rating.RatingService;
import com.le07.api.type.AnyException;
import com.le07.commonservice.rating.manager.RatingManager;
import com.le07.commonservice.rating.util.Converter;
import com.le07.framework.util.Page;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Thrift Rating Manager
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午4:09
 */
@Service("thriftRatingService")
public class ThriftRatingManagerImpl implements RatingService.Iface{

    @Autowired
    private RatingManager ratingManager;


    @Override
    public void update(Rating rating) throws AnyException, TException {
        ratingManager.updateRating(Converter.toRating(rating));
    }

    @Override
    public RatingPage getRatings(String bizKey, List<Integer> types, long userId, int start, int size) throws AnyException, TException {
        Page<com.le07.commonservice.rating.model.Rating> ratings = ratingManager.getRatings(bizKey, types, userId, start, size);
        RatingPage ratingPage = new RatingPage();
        ratingPage.setTotal(ratings.getTotal());
        ratingPage.setItems(Converter.toApiRatings(ratings.getItems()));
        return ratingPage;
    }

    @Override
    public Map<String, Integer> getUserScoreMap(String bizKey, int type, long userId, List<String> owners) throws AnyException, TException {
        return ratingManager.getScoreMap(bizKey, type, userId, owners);
    }

    @Override
    public Map<String, Map<Integer, Integer>> getScoreDetailMap(String bizKey, int type, List<String> owners) throws AnyException, TException {
        return ratingManager.getScoreDetailMap(bizKey, type, owners);
    }
    @Override
    public Map<String, Integer> getScoreCountMap(String bizKey, int type, List<String> owners) throws AnyException, TException {
        return ratingManager.getScoreCountMap(bizKey, type, owners);
    }

    @Override
    public Map<String, Double> getScoreAverageMap(String bizKey, int type, List<String> owners) throws AnyException, TException {
        return ratingManager.getScoreAverageMap(bizKey, type, owners);
    }

    @Override
    public Map<String, Double> getScoreMapByUidAndOwner(String bizKey, int type, Set<String> owners, Set<Long> userIds) throws AnyException, TException {
        return ratingManager.getScoreMapByUidAndOwner(bizKey, type, owners, userIds);
    }

    @Override
    public Map<String, Double> getHotOwnerMap(String bizKey, int type, int size) throws AnyException, TException {
        return ratingManager.getHotOwnerMap(bizKey, type, size);
    }

    @Override
    public Map<String, Double> getGreaterPercentMap(String bizKey, int type, int score, List<String> owners) throws AnyException, TException {
        return ratingManager.getGreaterPercentMap(bizKey, type, score, owners);
    }
}
