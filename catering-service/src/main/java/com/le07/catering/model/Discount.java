package com.le07.catering.model;

import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;


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
public class Discount implements Serializable {
    private static final long serialVersionUID = -8280695460702680982L;

    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	private double price;

	private double rate;

	private String remark;

	private int status;

	private int type;

	//bi-directional many-to-one association to Dishe
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="dishes_id")
	private Dishes dishes;

	public Discount() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public double getPrice() {
		return this.price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getRate() {
		return this.rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
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

	public int getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Dishes getDishe() {
		return this.dishes;
	}

	public void setDishe(Dishes dishe) {
		this.dishes = dishe;
	}

}