package com.le07.catering.web.controller.admin;

import com.alibaba.fastjson.JSONObject;
import com.le07.catering.manager.CompanyManager;
import com.le07.catering.model.Company;
import com.le07.catering.web.Constants;
import com.le07.commonservice.app.manager.AppManager;
import com.le07.commonservice.standard.manager.AreaManager;
import com.le07.framework.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

/**
 * Company Controller
 *
 * Created with IDEA.
 * User: hu
 * Date: 13-8-6
 * Time: 下午4:36
 */
@Controller
@RequestMapping(Constants.COMPANY)
public class CompanyController extends BaseController{

    @Autowired
    private CompanyManager companyManager;

    @Autowired
    private AppManager appManager;

    @Autowired
    private AreaManager areaManager;



    @RequestMapping(method = RequestMethod.GET)
    public String list(Model model,
                       @PageableDefaults(pageNumber = 0, value = 10)Pageable  pageable){
        //ShiroDbRealm.ShiroUser shiroUser = getShiroUser();
        model.addAttribute("pages", companyManager.findAll(pageable));
        return Constants.COMPANY + "/list";
    }




    @RequestMapping(value ="/add", method = RequestMethod.GET)
    public String add(Model model)
    {
    	model.addAttribute("apps", appManager.getBizs());
        model.addAttribute("areas", areaManager.findByPid(0l));
        return Constants.COMPANY + "/add";
    }
    
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String add(Company company)
    {
        company.setPhone(company.getPhone().replace(",",""));
        companyManager.save(company);
        return REDIRECT + Constants.COMPANY;
    }
    

    @RequestMapping("/del")
    @ResponseBody
    public JSONObject del(@RequestParam("ids") Long[] ids){
        try {
            for (Long id : ids) {
                companyManager.delete(id);
            }
        } catch (Exception e) {
            LOG.error("del error:{0}",e);
            return getErrorJson(e.getMessage());
        }

        return getInfoJson();
    }




    @RequestMapping("/get/{id}")
    public String get(@PathVariable Long id, Model model){
        model.addAttribute("apps", appManager.getBizs());
        model.addAttribute("areas", areaManager.findByPid(0l));

        model.addAttribute("obj", companyManager.findOne(id));
        return Constants.COMPANY + "/add";
    }


}
