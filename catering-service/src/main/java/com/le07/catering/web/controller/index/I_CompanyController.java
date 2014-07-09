package com.le07.catering.web.controller.index;

import com.le07.catering.manager.BoardManager;
import com.le07.catering.manager.CompanyManager;
import com.le07.catering.model.Company;
import com.le07.catering.vto.CompanyQuery;
import com.le07.catering.web.Constants;
import com.le07.commonservice.app.manager.AppManager;
import com.le07.commonservice.standard.manager.AreaManager;
import com.le07.framework.base.BaseController;
import com.le07.framework.util.RequestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-9-5
 * Time: 下午3:03
 */
@RequestMapping(Constants.INDEX_COMPANY)
@Controller
public class I_CompanyController extends BaseController {

    @Autowired
    private CompanyManager companyManager;

    @Autowired
    private BoardManager boardManager;

    @Autowired
    private AppManager appManager;

    @Autowired
    private AreaManager areaManager;

    @Autowired
    private HttpSession session;



    /**
     * 查询所有符合条件的商家
     * @param model
     * @return
     */
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public String getAll(Model model, HttpServletRequest request,
                         @PageableDefaults(pageNumber = 0, value = 10, sortDir = Sort.Direction.DESC)Pageable pageable){
        model.addAttribute("pages", getCompanyPage(request, pageable));
        return Constants.INDEX_VIEW + "searchResult";
    }

    private Page<Company> getCompanyPage(HttpServletRequest request, Pageable pageable){
        String entreeId = WebUtils.findParameterValue(request, "entreeId");
        String areaId = WebUtils.findParameterValue(request, "areaId");
        String tag = WebUtils.findParameterValue(request, "tag");
        CompanyQuery companyQuery = new CompanyQuery();
        companyQuery.setEntreeId(StringUtils.isBlank(entreeId) ? null : Long.valueOf(entreeId));
        companyQuery.setAreaId(StringUtils.isBlank(areaId) ? null : Long.valueOf(areaId));
        companyQuery.setTag(StringUtils.isBlank(tag) ? null : tag);
        Page<Company> companyPage = companyManager.listCompany(companyQuery, pageable);
        return companyPage;
    }


    @RequestMapping(value = "/ajaxGetAll", method = RequestMethod.GET)
    @ResponseBody
    public Page<Company> ajaxGetAll(HttpServletRequest request,
                        @PageableDefaults(pageNumber = 0, value = 10)Pageable pageable){
        Page<Company> companyPage = getCompanyPage(request, pageable);
        return companyPage;
    }


    @RequestMapping(value = "/detail/{companyId}", method = RequestMethod.GET)
    public String getCompanyDetail(@PathVariable Long companyId,
                                   Model model){
        model.addAttribute("company", companyManager.findOne(companyId));

        //订单信息
        model.addAttribute("boards", boardManager.findByCompanyId(companyId));

        //餐桌信息

        return Constants.INDEX_VIEW + "companyDetail";
    }


}
