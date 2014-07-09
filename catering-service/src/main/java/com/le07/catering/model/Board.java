package com.le07.catering.model;

import com.le07.catering.type.BoardStatus;
import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;
import org.hibernate.annotations.Cache;


/**
 * Model
 *
 * Created with IDEA
 * User: 虎
 * Date: 13-7-21
 * Time: 下午10:39
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Board implements Serializable {
    private static final long serialVersionUID = 8113229057106731820L;

    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

    /**
     * 桌子座位数
     */
	private int galleryful;

    /**
     * 编号
     */
	private String name;

    private String summary;

	private String remark;

	private BoardStatus boardStatus = BoardStatus.DEFAULT;

	//bi-directional many-to-one association to BoardItem
	@OneToMany(mappedBy="board")
	private List<BoardItem> boardItems;

    @ManyToOne
    @JoinColumn(name="company_id")
    private Company company;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at")
    private Date createAt = new Date();


    /** 起始编号 */
    @Transient
    private Integer sn;

    /** 结束编号 */
    @Transient
    private Integer en;


	public Board() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public int getGalleryful() {
		return this.galleryful;
	}

	public void setGalleryful(int galleryful) {
		this.galleryful = galleryful;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

    public BoardStatus getBoardStatus() {
        return boardStatus;
    }

    public void setBoardStatus(BoardStatus boardStatus) {
        this.boardStatus = boardStatus;
    }

    public List<BoardItem> getBoardItems() {
		return this.boardItems;
	}

	public void setBoardItems(List<BoardItem> boardItems) {
		this.boardItems = boardItems;
	}

    public Integer getEn() {
        return en;
    }

    public void setEn(Integer en) {
        this.en = en;
    }

    public Integer getSn() {
        return sn;
    }

    public void setSn(Integer sn) {
        this.sn = sn;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public BoardItem addBoardDetail(BoardItem boardItem) {
        getBoardItems().add(boardItem);
        boardItem.setBoard(this);
        return boardItem;
    }

    public BoardItem removeBoardDetail(BoardItem boardItem) {
        getBoardItems().remove(boardItem);
        boardItem.setBoard(null);
        return boardItem;
    }

}