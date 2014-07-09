package com.le07.commonservice.standard.model;

import com.le07.framework.global.type.Status;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
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
@Table(name = "cs_classification")
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Classification implements Serializable{

    private static final Long serialVersionUID = -7057665379716467701L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * 节点名称
     */
    @NotBlank
    private String name;

    /**
     * 分类：
     * 0 ：菜的大体分类 （粤菜 川菜 湖南菜 杭帮菜 淮扬菜 东北菜 新疆菜 宁波菜 火锅 日本料理 韩国料理 越南菜 泰国菜 意式西餐 素食 自助）
     * 1 ：菜的口味分类（每个店自己有自己的分类， 如【经典热菜，素味平生，冰沙果汗，酒水等】）
     */
    private int type;

    /**
     * 父ID
     */
    private Long pid;

    /**
     * 是否有子节点
     */
    private boolean isParent;

    @NotNull
    private Integer status = 0;

    @Column(name = "biz_id")
    private Long bizId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at")
    private Date createAt = new Date();

    @Transient
    private String bizKey;

    private String remark;

    public Long getBizId() {
        return bizId;
    }

    public void setBizId(Long bizId) {
        this.bizId = bizId;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getName() {
        return name;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public boolean isParent() {
        return isParent;
    }

    public void setParent(boolean parent) {
        isParent = parent;
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
