package com.le07.commonservice.identity.dao;

import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;

import java.util.List;

/**
 * 身份服务所有复杂的查询接口都定义在这儿了
 * 统一定义，不用定义多个。
 *
 * Created with IDEA
 * User: jh
 * Date: 13-7-4
 * Time: 下午4:23
 */
public interface SpecificDao {


    //----- USER相关 ------------------------------------------------------------------//

    /**
     * 查询用户
     * @param query
     * @param offset
     * @param size
     * @return
     */
    List<User> listUsers(Query query, long offset, long size);










}
