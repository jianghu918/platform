package com.le07.commonservice.file.model;

import com.le07.framework.global.type.Status;
import com.le07.framework.support.hibernate.JSONType;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 虎
 * Date: 13-8-10
 * Time: 下午10:40
 */
@Entity
@Table(name="cs_file")
@TypeDef(name = "json", typeClass = JSONType.class)
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FileStroe implements Serializable{
    private static final long serialVersionUID = 1313192717077389252L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "biz_id")
    private int bizId;

    @Column(length = 128)
    private String owner;

    @Column(name = "user_id")
    private Long userId;

    @Column(length = 128, unique = true)
    private String name;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_at", nullable = false)
    private Date updateAt;

    private long size;

    @Column(length = 128)
    private String storage;

    @Column(length = 256)
    private String md5;

    @Type(type = "json")
    @Column(name = "json", length = 4000)
    private java.util.Map<String, Object> data = new HashMap<String, Object>();

    @Enumerated
    @Column(nullable = false)
    private Status status = Status.ENABLED;

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

    @Override
    public String toString() {
        return "FileStroe{" +
                "id=" + id +
                ", userId=" + userId +
                ", storage='" + storage + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}