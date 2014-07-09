package com.le07.catering.web.controller.admin;

import com.le07.catering.web.Constants;
import com.le07.framework.base.BaseController;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 登录Controller
 * Created with IDEA.
 * User: hu
 * Date: 13-8-5
 * Time: 下午1:20
 */
@Controller
@RequestMapping(value = Constants.LOGIN)
public class LoginController extends BaseController{


    @RequestMapping(method = RequestMethod.GET)
    public String index()
    {
        return "admin/login";
    }
    
    @RequestMapping(method = RequestMethod.POST)
	public String fail(@RequestParam(FormAuthenticationFilter.DEFAULT_USERNAME_PARAM) String userName, Model model) {
		model.addAttribute(FormAuthenticationFilter.DEFAULT_USERNAME_PARAM, userName);
		return "admin/login";
	}
}
