package com.le07.commonservice.standard.model;

import com.le07.framework.global.type.Status;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * 计量单位字典
 * 每家可能不一样，各自拥有各自的单位
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午1:32
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Unit implements Serializable {
    private static final long serialVersionUID = 1804083577077110852L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String name;
    
    @NotNull
    private Status status;

    private String remark;

    @Column(name = "biz_id")
    private Long bizId;

    @Transient
    private String bizKey;


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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getBizId() {
        return bizId;
    }

    public void setBizId(Long bizId) {
        this.bizId = bizId;
    }

    public String getBizKey() {
        return bizKey;
    }

    public void setBizKey(String bizKey) {
        this.bizKey = bizKey;
    }

    @Override
    public String toString() {
        return "Unit{" +
                "name='" + name + '\'' +
                ", status=" + status +
                ", remark='" + remark + '\'' +
                ", bizKey='" + bizKey + '\'' +
                ", id=" + id +
                '}';
    }
}
