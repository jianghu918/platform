package com.le07.catering.model;

import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;


/**
 * Model
 *
 * Created with IDEA
 * User: 虎
 * Date: 13-7-21
 * Time: 下午10:39
 */
@Entity
@Table(name="order_item")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class OrderItem implements Serializable {
    private static final long serialVersionUID = -1334420391959292458L;


    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	@Column(name="discount_price")
	private double discountPrice;

    @ManyToOne
	@JoinColumn(name="order_id")
    private Order order;

	private double price;

	private int quantity;

	private String remark;

	@Column(name="total_price")
	private double totalPrice;



    //bi-directional many-to-one association to Dishe
    @ManyToOne
    @JoinColumn(name="deshes_id")
    private Dishes deshes;




	public OrderItem() { }

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public double getDiscountPrice() {
		return this.discountPrice;
	}

	public void setDiscountPrice(double discountPrice) {
		this.discountPrice = discountPrice;
	}

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public double getPrice() {
		return this.price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public double getTotalPrice() {
		return this.totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

    public Dishes getDeshes() {
        return deshes;
    }

    public void setDeshes(Dishes deshes) {
        this.deshes = deshes;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", discountPrice=" + discountPrice +
                ", orderId=" + order.getId() +
                ", price=" + price +
                ", quantity=" + quantity +
                ", remark='" + remark + '\'' +
                ", totalPrice=" + totalPrice +
                '}';
    }
}