package com.le07.commonservice.counter.dao;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 *
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-4
 * Time: 下午4:10
 */
public interface SpecificDao {


    Map<String,Integer> getCountMap(int bizId, int type, Collection<String> owners);


    List<String> getHotOwner(int bizId, int type, int size, int algorithm);


    void upgrade0();
}
