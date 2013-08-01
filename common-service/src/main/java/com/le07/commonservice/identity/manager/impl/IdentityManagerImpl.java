package com.le07.commonservice.identity.manager.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.identity.dao.RoleDao;
import com.le07.commonservice.identity.dao.UserDao;
import com.le07.commonservice.identity.manager.IdentityManager;
import com.le07.commonservice.identity.model.Role;
import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;
import com.le07.framework.global.type.Status;
import com.le07.framework.global.type.UserType;
import com.le07.framework.util.Page;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

import java.util.*;

/**
 * 用户身份
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:08
 */
@Service
@Transactional
public class IdentityManagerImpl implements IdentityManager {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;


    @Override
    public User createUser(User user) {
        User u = userDao.save(user);
        u.setCreateAt(new Date());
        return u;
    }

    @Override
    public User createUserByNameAndPwd(String name, String password)  {
        User user = new User();
        user.setName(name);
        user.setPassword(password);
        user.setCreateAt(new Date());
        user.setStatus(Status.ENABLED);
        user.setType(UserType.CONSUMER);
        return userDao.save(user);
    }




    public static String[] userAttrFileds = {"type", "phone", "age", "sex", "city", "qq", "msn", "weixin", "blog", "remark", "y1", "y2", "y3", "y4", "y5"};

    @Override
    public void updateUserAttr(User user) {
        User original = userDao.get(user.getId());
        /*if(null == original)
        {
            throw new IdentityException(ECode.IdentityCode.ENTITY_NOT_FOUND);
        }*/
        Assert.notNull(original, "user not found: id:" + user.getId());
        BeanUtils.copyProperties(user, original, userAttrFileds);
        userDao.save(original);
    }

    @Override
    public void updateUserPassword(String name, String oldPassword, String newPassword) {
        User original = userDao.findByNameAndPassword(name, DigestUtils.md5Hex(oldPassword));
        Assert.notNull(original, "user not found: name:" + name);
        original.setPassword(newPassword);
        userDao.save(original);
    }


    @Override
    public void updateUserStatus(long userId, Status status)  {
        User user = userDao.get(userId);
        Assert.notNull(user, "user not found: id:" + userId);
        user.setStatus(status);
        userDao.save(user);
    }

    @Override
    public void batchUpdateUserStatus(Set<Long> userIds, Status status) {
        if(CollectionUtils.isEmpty(userIds))
            return;
        for (Long userId : userIds) {
            updateUserStatus(userId, status);
        }
    }

    @Override
    public void removeUser(long userId)  {
        updateUserStatus(userId, Status.DELETED);
    }

    @Override
    public void batchRemoveUser(Set<Long> userIds) {
        if(CollectionUtils.isEmpty(userIds))
            return;
        for (Long userId : userIds) {
            removeUser(userId);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByNameAndPwd(String name, String password) {
        return userDao.findByNameAndPassword(name, DigestUtils.md5Hex(password));
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(long userId) {
        return userDao.get(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, User> batchGetUserByIds(Set<Long> userIds) {
        if(CollectionUtils.isEmpty(userIds))
            return Collections.EMPTY_MAP;
        List<User> users = userDao.getUserByIds(userIds);
        if(CollectionUtils.isEmpty(users))
            return Collections.EMPTY_MAP;
        Map<Long, User> map = Maps.newHashMap();
        for (User user : users) {
            map.put(user.getId(), user);
        }
        return map;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<User> listUsers(Query query, long offset, long size) {
        Page<User> page = new Page<User>();
        page.setTotal((int) userDao.count());
        page.setItems(userDao.listUsers(query, offset, size));
        return page;
    }

    @Override
    public Role createUserRole(long userId, String authority) {
        Role role = new Role();
        role.setUser(getUserById(userId));
        role.setAuthority(authority);
        return roleDao.save(role);
    }

    @Override
    public void updateUserRole(long roleId, String authority) {
        roleDao.updateRoleAuthority(roleId, authority);
    }

    @Override
    public List<Role> getUserRoles(long userId) {
        return roleDao.getUserRoles(userId);
    }
}
