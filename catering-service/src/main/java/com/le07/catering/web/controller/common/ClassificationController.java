package com.le07.catering.web.controller.common;

import com.alibaba.fastjson.JSONObject;
import com.le07.catering.web.Constants;
import com.le07.commonservice.standard.manager.ClassificationManager;
import com.le07.commonservice.standard.model.Classification;
import com.le07.framework.base.BaseController;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-20
 * Time: 下午4:08
 */
@Controller
@RequestMapping(Constants.CLASSIFICATION)
public class ClassificationController extends BaseController {


    @Autowired
    private HttpServletRequest request;

    @Autowired
    private ClassificationManager classificationManager;


    @RequestMapping(value = "/{companyId}", method = RequestMethod.GET)
    public String list(Model model, @PathVariable Long companyId,
                       @RequestParam(required = false, defaultValue = "0") Long pid){
        model.addAttribute("pages", classificationManager.findAll(companyId, pid));
        model.addAttribute("companyId", companyId);
        model.addAttribute("status", getStatus());
        return Constants.CLASSIFICATION + "/list";
    }

    @RequestMapping(value = "/add/{companyId}", method = RequestMethod.GET)
    public String add(Model model, @PathVariable Long companyId){
        if(companyId > 0)
            model.addAttribute("companyId", companyId);
        return Constants.CLASSIFICATION + "/add";
    }


    @RequestMapping(value = "/get/{companyId}", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject get(@PathVariable Long companyId){


         return null;
    }

    @RequestMapping(value = "/getTree/{companyId}", method = RequestMethod.POST)
    @ResponseBody
    public String getTree(@PathVariable Long companyId){

        long pid = StringUtils.isNotBlank(request.getParameter("id"))
                ? Integer.parseInt(request.getParameter("id")) : 0;

        List<Classification> list = companyId == 0 ? classificationManager.get_children(pid, ClassificationManager.IS_COMM_ROOT, null)
                : classificationManager.get_children(pid, ClassificationManager.IS_ROOT, "CTR");

        StringBuffer sb = new StringBuffer("[") ;
        for (Classification classification : list) {
            sb.append("{");
            sb.append("\"id\":\"").append(classification.getId()).append("\",");
            sb.append("\"pId\":\"").append(classification.getPid()).append("\",");
            sb.append("\"name\":\"").append(classification.getName()).append("\",");
            //sb.append("\"isParent\":").append(classification.isParent());
            sb.append("\"isParent\":").append(classificationManager.isParent(classification.getId()));
            sb.append("},");
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.append("]").toString();
    }



    @RequestMapping(value = "/add/{companyId}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject add(Long id, Long pid, String name, boolean isParent, @PathVariable Long companyId){
        Classification c;
        try {
            Classification classification = new Classification();
            if(id > 0){
                classification.setId(id);
            }
            if(companyId > 0)
            {
                classification.setBizKey("CTR");
            }
            classification.setPid(null == pid ? 0 : pid);    //恰好根的pid是0
            classification.setName(name);
            classification.setParent(isParent);
            classification.setType(companyId == 0 ? ClassificationManager.IS_COMM_ROOT : ClassificationManager.IS_ROOT);
            c = classificationManager.save(classification);
        }catch (Exception e){
            LOG.error("add classification error:{0}", e);
            return getErrorJson(e.getMessage());
        }
        Map<String, Object> param = new HashMap<String, Object>(1);
        param.put("id", c.getId());
        return this.getInfoJson(param);
    }

    public JSONObject getInfoJson(Map<String, Object> param){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(CODE, 0);
        if(!CollectionUtils.isEmpty(param)){
            jsonObject.putAll(param);
        }
        jsonObject.put(MESSAGE, "operation successfully completed!");
        return jsonObject;
    }



    @RequestMapping(value = "/drop", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject drop(Long id, Long pid){
        try{
            classificationManager.updateClassificationPid(id, pid);
        }catch (Exception e){
            LOG.error("drop classification error:{0}", e);
            return getErrorJson(e.getMessage());
        }
        return getInfoJson();
    }



    @RequestMapping(value = "/del/{classificationId}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject del(@PathVariable Long classificationId){
        try {
            classificationManager.deleteByPid(classificationId);
            classificationManager.delete(classificationId);

        }catch (Exception e){
            LOG.error("del classification error:{0}", e);
            return getErrorJson(e.getMessage());
        }
        return getInfoJson();
    }

}

