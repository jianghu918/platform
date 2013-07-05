package com.le07.commonservice.standard.manager.impl;

import com.le07.commonservice.standard.dao.AreaDao;
import com.le07.commonservice.standard.manager.AreaManager;
import com.le07.commonservice.standard.model.Area;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午4:59
 */
@Service
public class AreaManagerImpl implements AreaManager{

    @Autowired
    private AreaDao areaDao;

    @Override
    public List<Area> findByPid(Long pid) {
        return areaDao.findByPid(pid);
    }
}
