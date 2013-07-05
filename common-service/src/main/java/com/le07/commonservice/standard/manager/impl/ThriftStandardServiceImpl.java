package com.le07.commonservice.standard.manager.impl;

import com.le07.api.standard.Area;
import com.le07.api.standard.AreaService;
import com.le07.api.type.AnyException;
import com.le07.commonservice.standard.manager.AreaManager;
import com.le07.commonservice.standard.util.AreaConverter;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午5:05
 */
@Service("thriftAreaService")
public class ThriftStandardServiceImpl implements AreaService.Iface {

    @Autowired
    private AreaManager manager;

    @Override
    public List<Area> getAreaByPid(long pid) throws AnyException, TException {
        List<com.le07.commonservice.standard.model.Area> areas = manager.findByPid(pid);
        if (CollectionUtils.isEmpty(areas)) {
            return Collections.EMPTY_LIST;
        }
        List<Area> areaList = new ArrayList<Area>(areas.size());

        for (com.le07.commonservice.standard.model.Area entity : areas) {
            areaList.add(AreaConverter.toThriftArea(entity));
        }
        return areaList;
    }
}
