package com.le07.api.tester.web;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.le07.api.tester.service.ApiService;
import com.le07.framework.api.metadata.*;
import com.le07.framework.api.metadata.Package;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "test")
public class TestController {

    @Autowired
    private ApiService apiService;

    @RequestMapping(method = RequestMethod.GET)
    public String index(Model model) throws Exception {
        model.addAttribute("services", apiService.getServices());
        return "test/index";
    }

    @RequestMapping(method = RequestMethod.GET, value = "{method}")
    public String service(Model model, @PathVariable(value = "method") String m) {
        Method method = apiService.getNode(m, Method.class);
        List<String> argIds = new ArrayList<String>();
        for (Field arg : method.getArgs()) {
            argIds.add(arg.getId());
        }
        model.addAttribute("vhs", apiService.getValuesMap(argIds, 6));
        Service service = (Service) method.getParent();
        Package pk = (Package) service.getParent();
        model.addAttribute("method", method);
        model.addAttribute("service", service);
        model.addAttribute("pk", pk);
        model.addAttribute("services", apiService.getServices());
        return "test/test";
    }

    @RequestMapping(method = RequestMethod.GET, value = "type")
    public String type(Model model, @RequestParam(value = "id") String id) {
        Node node = apiService.getNode(id);
        if (node != null) {
            model.addAttribute("node", apiService.getNode(id));
            model.addAttribute("type", node.getClass().getSimpleName());
        }
        return "test/type";
    }

    @RequestMapping(method = RequestMethod.POST, value = "save")
    @ResponseBody
    public void save(HttpServletRequest request, @RequestParam(value = "id") String id) {
        Map<String, String> map = new HashMap<String, String>();
        Method method = apiService.getNode(id, Method.class);
        for (Field f : method.getArgs()) {
            String value = request.getParameter(f.getName());
            if (StringUtils.isNotBlank(value)) {
                map.put(f.getId(), value.trim());
            }
        }
        apiService.saveValues(map);
    }
}
