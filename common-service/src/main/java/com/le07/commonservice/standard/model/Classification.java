package com.le07.commonservice.standard.model;

import com.le07.framework.global.type.Status;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * 分类信息字典
 * 每个App存储各自的分类信息
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-16
 * Time: 下午1:40
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Classification implements Serializable{

    private static final Long serialVersionUID = -7057665379716467701L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String name;

    private Long pid;

    @NotNull
    private Status status;

    @Length(min = 0, max = 255)
    private String remark;

    @Column(name = "biz_id")
    private Long bizId;

    @Transient
    private String bizKey;


    public Long getBizId() {
        return bizId;
    }

    public void setBizId(Long bizId) {
        this.bizId = bizId;
    }

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

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
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

    public String getBizKey() {
        return bizKey;
    }

    public void setBizKey(String bizKey) {
        this.bizKey = bizKey;
    }

    @Override
    public String toString() {
        return "Classification{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pid=" + pid +
                ", status=" + status +                '}';
    }
}
