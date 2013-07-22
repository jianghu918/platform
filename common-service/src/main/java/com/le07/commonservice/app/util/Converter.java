package com.le07.commonservice.app.util;

import com.google.common.collect.Lists;
import com.le07.commonservice.app.dao.AppDao;
import com.le07.commonservice.app.model.App;
import com.le07.commonservice.app.model.Biz;
import com.le07.framework.util.ThriftUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * APP
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-3
 * Time: 上午10:03
 */
@Component
public class Converter {

    private static AppDao appdao;

    @Autowired
    public Converter(AppDao appdao) {
        Converter.appdao = appdao;
    }


    public static App toApp(App origin, com.le07.api.app.App app) {
        App entity = null != origin ? origin : new App();
        entity.setName(app.getName());
        entity.setKey(app.getKey());
        entity.setStatus(ThriftUtils.toStatus(app.getStatus()));
        return entity;
    }

    public static com.le07.api.app.App toApiApp(App app) {
        com.le07.api.app.App entity = new com.le07.api.app.App();
        entity.setId(app.getId());
        entity.setName(app.getName());
        entity.setKey(app.getKey());
        entity.setStatus(ThriftUtils.toApiStatus(app.getStatus()));
        return entity;
    }

    public static List<com.le07.api.app.App> toApiApp(List<App> apps) {
        if (CollectionUtils.isEmpty(apps))
            return Collections.EMPTY_LIST;
        List<com.le07.api.app.App> list = new ArrayList<com.le07.api.app.App>(apps.size());
        for (App app : apps) {
            list.add(toApiApp(app));
        }
        return list;
    }


    public static Biz toBiz(com.le07.api.app.Biz biz) {
        Biz entity = new Biz();
        if (biz.getId() > 0)
            entity.setId(biz.getId());
        entity.setName(biz.getName());
        entity.setStatus(ThriftUtils.toStatus(biz.getStatus()));
        entity.setKey(biz.getKey());
        entity.setApp(appdao.get(biz.getAppId()));
        return entity;
    }

    public static com.le07.api.app.Biz toApiBiz(Biz biz) {
        com.le07.api.app.Biz entity = new com.le07.api.app.Biz();
        entity.setId(biz.getId());
        entity.setName(biz.getName());
        entity.setStatus(ThriftUtils.toApiStatus(biz.getStatus()));
        entity.setKey(biz.getKey());
        entity.setAppId(biz.getApp().getId());
        return entity;
    }

    public static List<com.le07.api.app.Biz> toApiBizs(List<Biz> bizs) {
        if (CollectionUtils.isEmpty(bizs))
            return Collections.EMPTY_LIST;
        List<com.le07.api.app.Biz> list = Lists.newArrayListWithCapacity(bizs.size());
        for (Biz biz : bizs) {
            list.add(toApiBiz(biz));
        }
        return list;
    }
}
