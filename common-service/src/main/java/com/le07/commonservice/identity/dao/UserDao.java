package com.le07.commonservice.identity.dao;

import com.le07.commonservice.identity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:03
 */
@Repository
public interface UserDao extends JpaRepository<User, Long>{

    User findByNameAndPassword(String name, String password);

    @Modifying
    @Query("update User set password = ?2 where id = ?1")
    void updateUserPassword(long userId, String newPassword);

    @Query("from User where id in (?1)")
    List<User> getUserByIds(Set<Long> userIds);
}
