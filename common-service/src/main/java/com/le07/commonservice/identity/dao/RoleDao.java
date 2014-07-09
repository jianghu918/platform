package com.le07.commonservice.identity.dao;

import com.le07.commonservice.identity.model.Role;
import com.le07.framework.entity.GeneralEntityDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Role Dao
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-7-31
 * Time: 下午11:03
 */
@Repository
@SuppressWarnings("all")
public interface RoleDao extends JpaRepository<Role, Long> {

    @Modifying
    @Query("update Role r set r.permissions = ?2 where id = 1")
    void updateRolePermissions(long roleId, String permissions);

    @Query("select r from Role r where r.user.id = ?1")
    List<Role> getUserRoles(long userId);
}
