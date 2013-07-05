package com.le07.commonservice.comment.model;

import com.alibaba.fastjson.annotation.JSONField;
import org.hibernate.annotations.Cache;
import com.google.common.collect.Maps;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Statusable;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 上午10:41
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@SuppressWarnings({"unused"})
public class Comment implements Statusable, Serializable{

    private static final long serialVersionUID = -7486859861039837239L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int bizId;
    @Column(length = 64, nullable = false)
    private String owner;
    private long userId;
    private Long parentId;
    @Column(length = 256)
    private String title;
    @Column(length = 4000)
    private String body;
    @Column(length = 4000)
    private String json;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createAt;
    @Enumerated
    @Column(nullable = false)
    private Status status = Status.ENABLED;

    @Transient
    private Comment parent;
    @Transient
    private String bizKey;
    @Transient
    private Map<String, Object> data = Maps.newHashMap();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JSONField(serialize = false)
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

    @JSONField(serialize = false)
    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @JSONField(serialize = false)
    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    @JSONField(serialize = false)
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Comment getParent() {
        return parent;
    }

    public void setParent(Comment parent) {
        this.parent = parent;
    }

    public String getBizKey() {
        return bizKey;
    }

    public void setBizKey(String bizKey) {
        this.bizKey = bizKey;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}
