package com.le07.commonservice.comment.util;

import com.le07.framework.global.type.Status;

import java.util.Date;
import java.util.Map;
import java.util.Set;

/**
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 上午11:07
 */
public class Query {

    private Map<String, Set<String>> koMap; // required
    private Set<Long> userId; // required
    private String title; // required
    private String body; // required
    private Date beginTime; // required
    private Date endTime; // required
    private Set<Status> status; // required
    private long parentId; // required
    private Map<String, String> data;

    public Map<String, Set<String>> getKoMap() {
        return koMap;
    }

    public void setKoMap(Map<String, Set<String>> koMap) {
        this.koMap = koMap;
    }

    public Set<Long> getUserId() {
        return userId;
    }

    public void setUserId(Set<Long> userId) {
        this.userId = userId;
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

    public Set<Status> getStatus() {
        return status;
    }

    public void setStatus(Set<Status> status) {
        this.status = status;
    }

    public long getParentId() {
        return parentId;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }

    public Map<String, String> getData() {
        return data;
    }

    public void setData(Map<String, String> data) {
        this.data = data;
    }
}
