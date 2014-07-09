package com.le07.commonservice.rating.model;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Date;

/**
 * Rating Model
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 上午10:00
 */
@Table(name = "cs_rating")
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Rating implements Serializable {
    private static final long serialVersionUID = 8315731378518395966L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int bizId;
    @Column(length = 64, nullable = false)
    private String owner;
    private int type;
    private long userId;
    private int score;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date updateAt;

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

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
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
