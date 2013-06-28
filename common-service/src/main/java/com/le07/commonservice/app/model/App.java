package com.le07.commonservice.app.model;

import com.le07.framework.global.type.Status;
import com.le07.framework.util.Statusable;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 简述
 * <p/>
 * Created with IntelliJ IDEA.
 * User: jh
 * Date: 13-6-28
 * Time: 上午10:26
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@SuppressWarnings({"unused"})
public class App implements Statusable, Serializable {

    private static final long serialVersionUID = -8293135926237820583L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "app_key", length = 32, nullable = false, unique = true)
    private String key;
    @Column(length = 64)
    private String name;
    @ElementCollection(fetch = FetchType.EAGER)
    @JoinTable(name = "app_attr", joinColumns = @JoinColumn(name = "app_id"))
    @MapKeyColumn(length = 64, name = "attr_key")
    @Column(name = "value", length = 100000)
    private Map<String, String> attributes;
    @OneToMany(mappedBy = "app")
    @OrderBy("id")
    private List<Biz> bizs;
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

    public List<Biz> getBizs() {
        return bizs;
    }

    public void setBizs(List<Biz> bizs) {
        this.bizs = bizs;
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
