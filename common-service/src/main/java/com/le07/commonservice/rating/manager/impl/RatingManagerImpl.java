package com.le07.commonservice.rating.manager.impl;

import com.le07.commonservice.app.manager.BizConfigManager;
import com.le07.commonservice.rating.dao.RatingDao;
import com.le07.commonservice.rating.manager.RatingManager;
import com.le07.commonservice.rating.model.Rating;
import com.le07.framework.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 评分 实现
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 上午10:37
 */
@Service
@Transactional
public class RatingManagerImpl implements RatingManager{

    @Autowired
    private RatingDao ratingDao;

    @Autowired
    private BizConfigManager bizManager;


    @Override
    public void updateRating(Rating rating) {
        rating.setBizId(getBizId(rating.getBizKey()));
        rating.setUpdateAt(new Date());
        ratingDao.updateRating(rating);
    }

    private int getBizId(String bizKey) {
        return (int) bizManager.getBizId(bizKey);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Rating> getRatings(String bizKey, List<Integer> types, long userId, int start, int size) {
        return ratingDao.getRatings(getBizId(bizKey), types, userId, start, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Integer> getScoreMap(String bizKey, int type, long userId, List<String> owners) {
        return ratingDao.getScoreMap(getBizId(bizKey), type, userId, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Map<Integer, Integer>> getScoreDetailMap(String bizKey, int type, List<String> owners) {
        return ratingDao.getScoreDetailMap(getBizId(bizKey), type, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Integer> getScoreCountMap(String bizKey, int type, List<String> owners) {
        return ratingDao.getScoreCountMap(getBizId(bizKey), type, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getScoreAverageMap(String bizKey, int type, List<String> owners) {
        return ratingDao.getScoreAverageMap(getBizId(bizKey), type, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getHotOwnerMap(String bizKey, int type, int size) {
        return ratingDao.getHotOwnerMap(getBizId(bizKey), type, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getGreaterPercentMap(String bizKey, int type, int score, List<String> owners) {
        return ratingDao.getGreaterPercentMap(getBizId(bizKey), type, score, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getScoreMapByUidAndOwner(String bizKey, int type, Set<String> owners, Set<Long> userIds) {
        return ratingDao.getScoreMapByUidAndOwner(getBizId(bizKey), type, owners, userIds);
    }
}
