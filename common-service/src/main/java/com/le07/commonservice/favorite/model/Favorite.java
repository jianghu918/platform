package com.le07.commonservice.favorite.model;

import com.le07.framework.global.type.Status;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Favorite Model
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午1:44
 */
@Table(name = "cs_favorite")
@Entity
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Favorite implements Serializable{
    private static final long serialVersionUID = -7621497950551978359L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int bizId;
    @Column(length = 64, nullable = false)
    private String owner;
    private long userId;
    @Column(length = 128)
    private String title;
    @Column(length = 256)
    private String url;
    @Column(length = 512)
    private String remark;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createAt;
    @Enumerated
    @Column(nullable = false)
    private Status status = Status.ENABLED;

    @Transient
    private String bizKey;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getBizId() {
        return bizId;
    }

    public void setBizId(int bizId) {
        this.bizId = bizId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getBizKey() {
        return bizKey;
    }

    public void setBizKey(String bizKey) {
        this.bizKey = bizKey;
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
