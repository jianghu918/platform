package com.le07.catering.web.controller.admin;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.le07.catering.manager.BoardManager;
import com.le07.catering.manager.CompanyManager;
import com.le07.catering.model.Board;
import com.le07.catering.type.BoardStatus;
import com.le07.catering.web.Constants;
import com.le07.framework.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-19
 * Time: 下午1:28
 */
@Controller
@RequestMapping(Constants.BOARD)
public class BoardController extends BaseController {

    @Autowired
    private CompanyManager companyManager;

    @Autowired
    private BoardManager boardManager;



    @RequestMapping(value = "/{companyId}", method = RequestMethod.GET)
    public String index(@PathVariable Long companyId, Model model,
                            @PageableDefaults(pageNumber = 0, value = 10, sort = "id", sortDir = Sort.Direction.DESC)Pageable pageable){
        model.addAttribute("company", companyManager.findOne(companyId));
        model.addAttribute("cid", String.valueOf(companyId));
        model.addAttribute("pages", boardManager.findAll(pageable));
        model.addAttribute("status", BoardStatus.values());
        return Constants.BOARD + "/list";
    }



    @RequestMapping(value = "/add/{companyId}", method = RequestMethod.GET)
    public String add(@PathVariable Long companyId, Model model){
        model.addAttribute("company", companyManager.findOne(companyId));
        model.addAttribute("status", BoardStatus.values());
        return Constants.BOARD + "/add";
    }



    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String add(Board board){
        if(null != board.getSn() && board.getSn() > 0 && null != board.getEn() && board.getEn() > 0 && board.getSn()<board.getEn())
        {
            List<Board> entities = Lists.newArrayListWithCapacity(board.getEn() - board.getSn());
            for(int i=1, end = board.getEn()-board.getSn() + 1; i<= end; i++)
            {
                Board entity = new Board();
                entity.setName(board.getName() + i);
                entity.setSummary(board.getSummary());
                entity.setGalleryful(board.getGalleryful());
                entity.setCompany(board.getCompany());
                entities.add(entity);
            }
            boardManager.save(entities);
        }else{
            boardManager.save(board);
        }
        return REDIRECT + Constants.BOARD + "/" + board.getCompany().getId();
    }

    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public String get(@PathVariable Long id, Model model){
        model.addAttribute("obj", boardManager.findOne(id));
        model.addAttribute("status", BoardStatus.values());
        return Constants.BOARD + "/edit";
    }



    @RequestMapping(value = "/del/{id}", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject del(@PathVariable Long[] ids){
        try {
            for (Long id : ids) {
                boardManager.delete(id);
            }
        } catch (Exception e) {
            LOG.error("del board error: {0}", e);
            return getErrorJson(e.getMessage());
        }
        return getInfoJson();
    }



    /*@Override
    protected void initBinder(ServletRequestDataBinder binder) throws Exception {
        binder.registerCustomEditor(BoardStatus.class, new BoardStatusEnumEditor(true));
        super.initBinder(binder);
    }*/
}
