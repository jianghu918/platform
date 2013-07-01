package com.le07.commonservice.identity.manager.impl;

import com.le07.api.type.Status;
import com.le07.commonservice.identity.dao.UserDao;
import com.le07.commonservice.identity.manager.IdentityManager;
import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;
import com.le07.framework.util.PageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;

/**
 * 简述
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:08
 */
@Service
public class IdentityManagerImpl implements IdentityManager{

    @Autowired
    private UserDao userDao;



    @Override
    public long createUser(User user) {
        User u = userDao.save(user);
        return u.getId();
    }

    @Override
    public long createUserByNameAndPwd(String name, String password) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void updateUserAttr(User user) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void updateUserPassword(String name, String oldPassword, String newPassword) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void updateUserStatus(long userId, Status status) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void batchUpdateUserStatus(Set<Long> userIds, Status status) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void removeUser(long userId) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void batchRemoveUser(Set<Long> userIds) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public User getUserByNameAndPwd(String name, String password) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public User getUserById(long userId) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Map<Long, User> batchGetUserByIds(Set<Long> userIds) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public PageEntity<User> listUsers(Query query, long offset, long size) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
