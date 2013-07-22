package com.le07.commonservice.util;

import com.le07.commonservice.app.manager.BizManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 公共
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午3:00
 */
@Service
@Transactional
public class BaseManagerImpl {

    @Autowired
    private BizManager bizManager;

    @Transactional(readOnly = true)
    public long getBizId(String bizKey)
    {
        return bizManager.getBizId(bizKey);
    }

    @Transactional(readOnly = true)
    public String getBizKey(long bizId)
    {
        return bizManager.getBizKey(bizId);
    }


}
