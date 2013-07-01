package com.le07.commonservice.identity.dao;

import com.le07.commonservice.identity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 简述
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:03
 */
@Repository
public interface UserDao extends JpaRepository<User, Long>{

}
