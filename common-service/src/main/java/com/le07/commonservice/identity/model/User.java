package com.le07.commonservice.identity.model;

import com.le07.framework.global.type.UserType;
import com.le07.framework.global.type.Status;
import org.apache.commons.codec.digest.DigestUtils;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * USER
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 上午11:36
 */
@Table(name = "identity_user")
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@SuppressWarnings({"unused"})
public class User implements Serializable {

    private static final Long serialVersionUID = 9187171381797342145L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(name = "login_name", nullable = false, unique = true)
    private String loginName;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column
    private UserType type = UserType.CONSUMER;
    private String phone;
    private Long age = 0L;
    private Long sex = 0L;
    private String city;
    private String qq;
    private String msn;
    private String weixin;
    private String blog;

    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;

    @Column(name = "update_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateAt = new Date();

    private Status status = Status.ENABLED;

    private String remark;
    private String y1;
    private String y2;
    private String y3;
    private String y4;
    private String y5;

    @OneToMany(mappedBy = "user")
    private List<Role> roleList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = DigestUtils.md5Hex(password);
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public Long getSex() {
        return sex;
    }

    public void setSex(Long sex) {
        this.sex = sex;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getMsn() {
        return msn;
    }

    public void setMsn(String msn) {
        this.msn = msn;
    }

    public String getWeixin() {
        return weixin;
    }

    public void setWeixin(String weixin) {
        this.weixin = weixin;
    }

    public String getBlog() {
        return blog;
    }

    public void setBlog(String blog) {
        this.blog = blog;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getY1() {
        return y1;
    }

    public void setY1(String y1) {
        this.y1 = y1;
    }

    public String getY2() {
        return y2;
    }

    public void setY2(String y2) {
        this.y2 = y2;
    }

    public String getY3() {
        return y3;
    }

    public void setY3(String y3) {
        this.y3 = y3;
    }

    public String getY4() {
        return y4;
    }

    public void setY4(String y4) {
        this.y4 = y4;
    }

    public String getY5() {
        return y5;
    }

    public void setY5(String y5) {
        this.y5 = y5;
    }


    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Role> roleList) {
        this.roleList = roleList;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }


    public Role addRole(Role role)
    {
        getRoleList().add(role);
        role.setUser(this);
        return role;
    }

    public Role removeRole(Role role)
    {
        getRoleList().remove(role);
        role.setUser(null);
        return role;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", type=" + type +
                ", phone='" + phone + '\'' +
                ", status=" + status +
                '}';
    }
}
