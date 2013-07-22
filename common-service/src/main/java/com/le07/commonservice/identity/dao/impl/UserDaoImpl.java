package com.le07.commonservice.identity.dao.impl;

import com.le07.commonservice.identity.dao.UserDao;
import com.le07.commonservice.identity.model.User;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 下午4:46
 */
@Repository
public class UserDaoImpl extends HibernateEntityDAO<User, Long> implements UserDao{

    @Override
    public User findByNameAndPassword(String name, String password) {
        Map<String, Object> args = new HashMap<String, Object>(2);
        args.put("name", name);
        args.put("password", password);
        Query query = newHqlQuery("from User where name =: name and password =: password", args);
        List<User> users = query.list();
        return CollectionUtils.isEmpty(users) ? null : users.get(0);
    }

    @Override
    public void updateUserPassword(long userId, String newPassword) {
        update(newHqlQuery("update User set password = ?1 where id = ?2", newPassword, userId));
    }

    @Override
    public List<User> getUserByIds(Set<Long> userIds) {
        Query query = newHqlQuery("from User where id in ?1", userIds);
        return query.list();
    }

    @Override
    public List<User> listUsers(com.le07.commonservice.identity.util.Query query, long offset, long size) {

        return null;
    }

    @Override
    public long count() {
        Query query = newHqlQuery("select count(*) from User");
        return Long.valueOf(query.uniqueResult().toString());
    }
}
