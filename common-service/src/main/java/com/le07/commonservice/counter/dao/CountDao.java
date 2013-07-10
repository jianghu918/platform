package com.le07.commonservice.counter.dao;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-9
 * Time: 下午5:13
 */
public interface CountDao {

    int getCount(int bizId, int type, String owner);

    Map<String,Integer> getCountMap(int bizId, int type, Collection<String> owners);

    void resetCount(int bizId, int type, String owner);

    void increaseCount(int bizId, int type, String owner, int count);

    List<String> getHotOwner(int bizId, int type, int size, int algorithm);

    void upgrade0();
}
