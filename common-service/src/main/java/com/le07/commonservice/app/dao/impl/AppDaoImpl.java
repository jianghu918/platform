package com.le07.commonservice.app.dao.impl;

import com.google.common.collect.Lists;
import com.le07.commonservice.app.dao.AppDao;
import com.le07.commonservice.app.model.App;
import com.le07.framework.global.type.Status;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 下午1:51
 */
@Repository
public class AppDaoImpl extends HibernateEntityDAO<App, Long> implements AppDao{

    @Override
    public void updateAppStatus(Status status, Long[] ids) {
        App app;
        List<App> list = Lists.newArrayListWithCapacity(ids.length);
        for (Long id : ids) {
            app = get(id);
            if(null != app)
            {
                app.setStatus(status);
                list.add(app);
            }
        }
    }
}
