package com.le07.api.tester.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.le07.api.tester.service.ApiService;

@Controller
@RequestMapping(value = "doc")
public class DocController {
    @Autowired
    private ApiService apiService;

    @RequestMapping(method = RequestMethod.GET)
    public String index(Model model) throws Exception {
        model.addAttribute("pks", apiService.getPackages());
        return "doc/index";
    }
}
