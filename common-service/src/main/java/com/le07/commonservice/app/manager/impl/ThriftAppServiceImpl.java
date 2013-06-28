package com.le07.commonservice.app.manager.impl;


import com.le07.api.app.App;
import com.le07.api.app.AppService;
import com.le07.api.app.Biz;
import com.le07.api.type.AnyException;
import com.le07.commonservice.app.manager.AppManager;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("thriftAppService")
public class ThriftAppServiceImpl implements AppService.Iface {

    @Autowired
	private AppManager manager;


    @Override
    public App saveApp(App app) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void removeApps(List<Integer> ids) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public App getApp(int id) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<App> getApps() throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Biz saveBiz(Biz biz) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void removeBizs(List<Integer> ids) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Biz getBiz(int id) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Biz> getBizs() throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Biz> getAppBizs(int appId) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
