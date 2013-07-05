package com.le07.commonservice.app.manager.impl;

import com.le07.api.app.BizConfig;
import com.le07.api.app.BizConfigService;
import com.le07.api.type.AnyException;
import com.le07.commonservice.app.manager.BizConfigManager;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 下午1:55
 */
@Service("thriftBizService")
public class ThriftBizServiceImpl implements BizConfigService.Iface {

    @Autowired
    private BizConfigManager manager;

    @Override
    public BizConfig getBizConfig(String bizKey, String configKey) throws AnyException, TException {
        return null;
    }

    @Override
    public BizConfig getBizConfigById(long bizId, String configKey) throws AnyException, TException {
        return null;
    }

    @Override
    public void saveBizConfig(BizConfig bizConfig) throws AnyException, TException {

    }

    @Override
    public List<BizConfig> getBizConfigs(String configKey) throws AnyException, TException {
        return null;
    }

    @Override
    public long getBizId(String bizKey) throws AnyException, TException {
        return manager.getBizId(bizKey);
    }
}
