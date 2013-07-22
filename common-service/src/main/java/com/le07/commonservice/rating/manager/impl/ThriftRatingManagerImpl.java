package com.le07.commonservice.rating.manager.impl;

import com.le07.api.rating.Rating;
import com.le07.api.rating.RatingPage;
import com.le07.api.rating.RatingService;
import com.le07.api.type.AnyException;
import com.le07.api.type.RatingType;
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
    public Map<String, Integer> getUserScoreMap(String bizKey, RatingType type, long userId, List<String> owners) throws AnyException, TException {
        return ratingManager.getScoreMap(bizKey, type.getValue(), userId, owners);
    }

    @Override
    public Map<String, Map<Integer, Integer>> getScoreDetailMap(String bizKey, RatingType type, List<String> owners) throws AnyException, TException {
        return ratingManager.getScoreDetailMap(bizKey, type.getValue(), owners);
    }
    @Override
    public Map<String, Integer> getScoreCountMap(String bizKey, RatingType type, List<String> owners) throws AnyException, TException {
        return ratingManager.getScoreCountMap(bizKey, type.getValue(), owners);
    }

    @Override
    public Map<String, Double> getScoreAverageMap(String bizKey, RatingType type, List<String> owners) throws AnyException, TException {
        return ratingManager.getScoreAverageMap(bizKey, type.getValue(), owners);
    }

    @Override
    public Map<String, Double> getScoreMapByUidAndOwner(String bizKey, RatingType type, Set<String> owners, Set<Long> userIds) throws AnyException, TException {
        return ratingManager.getScoreMapByUidAndOwner(bizKey, type.getValue(), owners, userIds);
    }

    @Override
    public Map<String, Double> getHotOwnerMap(String bizKey, RatingType type, int size) throws AnyException, TException {
        return ratingManager.getHotOwnerMap(bizKey, type.getValue(), size);
    }

    @Override
    public Map<String, Double> getGreaterPercentMap(String bizKey, RatingType type, int score, List<String> owners) throws AnyException, TException {
        return ratingManager.getGreaterPercentMap(bizKey, type.getValue(), score, owners);
    }
}
