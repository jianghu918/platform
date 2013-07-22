package com.le07.catering.model;

import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;


/**
 * Model
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-7-21
 * Time: 下午10:39
 */
@Entity
@Table(name = "dishes")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Dishes implements Serializable {
    private static final long serialVersionUID = -317021594358707056L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "classification_id")
    private long classificationId;

    private String name;

    private double price;

    private String remark;

    private long score;

    private int status;

    private String thumbnail;

    @Column(name = "unit_id")
    private long unitId;

    //bi-directional many-to-one association to Discount
    @OneToMany(mappedBy = "dishes")
    private List<Discount> discounts;

    //bi-directional many-to-one association to Company
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToMany(mappedBy = "deshes")
    private List<OrderDetail> orderDetails;


    public Dishes() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getClassificationId() {
        return this.classificationId;
    }

    public void setClassificationId(long classificationId) {
        this.classificationId = classificationId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getRemark() {
        return this.remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public long getScore() {
        return this.score;
    }

    public void setScore(long score) {
        this.score = score;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getThumbnail() {
        return this.thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public long getUnitId() {
        return this.unitId;
    }

    public void setUnitId(long unitId) {
        this.unitId = unitId;
    }

    public List<Discount> getDiscounts() {
        return this.discounts;
    }

    public void setDiscounts(List<Discount> discounts) {
        this.discounts = discounts;
    }

    public Company getCompany() {
        return this.company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public Discount addDiscount(Discount discount) {
        getDiscounts().add(discount);
        discount.setDishe(this);
        return discount;
    }

    public Discount removeDiscount(Discount discount) {
        getDiscounts().remove(discount);
        discount.setDishe(null);
        return discount;
    }

    public OrderDetail addOrderDetail(OrderDetail orderDetail) {
        getOrderDetails().add(orderDetail);
        orderDetail.setDeshes(this);
        return orderDetail;
    }

    public OrderDetail removeOrderDetail(OrderDetail orderDetail)
    {
        getOrderDetails().remove(orderDetail);
        orderDetail.setDeshes(null);
        return orderDetail;
    }


}