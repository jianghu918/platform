package com.le07.commonservice.app.manager.impl;

import com.le07.commonservice.app.dao.AppDao;
import com.le07.commonservice.app.dao.BizDao;
import com.le07.commonservice.app.manager.AppManager;
import com.le07.commonservice.app.model.App;
import com.le07.commonservice.app.model.Biz;
import com.le07.framework.global.type.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * APP Manager 实现
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-6-28
 * Time: 上午11:21
 */
@Service
@Transactional
public class AppManagerImpl implements AppManager {

    @Autowired
    private AppDao appDao;

    @Autowired
    private BizDao bizDao;


    @Override
    public App saveApp(App app)  {
        return appDao.save(app);
    }

    @Override
    public void removeApps(Long... ids) {
        appDao.updateAppStatus(Status.DELETED, ids);
    }

    @Override
    @Transactional(readOnly = true)
    public App getApp(Long id)  {
        return appDao.findOne(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<App> getApps() {
        return appDao.findAll();
    }

    @Override
    public Biz saveBiz(Biz biz)  {
        return bizDao.save(biz);
    }

    @Override
    public void removeBizs(Long... ids) {
        bizDao.updateBizStatus(Status.DELETED, ids);
    }

    @Override
    @Transactional(readOnly = true)
    public Biz getBiz(Long id) {
        return bizDao.findOne(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Biz> getBizs() {
        return bizDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Biz> getAppBizs(long appId) {
        return bizDao.getAppBizs(appId);
    }




}
