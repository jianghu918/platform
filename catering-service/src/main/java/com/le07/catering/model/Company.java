package com.le07.catering.model;

import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;
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
public class Company implements Serializable {
    private static final long serialVersionUID = 7403895225606098377L;


    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	private String address;

	@Column(name="biz_id")
	private int bizId;

    @Transient
    private String bizKey;

    /**
     * 联系人
     */
    private String contact;


	@Column(name="environment_score")
	private long environmentScore;

    @Column(name="service_score")
    private long serviceScore;

    @Column(name="taste_score")
    private long tasteScore;

    /**
     * 地图
     */
	private String mapurl;

    @Column(name = "area_id")
    private long areaId;

	private String msn;

	private String name;

	private String phone;

	private String qq;

	private String remark;

	private String weibo;

	private String weixin;

	//bi-directional many-to-one association to Dishe
	@OneToMany(mappedBy="company", fetch = FetchType.LAZY)
	private List<Dishes> disheses;

    //bi-directional many-to-one association to Board
    @OneToMany(mappedBy="company", fetch = FetchType.LAZY)
    private List<Board> boards;


	public Company() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getBizId() {
		return this.bizId;
	}

	public void setBizId(int bizId) {
		this.bizId = bizId;
	}

	public String getContact() {
		return this.contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public long getEnvironmentScore() {
		return this.environmentScore;
	}

	public void setEnvironmentScore(long environmentScore) {
		this.environmentScore = environmentScore;
	}

	public String getMapurl() {
		return this.mapurl;
	}

	public void setMapurl(String mapurl) {
		this.mapurl = mapurl;
	}

    public void setAreaId(long areaId) {
        this.areaId = areaId;
    }

    public String getMsn() {
		return this.msn;
	}

	public void setMsn(String msn) {
		this.msn = msn;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getQq() {
		return this.qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getRemark() {
		return this.remark;
	}

    public long getAreaId() {
        return areaId;
    }

    public void setRemark(String remark) {
		this.remark = remark;
	}

	public long getServiceScore() {
		return this.serviceScore;
	}

	public void setServiceScore(long serviceScore) {
		this.serviceScore = serviceScore;
	}

	public long getTasteScore() {
		return this.tasteScore;
	}

	public void setTasteScore(long tasteScore) {
		this.tasteScore = tasteScore;
	}

	public String getWeibo() {
		return this.weibo;
	}

	public void setWeibo(String weibo) {
		this.weibo = weibo;
	}

	public String getWeixin() {
		return this.weixin;
	}

	public void setWeixin(String weixin) {
		this.weixin = weixin;
	}

	public List<Dishes> getDisheses() {
		return this.disheses;
	}

	public void setDishes(List<Dishes> disheses) {
		this.disheses = disheses;
	}

    public String getBizKey() {
        return bizKey;
    }

    public void setBizKey(String bizKey) {
        this.bizKey = bizKey;
    }

    public List<Board> getBoards() {
        return boards;
    }

    public void setBoards(List<Board> boards) {
        this.boards = boards;
    }


    public Board addBoard(Board board) {
        getBoards().add(board);
        board.setCompany(this);
        return board;
    }

    public Board removeBoard(Board board) {
        getBoards().remove(board);
        board.setCompany(null);
        return board;
    }


    public Dishes addDishe(Dishes dishes) {
        getDisheses().add(dishes);
        dishes.setCompany(this);
        return dishes;
    }

    public Dishes removeCtrDishe(Dishes dishes) {
        getDisheses().remove(dishes);
        dishes.setCompany(null);
        return dishes;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", areaId=" + areaId +
                ", name='" + name + '\'' +
                '}';
    }
}