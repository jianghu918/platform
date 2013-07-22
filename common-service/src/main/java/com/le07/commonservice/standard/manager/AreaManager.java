package com.le07.commonservice.standard.manager;

import com.le07.commonservice.standard.model.model.Area;

import java.util.List;

/**
 * 区域服务管理
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午4:58
 */
public interface AreaManager {


    List<Area> findByPid(Long pid);

}
