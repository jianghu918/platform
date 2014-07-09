package com.le07.catering.web.controller.index;

import com.le07.catering.manager.CompanyManager;
import com.le07.catering.web.Constants;
import com.le07.commonservice.standard.manager.AreaManager;
import com.le07.commonservice.standard.manager.ClassificationManager;
import com.le07.commonservice.standard.model.Classification;
import com.le07.framework.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;

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

    @Autowired
    private ClassificationManager classificationManager;

    @Autowired
    private CompanyManager companyManager;

    @Autowired
    private AreaManager areaManager;

    @Autowired
    private HttpSession session;


    /**
     * 首页
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String index(Model model)
    {
        //菜系
        session.setAttribute("entreeTypes", classificationManager.get_children(1, ClassificationManager.IS_COMM_ROOT));

        //商圈
        session.setAttribute("tags", companyManager.findAll(new PageRequest(0, 10)).getContent());

        //区域
        session.setAttribute("areas", areaManager.findByPid(166L));



        return "index/index";
    }








}
