package com.le07.commonservice.favorite.util;

import java.util.Date;
import java.util.Set;

/**
 * Query Model
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午1:56
 */
public class Query {

    private String bizKey; // optional
    private Set<Long> userId; // optional
    private String owner; // optional
    private String url; // optional
    private String title; // optional
    private String remark; // optional
    private Date beginTime; // optional
    private Date endTime; // optional


    public String getBizKey() {
        return bizKey;
    }

    public void setBizKey(String bizKey) {
        this.bizKey = bizKey;
    }

    public Set<Long> getUserId() {
        return userId;
    }

    public void setUserId(Set<Long> userId) {
        this.userId = userId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Date beginTime) {
        this.beginTime = beginTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}
