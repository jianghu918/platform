package com.le07.commonservice.app.manager.impl;

import com.le07.commonservice.app.dao.BizDao;
import com.le07.commonservice.app.manager.BizManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * //TODO
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 下午6:03
 */
@Service
@Transactional
public class BizManagerImpl implements BizManager{

    @Autowired
    private BizDao bizDao;

    @Override
    @Transactional(readOnly = true)
    public long getBizId(String bizKey) {
        return bizDao.getBizId(bizKey);
    }

    @Override
    @Transactional(readOnly = true)
    public String getBizKey(long bizId) {
        return bizDao.getBizKey(bizId);
    }
}
