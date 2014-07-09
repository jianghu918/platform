package com.le07.commonservice.identity.util;


import com.google.common.collect.Lists;
import com.le07.commonservice.identity.model.Role;
import com.le07.commonservice.identity.model.User;
import com.le07.framework.util.ThriftUtils;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;

/**
 * 简述
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:03
 */
public class Converter {


    public static User toUser(User origin, com.le07.api.identity.User user) {
        User entity = null != origin ? origin : new User();
        entity.setId(user.getId());
        entity.setName(user.getName());
        entity.setPassword(entity.getPassword());
        entity.setStatus(ThriftUtils.toStatus(user.getStatus()));
        entity.setType(ThriftUtils.toUserType(user.getType()));
        entity.setAge(user.getAge());
        entity.setCity(user.getCity());
        entity.setBlog(user.getBlog());
        entity.setQq(user.getQq());
        entity.setMsn(user.getMsn());
        entity.setPhone(user.getPhone());
        entity.setCreateAt(ThriftUtils.toDate(user.getCreateAt()));
        entity.setUpdateAt(ThriftUtils.toDate(user.getUpdateAt()));
        entity.setRemark(user.getRemark());
        entity.setSex(user.getSex());
        entity.setWeixin(user.getWeixin());
        return entity;
    }

    public static com.le07.api.identity.User toApiUser(User user) {
        com.le07.api.identity.User entity = new com.le07.api.identity.User();
        entity.setId(user.getId());
        entity.setName(user.getName());
        entity.setPassword(entity.getPassword());
        entity.setStatus(ThriftUtils.toApiStatus(user.getStatus()));
        entity.setType(ThriftUtils.toApiUserType(user.getType()));
        entity.setAge(user.getAge());
        entity.setCity(user.getCity());
        entity.setBlog(user.getBlog());
        entity.setQq(user.getQq());
        entity.setMsn(user.getMsn());
        entity.setPhone(user.getPhone());
        entity.setCreateAt(ThriftUtils.toDateValue(user.getCreateAt()));
        entity.setUpdateAt(ThriftUtils.toDateValue(user.getUpdateAt()));
        entity.setRemark(user.getRemark());
        entity.setSex(user.getSex());
        entity.setWeixin(user.getWeixin());
        return entity;
    }

    public static Query toQuery(com.le07.api.identity.Query query) {
        Query entity = new Query();
        entity.setPhone(query.getPhone());
        entity.setCity(query.getCity());
        entity.setName(query.getName());
        return entity;
    }

    public static List<com.le07.api.identity.User> toApiUser(List<User> users) {
        if(CollectionUtils.isEmpty(users))
            return Collections.emptyList();
        List<com.le07.api.identity.User> list = Lists.newArrayList();
        for (User user : users) {
            list.add(toApiUser(user));
        }
        return list;
    }

    public static com.le07.api.identity.Role toApiRole(Role userRole) {
        com.le07.api.identity.Role entity = new com.le07.api.identity.Role();
        entity.setPermissions(userRole.getPermissions());
        entity.setId(userRole.getId());
        entity.setUserId(userRole.getUser().getId());
        return entity;
    }
}
