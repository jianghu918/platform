package com.le07.commonservice.rating.manager.impl;

import com.le07.commonservice.base.BaseManagerImpl;
import com.le07.commonservice.rating.dao.SpecificDao;
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
public class RatingManagerImpl extends BaseManagerImpl implements RatingManager{

    @Autowired
    private SpecificDao specificDao;

    @Override
    public void updateRating(Rating rating) {
        rating.setBizId((int) getBizId(rating.getBizKey()));
        rating.setUpdateAt(new Date());
        ratingDao.save(rating);
    }


    @Override
    @Transactional(readOnly = true)
    public Page<Rating> getRatings(String bizKey, List<Integer> types, long userId, int start, int size) {
        return specificDao.getRatings((int) getBizId(bizKey), types, userId, start, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Integer> getScoreMap(String bizKey, int type, long userId, List<String> owners) {
        return specificDao.getScoreMap((int) getBizId(bizKey), type, userId, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Map<Integer, Integer>> getScoreDetailMap(String bizKey, int type, List<String> owners) {
        return specificDao.getScoreDetailMap((int) getBizId(bizKey), type, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Integer> getScoreCountMap(String bizKey, int type, List<String> owners) {
        return specificDao.getScoreCountMap((int) getBizId(bizKey), type, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getScoreAverageMap(String bizKey, int type, List<String> owners) {
        return specificDao.getScoreAverageMap((int) getBizId(bizKey), type, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getHotOwnerMap(String bizKey, int type, int size) {
        return specificDao.getHotOwnerMap((int) getBizId(bizKey), type, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getGreaterPercentMap(String bizKey, int type, int score, List<String> owners) {
        return specificDao.getGreaterPercentMap((int) getBizId(bizKey), type, score, owners);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getScoreMapByUidAndOwner(String bizKey, int type, Set<String> owners, Set<Long> userIds) {
        return specificDao.getScoreMapByUidAndOwner((int) getBizId(bizKey), type, owners, userIds);
    }
}
