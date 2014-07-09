package com.le07.catering.web.controller.common;

import com.le07.catering.web.Constants;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 页面上的一些公用组件
 * 调用时使用jsp:include
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-23
 * Time: 下午2:40
 */
@Controller
@RequestMapping(Constants.COMPONENT)
public class Component {


    @RequestMapping("/editor/upload")
    public String getEditor()
    {
        return Constants.EDITOR + "/upload";
    }



    @RequestMapping("/lightBox")
    public String getLightBox()
    {
        return Constants.COMMON + "/lightbox/lightbox";
    }

}
