package com.le07.catering.model;

import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;
import java.util.Date;
import java.util.List;


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
public class Promotion implements Serializable {
    private static final long serialVersionUID = -3035800809426432840L;

    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="begin_time")
	private Date beginTime;

	private String description;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="end_time")
	private Date endTime;

	private String no;

	private String remark;

	private int status;

	private String summary;

	//bi-directional many-to-one association to PromotionRule
	@OneToMany(mappedBy="promotion")
	private List<PromotionRule> promotionRules;

	public Promotion() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getBeginTime() {
		return this.beginTime;
	}

	public void setBeginTime(Date beginTime) {
		this.beginTime = beginTime;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getNo() {
		return this.no;
	}

	public void setNo(String no) {
		this.no = no;
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

	public String getSummary() {
		return this.summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public List<PromotionRule> getPromotionRules() {
		return this.promotionRules;
	}

	public void setPromotionRules(List<PromotionRule> promotionRules) {
		this.promotionRules = promotionRules;
	}

    public PromotionRule addPromotionRule(PromotionRule promotionRule){
        getPromotionRules().add(promotionRule);
        promotionRule.setPromotion(this);
        return promotionRule;
    }

    public PromotionRule removePromotionRule(PromotionRule promotionRule){
        getPromotionRules().remove(promotionRule);
        promotionRule.setPromotion(null);
        return promotionRule;
    }

    @Override
    public String toString() {
        return "Promotion{" +
                "summary='" + summary + '\'' +
                ", id=" + id +
                ", beginTime=" + beginTime +
                ", description='" + description + '\'' +
                ", endTime=" + endTime +
                ", no='" + no + '\'' +
                ", remark='" + remark + '\'' +
                ", status=" + status +
                '}';
    }
}