package com.le07.catering.web.controller.common;

import com.le07.catering.web.Constants;
import com.le07.commonservice.standard.manager.AreaManager;
import com.le07.commonservice.standard.model.Area;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created with IDEA.
 * User: hu
 * Date: 13-8-7
 * Time: 上午11:28
 */
@Controller
@RequestMapping(Constants.AREA)
public class AreaController {

    @Autowired
    private AreaManager areaManager;

    /**
     * 根据区域ID获取下面的具体区域。
     * level 获取层数
     * @param pid
     * @param level
     * @return
     */
    @RequestMapping(value = "/findByPid", method = RequestMethod.GET)
    @ResponseBody
    public List<Area> getArea(@RequestParam("pid") long pid,
                              @RequestParam(value = "level", required = false, defaultValue = "3") long level){
        List<Area> areas = areaManager.findByPid(pid, level);
        return areas;
    }


}
