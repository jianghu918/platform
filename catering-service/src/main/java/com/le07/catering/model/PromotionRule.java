package com.le07.catering.model;

import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;


/**
 * Model
 *
 * Created with IDEA
 * User: 虎
 * Date: 13-7-21
 * Time: 下午10:39
 */
@Entity
@Table(name="promotion_rule")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PromotionRule implements Serializable {
    private static final long serialVersionUID = -3982715298243241070L;

    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	private String json;

	//bi-directional many-to-one association to Promotion
	@ManyToOne
	@JoinColumn(name="promotion_id")
	private Promotion promotion;

	public PromotionRule() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getJson() {
		return this.json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public Promotion getPromotion() {
		return this.promotion;
	}

	public void setPromotion(Promotion promotion) {
		this.promotion = promotion;
	}

    @Override
    public String toString() {
        return "PromotionRule{" +
                "id=" + id +
                ", json='" + json + '\'' +
                '}';
    }
}