package com.le07.commonservice.standard.model;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 区域信息（通用）
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午4:50
 */
@Table
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings({"unused"})
public class Area implements Serializable{


    private static final long serialVersionUID = 8693403088574343100L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Long level;

    private Long pid;

    @Column(name = "use_type")
    private Long useType;

    @Column(name = "display_order")
    private Long displayOrder;

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

    public Long getLevel() {
        return level;
    }

    public void setLevel(Long level) {
        this.level = level;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public Long getUseType() {
        return useType;
    }

    public void setUseType(Long useType) {
        this.useType = useType;
    }

    public Long getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Long displayOrder) {
        this.displayOrder = displayOrder;
    }

    @Override
    public String toString() {
        return "Area{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pid=" + pid +
                '}';
    }
}
