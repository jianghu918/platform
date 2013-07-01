package com.le07.commonservice.identity.manager.impl;

import com.le07.api.identity.IdentityService;
import com.le07.api.identity.PageUser;
import com.le07.api.identity.Query;
import com.le07.api.identity.User;
import com.le07.api.type.AnyException;
import com.le07.api.type.Status;
import com.le07.commonservice.identity.manager.IdentityManager;
import com.le07.commonservice.identity.util.Converter;
import org.apache.thrift.TException;
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
 * Time: 下午3:12
 */
@Service("thriftIdentityService")
public class ThriftIdentityServiceImpl implements IdentityService.Iface{

    @Autowired
    private IdentityManager manager;


    @Override
    public long createUser(User user) throws AnyException, TException {
        return manager.createUser(Converter.toUser(user));
    }

    @Override
    public long createUserByNameAndPwd(String name, String password) throws AnyException, TException {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void updateUserAttr(User user) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void updateUserPassword(String name, String oldPassword, String newPassword) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void updateUserStatus(long userId, Status status) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void batchUpdateUserStatus(Set<Long> userIds, Status status) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void removeUser(long userId) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void batchRemoveUser(Set<Long> userIds) throws AnyException, TException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public User getUserByNameAndPwd(String name, String password) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public User getUserById(long userId) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Map<Long, User> batchGetUserByIds(Set<Long> userIds) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public PageUser listUsers(Query query, long offset, long size) throws AnyException, TException {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
