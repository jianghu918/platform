package com.le07.catering.manager;

import com.le07.catering.model.Board;
import com.le07.framework.base.BaseManager;

import java.util.List;

/**
 * 餐桌信息管理
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-19
 * Time: 下午1:37
 */
public interface BoardManager extends BaseManager<Board, Long> {


    List<Board> findByCompanyId(Long companyId);
}
