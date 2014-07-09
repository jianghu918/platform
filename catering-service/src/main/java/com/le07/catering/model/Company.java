package com.le07.catering.model;

import com.google.common.base.Joiner;
import com.le07.commonservice.standard.model.Area;
import com.le07.commonservice.standard.model.Classification;
import com.le07.framework.global.type.Status;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import java.util.Arrays;
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
public class Company implements Serializable {
    private static final long serialVersionUID = 7403895225606098377L;


    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	@Column(name="biz_id")
	private int bizId;

    private String name;

    @Transient
    private String bizKey;

    @Column(length = 2000)
    private String summary;

    /**
     * 简介
     */
    @Column(length = 4000)
    private String introduce;

    /**
     * 公告
     */
    @Column(length = 4000)
    private String notice;


    private String address;

    private Status status;

    /**
     * 主菜系
     */
    @ManyToOne
    @JoinColumn(name = "entree_type")
    private Classification entreeType;

    /**
     * 标签 比如（新街口）
     */
    private String tag;

    /**
     * 人均消费值
     */
    @Column(name = "axf_min")
    private Double axfMin;

    /**
     * 人均消费值
     */
    @Column(name = "axf_max")
    private Double axfMax;

    /**
     * 是否支持外送
     * 0不支持 1支持
     */
    @Column(name = "out_side")
    private Long outSide;



    /**
     * 联系
     */
    private String contact;

	@Column(name="environment_score")
	private long environmentScore;

    @Column(name="service_score")
    private long serviceScore;

    @Column(name="taste_score")
    private long tasteScore;

    /** 总的评分 */
    private long evaluate;

    /**
     * 地图
     */
	private String mapurl;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

	private String msn;

	private String phone;

	private String qq;

	private String remark;

	private String weibo;

	private String weixin;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at")
    private Date createAt = new Date();


    /**
     * 营业开始时间 business hours
     */
    @Column(name="business_hours_begin")
    private Long bhBegin;

    @Column(name="business_hours_end")
    private Long bhEnd;

    /**
     * logo
     */
    private String logo;

    @Column(name="show_img")
    private String showImg;

    @Transient
    private List<String> showImgs;


	/*//bi-directional many-to-one association to Dishe
	@OneToMany(mappedBy="company", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Dishes> disheses;

    //bi-directional many-to-one association to Board
    @OneToMany(mappedBy="company", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Board> boards;*/

    public String getNotice() {
        return notice;
    }

    public void setNotice(String notice) {
        this.notice = notice;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getShowImg() {
        return showImg;
    }

    public void setShowImg(String showImg) {
        this.showImg = showImg;
    }

    public Long getOutSide() {
        return outSide;
    }

    public void setOutSide(Long outSide) {
        this.outSide = outSide;
    }

    public List<String> getShowImgs() {
        return StringUtils.isBlank(showImg) ? null : Arrays.asList(showImg.split(","));
    }

    public void setShowImgs(List<String> showImgs) {
        this.showImgs = showImgs;
        this.showImg = Joiner.on(",").skipNulls().join(showImgs);
    }

    public long getEvaluate() {
        return evaluate;
    }

    public void setEvaluate(long evaluate) {
        this.evaluate = evaluate;
    }

    public Classification getEntreeType() {
        return entreeType;
    }

    public void setEntreeType(Classification entreeType) {
        this.entreeType = entreeType;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Double getAxfMin() {
        return axfMin;
    }

    public void setAxfMin(Double axfMin) {
        this.axfMin = axfMin;
    }

    public Double getAxfMax() {
        return axfMax;
    }

    public void setAxfMax(Double axfMax) {
        this.axfMax = axfMax;
    }

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

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getLogo() {
        return logo;
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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setMapurl(String mapurl) {
		this.mapurl = mapurl;
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



    public String getBizKey() {
        return bizKey;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public void setBizKey(String bizKey) {
        this.bizKey = bizKey;
    }



    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getBhBegin() {
        return bhBegin;
    }

    public void setBhBegin(Long bhBegin) {
        this.bhBegin = bhBegin;
    }

    public Long getBhEnd() {
        return bhEnd;
    }

    public void setBhEnd(Long bhEnd) {
        this.bhEnd = bhEnd;
    }

    /*public List<Board> getBoards() {
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

    public List<Dishes> getDisheses() {
        return this.disheses;
    }

    public void setDishes(List<Dishes> disheses) {
        this.disheses = disheses;
    }*/


    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}