package com.le07.commonservice.app.manager;

import com.le07.commonservice.app.model.App;
import com.le07.commonservice.app.model.Biz;

import java.util.List;

/**
 * APP 服务
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-6-28
 * Time: 上午11:09
 */
@SuppressWarnings({"unused"})
public interface AppManager {
    /**
     * 保存一个应用
     *
     * @param app 待保存的应用
     * @return 应用
     */
    App saveApp(App app);

    /**
     * 删除多个应用
     *
     * @param ids 应用id列表
     */
    void removeApps(Long... ids);

    /**
     * 获取一个应用信息
     *
     * @param id 应用id
     * @return 应用
     */
    App getApp(Long id);

    /**
     * 获取应用列表
     *
     * @return 应用列表
     */
    List<App> getApps();

    /**
     * 保存一个业务
     *
     * @param biz 待保存的业务
     * @return 业务
     */
    Biz saveBiz(Biz biz);

    /**
     * 删除多个业务
     *
     * @param ids 业务id列表
     */
    void removeBizs(Long... ids);

    /**
     * 获取一个业务
     *
     * @param id 业务id
     * @return 业务
     */
    Biz getBiz(Long id);

    /**
     * 获取业务列表
     *
     * @return 业务列表
     */
    List<Biz> getBizs();

}
