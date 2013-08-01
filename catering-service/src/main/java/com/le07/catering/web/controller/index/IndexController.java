package com.le07.catering.web.controller.index;

import com.le07.catering.web.Constants;
import com.le07.framework.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 前台入口
 * Created with IDEA.
 * User: hu
 * Date: 13-8-1
 * Time: 下午7:34
 */
@Controller
@RequestMapping(Constants.INDEX)
public class IndexController extends BaseController{


    /**
     * 首页
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String index()
    {
        System.out.println("222222222222222222");
        return "index/index";
    }

}
