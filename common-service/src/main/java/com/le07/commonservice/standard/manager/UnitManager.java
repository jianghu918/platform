package com.le07.commonservice.standard.manager;

import com.le07.commonservice.standard.model.Unit;
import com.le07.framework.base.BaseManager;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;

import java.util.Set;

/**
 * Unit Manager
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午2:42
 */
public interface UnitManager extends BaseManager<Unit, Long>{
    /**
     * 保存或更新一个计量单位
     * 如果有携带id, 则认为是更新
     *
     * @param unit 计量单位
     */
    public Unit saveOrUpdate(Unit unit) ;

    /**
     * 修改状态
     *
     * @param id id
     *
     * @param status 修改后的状态
     */
    public void updateStatus(long id, Status status) ;

    /**
     * 批量修改状态
     *
     * @param ids ids
     *
     * @param status 修改后的状态
     */
    public void batchUpdateStatus(Set<Long> ids, Status status) ;

    /**
     * Unit 列表
     * ps: offset>=0 && size>0 分页才生效
     *
     * @param name name 模糊查询， 不传或空查询全部
     *
     * @param status 状态，不传或空查询全部
     *
     * @param bizKey 业务Key， 不传或空查询全部
     *
     * @param offset 偏移量
     *
     * @param size 抓取数
     */
    public Page<Unit> listUnit(String name, Set<Status> status, String bizKey, long offset, long size) ;


    /**
     * 根据ID获取
     *
     * @param id
     * @return
     */
    public Unit get(long id);
}
