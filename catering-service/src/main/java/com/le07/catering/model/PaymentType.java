package com.le07.catering.model;

import com.le07.framework.global.type.Status;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

/**
 * 支付方式
 * Created with IDEA.
 * User: hu
 * Date: 13-7-22
 * Time: 上午11:06
 */
@Entity
@Table(name = "payment_type")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PaymentType implements Serializable{
    private static final long serialVersionUID = 3977233905158726779L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "pay_code", unique = true, nullable = false)
    private String payCode;

    @Column(name = "pay_name")
    private String payName;

    private String description;

    private Status status;

    /**
     * 是否货到付款
     */
    @Column(name = "is_cod")
    private boolean isCod;

    //bi-directional many-to-one association to Order
    @OneToMany(mappedBy = "paymentType")
    private List<Order> orders;

    public PaymentType(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPayCode() {
        return payCode;
    }

    public void setPayCode(String payCode) {
        this.payCode = payCode;
    }

    public String getPayName() {
        return payName;
    }

    public void setPayName(String payName) {
        this.payName = payName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public boolean isCod() {
        return isCod;
    }

    public void setCod(boolean cod) {
        isCod = cod;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public Order addOrder(Order order)
    {
        getOrders().add(order);
        order.setPaymentType(this);
        return order;
    }

    public Order removeOrder(Order order)
    {
        getOrders().remove(order);
        order.setPaymentType(null);
        return order;
    }


    @Override
    public String toString() {
        return "PaymentType{" +
                "id=" + id +
                ", payCode='" + payCode + '\'' +
                ", payName='" + payName + '\'' +
                ", isCod=" + isCod +
                ", status=" + status +
                '}';
    }
}
