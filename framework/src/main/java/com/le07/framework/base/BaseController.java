package com.le07.framework.base;

import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Joiner;
import com.le07.api.type.BoardStatus;
import com.le07.framework.global.type.Status;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.ServletRequestDataBinder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * Controller
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-7-31
 * Time: 下午8:59
 */
@Controller
public class BaseController{



    public static int ZERO = 0;
    public static int PAGESIZE = 0;

    public static String CODE = "code";
    public static String MESSAGE = "message";

    public static final String REDIRECT = "redirect:";

    protected Logger LOG = LoggerFactory.getLogger(BaseController.class);





    protected void initBinder(ServletRequestDataBinder binder) throws Exception {
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy/MM/dd HH:mm:ss"), true));

        //binder.registerCustomEditor(BoardStatus.class, new EnumEditor(BoardStatus.class));
    }



    public Status[] getStatus()
    {
        return Status.values();
    }

    public JSONObject getInfoJson(String... msg){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(CODE, 0);
        if(msg.length > 0)
            jsonObject.put(MESSAGE, Joiner.on(",").skipNulls().join(msg));
        else
            jsonObject.put(MESSAGE, "operation successfully completed!");
        return jsonObject;
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


    public JSONObject getErrorJson(String msg){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(CODE, -1);
        jsonObject.put(MESSAGE, msg);
        return jsonObject;
    }

}
