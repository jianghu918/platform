package com.le07.commonservice.app.manager.impl;

import com.le07.commonservice.app.dao.BizDao;
import com.le07.commonservice.app.manager.BizConfigManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 *
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 下午1:51
 */
@Service
public class BizConfigManagerImpl  implements BizConfigManager{


    @Autowired
    private BizDao bizDao;


    @Override
    public long getBizId(String bizKey) {
        return (int) bizDao.getBizId(bizKey);
    }

    @Override
    public String getBizKey(long bizId) {
        return bizDao.getBizKey(bizId);
    }



}
