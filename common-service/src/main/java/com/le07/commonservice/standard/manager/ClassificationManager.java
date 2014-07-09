package com.le07.commonservice.standard.manager;

import com.le07.commonservice.standard.model.Classification;
import com.le07.framework.base.BaseManager;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;

import java.util.List;
import java.util.Set;

/**
 * Classification Manager
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午2:54
 */
public interface ClassificationManager extends BaseManager<Classification, Long>{
    int IS_COMM_ROOT = 0;
    int IS_ROOT = 1;

    /**
     * 保存或保存一个分类信息，
     * 最顶层的分类Pid为0
     * 如果有携带id, 则认为是更新
     *
     * @param classification 分类信息
     */
    public Classification saveOrUpdate(Classification classification);

    /**
     * 修改状态
     *
     * @param id id
     *
     * @param status 修改后的状态
     */
    public void updateStatus(long id, Status status);

    /**
     * 批量修改状态
     *
     * @param ids ids
     *
     * @param status 修改后的状态
     */
    public void batchUpdateStatus(Set<Long> ids, Status status);

    /**
     * 或许pids下所有分类信息
     *
     * @param pids pids
     *
     * @param status 状态, 为空则查询所有状态
     */
    public List<Classification> listClassificationByPids(Set<Long> pids, String bizKey, Set<Status> status);

    /**
     * Classification 列表
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
    public Page<Classification> listClassification(String name, Set<Status> status, String bizKey, long offset, long size);


    /**
     * 根据Id获取
     * @param id
     * @return
     */
    public Classification get(long id);


    List<Classification> findAll(Long companyId, Long pid);

    void deleteByPid(Long classificationId);






    /**  JsTree  **/

    /**
     * 获取id节点信息
     * @param id
     * @return
     */
    Classification get_node(Long id, String bizKey);

    /**
     * 获取pid为id的所有节点
     * @param pid
     * @return
     */
    List<Classification> get_children(Long pid, int typeId, String bizKey);

    /**
     * 获取商家的分类节点信息
     * @param pid
     * @param typeId
     * @return
     */
    List<Classification> get_children(long pid, int typeId);

    /**
     * 是否有子节点
     * @param id
     * @return
     */
    boolean isParent(Long id);


    void updateClassificationPid(Long id, Long pid);

}
