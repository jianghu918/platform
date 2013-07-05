package com.le07.commonservice.app.manager.impl;


import com.le07.api.app.App;
import com.le07.api.app.AppService;
import com.le07.api.app.Biz;
import com.le07.api.type.AnyException;
import com.le07.commonservice.app.manager.AppManager;
import com.le07.commonservice.app.util.Converter;
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
        return Converter.toApiApp(manager.saveApp(Converter.toApp(app)));
    }

    @Override
    public void removeApps(List<Long> ids) throws AnyException, TException {
        manager.removeApps(ids.toArray(new Long[ids.size()]));
    }

    @Override
    public App getApp(long id) throws AnyException, TException {
        return Converter.toApiApp(manager.getApp(id));
    }

    @Override
    public List<App> getApps() throws AnyException, TException {
        return Converter.toApiApp(manager.getApps());
    }

    @Override
    public Biz saveBiz(Biz biz) throws AnyException, TException {
        return Converter.toApiBiz(manager.saveBiz(Converter.toBiz(biz)));
    }

    @Override
    public void removeBizs(List<Long> ids) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Biz getBiz(long id) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Biz> getBizs() throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Biz> getAppBizs(long appId) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }


}
