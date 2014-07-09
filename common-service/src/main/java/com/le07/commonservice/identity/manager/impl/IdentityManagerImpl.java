package com.le07.commonservice.identity.manager.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.base.BaseManagerImpl;
import com.le07.commonservice.identity.dao.SpecificDao;
import com.le07.commonservice.identity.manager.IdentityManager;
import com.le07.commonservice.identity.model.Role;
import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;
import com.le07.framework.global.type.Status;
import com.le07.framework.global.type.UserType;
import com.le07.framework.security.util.Digests;
import com.le07.framework.util.EncodeUtils;
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
public class IdentityManagerImpl extends BaseManagerImpl implements IdentityManager {
	public static final String HASH_ALGORITHM = "SHA-1";
	public static final int HASH_INTERATIONS = 1024;
	private static final int SALT_SIZE = 8;
	
    @Autowired
    private SpecificDao specificDao;

    /**
	 * 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
	 */
	private void entryptPassword(User user) {
		byte[] salt = Digests.generateSalt(SALT_SIZE);
		user.setSalt(EncodeUtils.encodeHex(salt));

		byte[] hashPassword = Digests.sha1(user.getPassword().getBytes(), salt, HASH_INTERATIONS);
		user.setPassword(EncodeUtils.encodeHex(hashPassword));
	}
	

    @Override
    public User createUser(User user) {
        user.setCreateAt(new Date());
        entryptPassword(user);
        User u = userDao.save(user);
        return u;
    }

    @Override
    public User createUserByNameAndPwd(String name, String password)  {
        User user = new User();
        user.setName(name);
        user.setCreateAt(new Date());
        user.setStatus(Status.ENABLED);
        user.setType(UserType.CONSUMER);
        entryptPassword(user);
        return userDao.save(user);
    }

    


    public static String[] userAttrFileds = {"type", "phone", "age", "sex", "city", "qq", "msn", "weixin", "blog", "remark", "y1", "y2", "y3", "y4", "y5"};

    @Override
    public void updateUserAttr(User user) {
        User original = userDao.findOne(user.getId());
        /*if(null == original)
        {
            throw new IdentityException(ECode.IdentityCode.ENTITY_NOT_FOUND);
        }*/
        Assert.notNull(original, "user not found: id:" + user.getId());
        BeanUtils.copyProperties(user, original, userAttrFileds);
        userDao.save(original);
    }

    //此方法待修改为reset密码吧
    //TODO
    @Override
    public void updateUserPassword(String name, String oldPassword, String newPassword) {
        User original = userDao.findByLoginName(name);
        Assert.notNull(original, "user not found: name:" + name);
        original.setPassword(newPassword);
        entryptPassword(original);
        userDao.save(original);
    }


    @Override
    public void updateUserStatus(long userId, Status status)  {
        User user = userDao.findOne(userId);
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
    public User getUserByNameAndPwd(String loginName, String password) {
        return userDao.findByLoginName(loginName);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(long userId) {
        return userDao.findOne(userId);
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
        page.setItems(specificDao.listUsers(query, offset, size));
        return page;
    }

    @Override
    public Role createUserRole(long userId, String permissions) {
        Role role = new Role();
        role.setUser(getUserById(userId));
        role.setPermissions(permissions);
        return roleDao.save(role);
    }

    @Override
    public void updateUserRole(long roleId, String permissions) {
        roleDao.updateRolePermissions(roleId, permissions);
    }

    @Override
    public List<Role> getUserRoles(long userId) {
        return roleDao.getUserRoles(userId);
    }


    public static void main(String[] args) {
        System.out.println(DigestUtils.md5Hex("admin"));
    }
}
