package com.le07.catering.model;

import com.le07.catering.type.PayStatus;
import com.le07.catering.type.PayType;
import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;
import java.util.Date;


/**
 * Model
 *
 * Created with IDEA
 * User: 虎
 * Date: 13-7-21
 * Time: 下午10:39
 */
@Entity
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Order implements Serializable {
    private static final long serialVersionUID = 3340058996175364878L;


    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

    @Column(name="order_no")
    @Index(name = "Inx_order_no")
    private String orderNo;

	@Column(name="company_id")
	private long companyId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_at")
	private Date createAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_at")
    private Date updateAt;

	@Column(name="discount_price")
	private double discountPrice;

	@Column(name="is_outside")
	private int isOutside;

    @Enumerated(EnumType.STRING)
    @Column(name = "pay_type")
    private PayType payType;

	@Column(name="pay_status")
	private PayStatus payStatus;

    /**
     * 支付时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "pay_time")
    private Date payTime;

	private String phone;

    /**
     * 下单时间
     */
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="preset_time")
	private Date presetTime;

	private double price;

	private String remark;

	private int status;

	@Column(name="total_price")
	private double totalPrice;

	@Column(name="user_id")
	private long userId;



    //bi-directional many-to-one association to PaymentType
    @ManyToOne
    @JoinColumn(name = "pay_id")
    private PaymentType paymentType;


	public Order() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}



    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }



    public PayType getPayType() {
        return payType;
    }

    public void setPayType(PayType payType) {
        this.payType = payType;
    }

    public long getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}

	public Date getCreateAt() {
		return this.createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public double getDiscountPrice() {
		return this.discountPrice;
	}

	public void setDiscountPrice(double discountPrice) {
		this.discountPrice = discountPrice;
	}

    public int getOutside() {
        return isOutside;
    }

    public void setOutside(int outside) {
        isOutside = outside;
    }

    public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public PayStatus getPayStatus() {
		return this.payStatus;
	}

	public void setPayStatus(PayStatus payStatus) {
		this.payStatus = payStatus;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getPresetTime() {
		return this.presetTime;
	}

	public void setPresetTime(Date presetTime) {
		this.presetTime = presetTime;
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

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public double getTotalPrice() {
		return this.totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public long getUserId() {
		return this.userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

    public Date getPayTime() {
        return payTime;
    }

    public void setPayTime(Date payTime) {
        this.payTime = payTime;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }





    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", companyId=" + companyId +
                ", createAt=" + createAt +
                ", updateAt=" + updateAt +
                ", discountPrice=" + discountPrice +
                ", isOutside=" + isOutside +
                ", orderNo='" + orderNo + '\'' +
                ", paymentType=" + paymentType +
                ", payType=" + payType +
                ", payStatus=" + payStatus +
                ", payTime=" + payTime +
                ", phone='" + phone + '\'' +
                ", presetTime=" + presetTime +
                ", price=" + price +
                ", status=" + status +
                ", totalPrice=" + totalPrice +
                ", userId=" + userId +
                '}';
    }
}