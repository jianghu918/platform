package com.le07.commonservice.identity.dao;

import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;
import com.le07.framework.entity.GeneralEntityDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:03
 */
@Repository
public interface UserDao extends GeneralEntityDAO<User, Long> {

    User findByNameAndPassword(String name, String password);


    void updateUserPassword(long userId, String newPassword);

    List<User> getUserByIds(Set<Long> userIds);

    List<User> listUsers(Query query, long offset, long size);

    long count();
}
