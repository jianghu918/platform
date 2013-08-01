package com.le07.commonservice.identity.dao;

import com.le07.commonservice.identity.model.Role;
import com.le07.framework.entity.GeneralEntityDAO;

import java.util.List;

/**
 * Role Dao
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-7-31
 * Time: 下午11:03
 */
public interface RoleDao extends GeneralEntityDAO<Role, Long>{
    void updateRoleAuthority(long roleId, String authority);

    List<Role> getUserRoles(long userId);
}
