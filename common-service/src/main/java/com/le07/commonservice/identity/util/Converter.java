package com.le07.commonservice.identity.util;


import com.le07.commonservice.identity.model.User;

/**
 * 简述
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:03
 */
public class Converter {


    public static User toUser(com.le07.api.identity.User user) {
        User u = new User();
        u.setName(user.getName());
        u.setPassword(u.getPassword());
        return u;
    }
}
