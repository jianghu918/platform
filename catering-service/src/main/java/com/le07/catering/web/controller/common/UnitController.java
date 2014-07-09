package com.le07.catering.web.controller.common;

import com.alibaba.fastjson.JSONObject;
import com.le07.catering.web.Constants;
import com.le07.commonservice.standard.manager.UnitManager;
import com.le07.commonservice.standard.model.Unit;
import com.le07.framework.base.BaseController;
import com.le07.framework.global.type.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-20
 * Time: 上午9:35
 */
@RequestMapping(Constants.UNIT)
@Controller
public class UnitController extends BaseController {

    @Autowired
    private UnitManager unitManager;

    @RequestMapping(method = RequestMethod.GET)
    public String list(Model model,
                       @PageableDefaults(pageNumber = 0, value = 10) Pageable pageable) {
        model.addAttribute("pages", unitManager.findAll(pageable));
        model.addAttribute("status", Status.values());
        return Constants.UNIT + "/list";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model) {
        model.addAttribute("status", Status.values());
        return Constants.UNIT + "/add";
    }


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject add(Unit unit) {
        try {
            unitManager.save(unit);
        } catch (Exception e) {
            LOG.error("save unit error:{0}", e);
            return getErrorJson(e.getMessage());
        }
        return getInfoJson();
    }


    @RequestMapping(value = "/del/{ids}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject del(@PathVariable Long[] ids) {
        try {
            for (Long id : ids) {
                unitManager.delete(id);
            }
        } catch (Exception e) {
            LOG.error("del unit error:{0}", e);
            return getErrorJson(e.getMessage());
        }
        return getInfoJson();
    }


    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public String get(@PathVariable Long id, Model model) {
        model.addAttribute("obj", unitManager.findOne(id));
        model.addAttribute("status", Status.values());
        return Constants.UNIT + "/add";
    }

}
