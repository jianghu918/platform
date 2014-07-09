package com.le07.commonservice.standard.manager.impl;

import com.le07.commonservice.standard.manager.AreaManager;
import com.le07.commonservice.standard.model.Area;
import com.le07.commonservice.base.BaseManagerImpl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
@Transactional
public class AreaManagerImpl extends BaseManagerImpl implements AreaManager{

    @Override
    @Transactional(readOnly = true)
    public List<Area> findByPid(Long pid) {
        return areaDao.findByPid(pid);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Area> findByPid(Long pid, Long level) {
        return areaDao.findByPid(pid, level);
    }




}
