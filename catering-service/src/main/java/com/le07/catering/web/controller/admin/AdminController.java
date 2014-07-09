package com.le07.catering.web.controller.admin;

import com.le07.catering.shiro.realm.ShiroDbRealm.ShiroUser;
import com.le07.catering.web.Constants;
import com.le07.framework.base.BaseController;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 后台管理总入口
 * Created with IDEA.
 * User: hu
 * Date: 13-7-31
 * Time: 下午5:05
 */
@Controller
@RequestMapping(Constants.ADMIN)
public class AdminController extends BaseController{


    /**
     * 默认的后台首页
     */
	@RequestMapping(method = RequestMethod.GET)
    public String index(){

		
        return "admin/index";
    }


    private ShiroUser getShiroUser()
    {
        return (ShiroUser) SecurityUtils.getSubject().getPrincipal();
    }


}
