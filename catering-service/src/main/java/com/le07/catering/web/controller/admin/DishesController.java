package com.le07.catering.web.controller.admin;

import com.alibaba.fastjson.JSONObject;
import com.le07.catering.manager.DishesManager;
import com.le07.catering.model.Dishes;
import com.le07.catering.web.Constants;
import com.le07.commonservice.standard.manager.ClassificationManager;
import com.le07.commonservice.standard.manager.UnitManager;
import com.le07.commonservice.standard.model.Classification;
import com.le07.framework.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
 * Date: 13-8-23
 * Time: 下午1:24
 */
@Controller
@RequestMapping(Constants.DISHES)
public class DishesController extends BaseController{

    @Autowired
    private DishesManager dishesManager;

    @Autowired
    private UnitManager unitManager;

    @Autowired
    private ClassificationManager classificationManager;


    @RequestMapping(value = "/{companyId}", method = RequestMethod.GET)
    public String list(Model model, @PathVariable Long companyId,
                      @PageableDefaults(value = 10, pageNumber = 0) Pageable pageable){
        model.addAttribute("pages", dishesManager.findAll(pageable));
        return Constants.DISHES + "/list";
    }

    @RequestMapping(value = "/add/{companyId}", method = RequestMethod.GET)
    public String add(@PathVariable Long companyId, Model model)
    {
        model.addAttribute("companyId", companyId);
        model.addAttribute("units", unitManager.findAll(new PageRequest(0, 100)));
        return Constants.DISHES + "/add";
    }


    @RequestMapping(value = "/get/${companyId}/{id}", method = RequestMethod.GET)
    public String get(@PathVariable Long companyId,@PathVariable Long id, Model model)
    {
        Dishes dishes = dishesManager.findOne(id);
        model.addAttribute("obj", dishes);
        model.addAttribute("companyId", companyId);
        model.addAttribute("classification", classificationManager.findOne(dishes.getClassificationId()));
        model.addAttribute("units", unitManager.findAll(new PageRequest(0, 100)));
        return Constants.DISHES + "/add";
    }


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public @ResponseBody JSONObject add(Dishes dishes)
    {
        try {
            dishesManager.save(dishes);
        } catch (Exception e) {
            LOG.error("save dishes error : {0}", e);
            return getErrorJson(e.getMessage());
        }
        return getInfoJson();
    }


    @RequestMapping(value = "/del/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject add(@PathVariable Long id)
    {
        try {
            dishesManager.delete(id);
        } catch (Exception e) {
            LOG.error("del dishes error : {0}", e);
            return getErrorJson(e.getMessage());
        }
        return getInfoJson();
    }

}
