package com.le07.commonservice.app.model;

import com.le07.framework.global.type.Status;
import com.le07.framework.util.Statusable;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Map;

/**
 * 简述
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-6-28
 * Time: 上午10:29
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@SuppressWarnings({"unused"})
public class Biz implements Statusable, Serializable {
    private static final long serialVersionUID = -6236818150499308790L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "biz_key", length = 32, nullable = false, unique = true)
    private String key;

    @Column(length = 64)
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @JoinTable(name = "biz_attr", joinColumns = @JoinColumn(name = "biz_id"))
    @MapKeyColumn(length = 64, name = "attr_key")
    @Column(name = "value", length = 100000)
    private Map<String, String> attributes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_id")
    private App app;

    @Enumerated
    @Column(nullable = false)
    private Status status = Status.ENABLED;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, String> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, String> attributes) {
        this.attributes = attributes;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}