package com.le07.commonservice.counter.manager.impl;

import com.le07.api.counter.CounterService;
import com.le07.api.type.AnyException;
import com.le07.commonservice.counter.manager.CountManager;
import com.le07.framework.util.ThriftUtils;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Count Service
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 上午10:29
 */
@Service("thriftCountService")
public class ThriftCountManagerImpl implements CounterService.Iface{

    @Autowired
    private CountManager manager;

    @Override
    public void increase(String bizKey, int type, String owner, int count) throws TException {
        manager.increaseCount(bizKey, type, owner, count);
    }

    @Override
    public void reset(String bizKey, int type, String owner) throws TException {
        manager.resetCount(bizKey, type, owner);
    }

    @Override
    public int getCount(String bizKey, int type, String owner) throws AnyException, TException {
        return manager.getCount(bizKey, type, owner);
    }

    @Override
    public Map<String, Integer> getCountMap(String bizKey, int type, List<String> owners) throws AnyException, TException {
        return manager.getCountMap(bizKey, type, owners);
    }

    @Override
    public List<String> getHotOwner(String bizKey, int type, int size, int algorithm) throws AnyException, TException {
        return manager.getHotOwner(bizKey, type, size, algorithm);
    }

    @Override
    public Map<String, List<Integer>> getTrendsMap(String bizKey, int type, List<String> owners, long startDate, long endDate, int interval) throws AnyException, TException {
        return manager.getTrendsMap(bizKey, type, owners, ThriftUtils.toDate(startDate), ThriftUtils.toDate(endDate), interval);
    }
}
