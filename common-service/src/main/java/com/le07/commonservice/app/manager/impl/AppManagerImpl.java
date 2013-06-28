package com.le07.commonservice.app.manager.impl;

import com.le07.commonservice.app.dao.AppDao;
import com.le07.commonservice.app.model.App;
import com.le07.commonservice.app.model.Biz;
import com.le07.commonservice.app.manager.AppManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * APP Manager 实现
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-6-28
 * Time: 上午11:21
 */
@Service
public class AppManagerImpl implements AppManager {

    @Autowired
    private AppDao appDao;


    @Override
    public App saveApp(App app) {
        return appDao.save(app);
    }

    @Override
    public void removeApps(Long... ids) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public App getApp(Long id) {
        return appDao.findOne(id);
    }

    @Override
    public List<App> getApps() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Biz saveBiz(Biz biz) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void removeBizs(Long... ids) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Biz getBiz(Long id) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Biz> getBizs() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
