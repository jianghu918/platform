package com.le07.commonservice.identity.model;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 角色
 * 在这里代表具体的权限， 与用户是多对一的关系
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-7-31
 * Time: 下午10:17
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Role implements Serializable{
    private static final long serialVersionUID = 518280644327678048L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    private String authority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Role() {
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
