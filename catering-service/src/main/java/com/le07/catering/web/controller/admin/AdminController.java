package com.le07.catering.web.controller.admin;

import com.le07.catering.web.Constants;
import com.le07.framework.BaseController;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
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
     * 一般是先到登录页面
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String login(){
        return "admin/login";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String login(String username, String password){
        Subject currentUser = SecurityUtils.getSubject();
        if(!currentUser.isAuthenticated()){
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            token.setRememberMe(true);
            currentUser.login(token);
            SecurityUtils.getSubject().getSession().setAttribute("shiroUser", SecurityUtils.getSubject().getPrincipal());
            return "/admin/index";
        }
        return REDIRECT + "/admin/login";
    }




}
