package com.le07.commonservice.standard.util;

import com.le07.commonservice.standard.model.Area;

/**
 * 简述
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-7-1
 * Time: 下午5:00
 */
@SuppressWarnings({"unused"})
public class AreaConverter {


    public static com.le07.api.standard.Area toThriftArea(Area area) {
        com.le07.api.standard.Area entity = new com.le07.api.standard.Area();
        entity.setId(area.getId());
        entity.setName(area.getName());
        entity.setPid(area.getPid());
        entity.setLevel(area.getLevel());
        entity.setDisplayorder(area.getDisplayOrder());
        entity.setUsetype(area.getUseType());
        return entity;
    }

}
