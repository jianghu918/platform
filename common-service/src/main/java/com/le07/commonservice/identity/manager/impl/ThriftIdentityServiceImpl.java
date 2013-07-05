package com.le07.commonservice.identity.manager.impl;

import com.google.common.collect.Maps;
import com.le07.api.identity.IdentityService;
import com.le07.api.identity.PageUser;
import com.le07.api.identity.Query;
import com.le07.api.identity.User;
import com.le07.api.type.AnyException;
import com.le07.api.type.Status;
import com.le07.commonservice.identity.manager.IdentityManager;
import com.le07.commonservice.identity.util.Converter;
import com.le07.framework.util.Page;
import com.le07.framework.util.ThriftUtils;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

/**
 * 简述
 * <p/>
 * Created with IDEA
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
        return manager.createUserByNameAndPwd(name, password);
    }

    @Override
    public void updateUserAttr(User user) throws AnyException, TException {
        manager.updateUserAttr(Converter.toUser(user));
    }

    @Override
    public void updateUserPassword(String name, String oldPassword, String newPassword) throws AnyException, TException {
        manager.updateUserPassword(name, oldPassword, newPassword);
    }

    @Override
    public void updateUserStatus(long userId, Status status) throws AnyException, TException {
        manager.updateUserStatus(userId, ThriftUtils.toStatus(status));
    }

    @Override
    public void batchUpdateUserStatus(Set<Long> userIds, Status status) throws AnyException, TException {
        manager.batchUpdateUserStatus(userIds, ThriftUtils.toStatus(status));
    }

    @Override
    public void removeUser(long userId) throws AnyException, TException {
        manager.removeUser(userId);
    }

    @Override
    public void batchRemoveUser(Set<Long> userIds) throws AnyException, TException {
        manager.batchRemoveUser(userIds);
    }

    @Override
    public User getUserByNameAndPwd(String name, String password) throws AnyException, TException {
        return Converter.toApiUser(manager.getUserByNameAndPwd(name, password));
    }

    @Override
    public User getUserById(long userId) throws AnyException, TException {
        return Converter.toApiUser(manager.getUserById(userId));
    }

    @Override
    public Map<Long, User> batchGetUserByIds(Set<Long> userIds) throws AnyException, TException {
        Map<Long, com.le07.commonservice.identity.model.User> map = manager.batchGetUserByIds(userIds);
        if(CollectionUtils.isEmpty(map))
        {
            return Collections.EMPTY_MAP;
        }
        Map<Long, User> rs_map = Maps.newHashMap();
        for (Long userId : map.keySet()) {
            rs_map.put(userId, Converter.toApiUser(map.get(userId)));
        }
        return rs_map;
    }

    @Override
    public PageUser listUsers(Query query, long offset, long size) throws AnyException, TException {
        PageUser rs_pageUser = new PageUser();
        Page<com.le07.commonservice.identity.model.User> pageEntity = manager.listUsers(Converter.toQuery(query), offset, size);
        rs_pageUser.setTotal(pageEntity.getTotal());
        rs_pageUser.setItems(Converter.toApiUser(pageEntity.getItems()));
        return rs_pageUser;
    }
}
