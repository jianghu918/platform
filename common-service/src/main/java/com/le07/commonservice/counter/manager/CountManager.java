package com.le07.commonservice.counter.manager;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 计数服务
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-9
 * Time: 下午4:59
 */
public interface CountManager {


    /**
     * 获取某个业务对象的访问次数
     *
     * @param bizKey 业务key
     * @param type   访问类型
     * @param owner  所有者
     * @return 次数
     */
    int getCount(String bizKey, int type, String owner);

    /**
     * 批量获取业务对象的访问次数
     *
     *
     * @param bizKey 业务key
     * @param type   访问类型
     * @param owners 所有者列表
     * @return 次数map
     */
    Map<String, Integer> getCountMap(String bizKey, int type, List<String> owners);

    /**
     * 重置某个业务对象的访问次数
     *
     * @param bizKey 业务key
     * @param type   访问类型
     * @param owner  所有者
     */
    void resetCount(String bizKey, int type, String owner);

    /**
     * 增加某个业务对象的访问次数
     *
     * @param bizKey 业务key
     * @param type   访问类型
     * @param owner  所有者
     * @param count  次数
     */
    void increaseCount(String bizKey, int type, String owner, int count);

    /**
     * 获取某个业务的热门访问对象
     *
     * @param bizKey    业务key
     * @param type      访问类型
     * @param size      个数
     * @param algorithm 热度统计算法类型
     * @return 热门访问对象
     */
    List<String> getHotOwner(String bizKey, int type, int size, int algorithm);

    /**
     * 获取多个业务的访问趋势图
     *
     * @param bizKey    业务key
     * @param type      访问类型
     * @param owners    所有者列表
     * @param startDate 开始时间
     * @param endDate   结束时间
     * @param interval  时间间隔,单位为秒
     * @return 访问趋势图map
     */
    Map<String, List<Integer>> getTrendsMap(String bizKey, int type, List<String> owners, Date startDate, Date endDate, int interval);

    void upgrade(int fromVersion);

}
