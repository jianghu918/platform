package com.le07.commonservice.app.dao;

import com.le07.commonservice.app.model.App;
import com.le07.framework.entity.GeneralEntityDAO;
import com.le07.framework.global.type.Status;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-6-28
 * Time: 上午11:06
 */

public interface AppDao extends GeneralEntityDAO<App, Long> {
    void updateAppStatus(Status status, Long[] ids);
}
