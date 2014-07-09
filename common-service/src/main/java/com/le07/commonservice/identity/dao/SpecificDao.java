package com.le07.commonservice.identity.dao;

import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;

import java.util.List;

/**
 * 复杂的查询
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-3
 * Time: 下午1:38
 */
public interface SpecificDao {

    List<User> listUsers(Query query, long offset, long size);
}
