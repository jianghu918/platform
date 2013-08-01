package com.le07.commonservice.identity.manager;

import com.le07.commonservice.identity.model.Role;
import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 用户身份信息服务管理
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午2:53
 */
@SuppressWarnings({"unused"})
public interface IdentityManager {


    /**
     * 创建一个用户
     *
     * @param user 用户
     */
    public User createUser(User user) ;

    /**
     * 根据用户名密码来创建一个用户
     *
     * @param name 用户名
     *
     * @param password 密码
     */
    public User createUserByNameAndPwd(String name, String password) ;

    /**
     * 修改用户附加信息（除用户名密码外）
     *
     * @param user 用户
     */
    public void updateUserAttr(User user) ;

    /**
     * 修改用户密码
     *
     * @param name 用户名
     *
     * @param oldPassword 原始密码
     *
     * @param newPassword 新密码
     */
    public void updateUserPassword(String name, String oldPassword, String newPassword) ;

    /**
     * 修改用户状态
     *
     * @param userId userId
     *
     * @param status 状态
     */
    public void updateUserStatus(long userId, Status status) ;

    /**
     * 批量修改用户状态
     *
     * @param userIds userIds
     *
     * @param status 状态
     */
    public void batchUpdateUserStatus(Set<Long> userIds, Status status) ;

    /**
     * 删除一个用户,这里是物理删除
     * 如不需要物理删除，请调用updateStatus方法，修改状态为DELETE
     *
     * @param userId userId
     */
    public void removeUser(long userId) ;

    /**
     * 删除一个用户,这里是物理删除
     * 如不需要物理删除，请调用updateStatus方法，修改状态为DELETE
     *
     * @param userIds userIds
     */
    public void batchRemoveUser(Set<Long> userIds) ;

    /**
     * 根据用户名，密码查找用户对象，成功返回用户对象, 失败返回为空
     *
     * @param name name
     *
     * @param password 密码
     */
    public User getUserByNameAndPwd(String name, String password) ;

    /**
     * 根据id获取用户
     *
     * @param userId userId
     */
    public User getUserById(long userId) ;

    /**
     * 根据ids获取用户
     *
     * @param userIds userIds
     */
    public Map<Long,User> batchGetUserByIds(Set<Long> userIds) ;

    /**
     * 批量获取用户
     *
     * @param query 用户查询对象
     *
     * @param offset 偏移量
     *
     * @param size size
     */
    public Page<User> listUsers(Query query, long offset, long size) ;



    /**      User Role        **/
    /**
     * 给用户添加权限
     * @param userId
     * @param authority
     * @return
     */
    public Role createUserRole(long userId, String authority);

    /**
     * 修改权限
     * @param roleId
     * @param authority
     */
    public void updateUserRole(long roleId, String authority);


    /**
     * 获取用户权限
     * @param userId
     * @return
     */
    public List<Role> getUserRoles(long userId);
}
