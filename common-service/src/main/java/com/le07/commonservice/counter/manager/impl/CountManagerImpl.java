package com.le07.commonservice.counter.manager.impl;

import com.le07.commonservice.app.manager.BizManager;
import com.le07.commonservice.counter.dao.CountDao;
import com.le07.commonservice.counter.manager.CountManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 计数服务
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-9
 * Time: 下午5:16
 */
@Service
@Transactional
public class CountManagerImpl implements CountManager{

    @Autowired
    private CountDao countDao;

    @Autowired
    private BizManager bizManager;
    
    
    @Override
    @Transactional(readOnly = true)
    public int getCount(String bizKey, int type, String owner) {
        return countDao.getCount(getBizId(bizKey), type, owner);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Integer> getCountMap(String bizKey, int type, List<String> owners) {
        return countDao.getCountMap(getBizId(bizKey), type, owners);
    }

    @Override
    @Transactional
    public void resetCount(String bizKey, int type, String owner) {
        countDao.resetCount(getBizId(bizKey), type, owner);
    }

    @Override
    @Transactional
    public void increaseCount(String bizKey, int type, String owner, int count) {
        countDao.increaseCount(getBizId(bizKey), type, owner, count);
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getHotOwner(String bizKey, int type, int size, int algorithm) {
        return countDao.getHotOwner(getBizId(bizKey), type, size, algorithm);
    }

    @Override
    public Map<String, List<Integer>> getTrendsMap(String bizKey, int type, List<String> owners, Date startDate, Date endDate, int interval) {
        return null; //todo:impl it
    }

    @Override
    @Transactional
    public void upgrade(int fromVersion) {
        countDao.upgrade0();
    }


    private int getBizId(String bizKey) {
        return (int) bizManager.getBizId(bizKey);
    }
}
