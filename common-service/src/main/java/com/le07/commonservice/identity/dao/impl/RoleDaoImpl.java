package com.le07.commonservice.identity.dao.impl;

import com.le07.commonservice.identity.dao.RoleDao;
import com.le07.commonservice.identity.model.Role;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Role Dao Implements
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-7-31
 * Time: 下午11:04
 */
@Repository
public class RoleDaoImpl extends HibernateEntityDAO<Role, Long> implements RoleDao{

    @Override
    public void updateRoleAuthority(long roleId, String authority) {
        update(newHqlQuery("update Role set authority = ?1 where id = ?2", authority, roleId));
    }

    @Override
    public List<Role> getUserRoles(long userId) {
        return newCriteria(Restrictions.eq("user.id", userId)).list();
    }
}
