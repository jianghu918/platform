package com.le07.catering.model;

import com.le07.catering.type.BoardStatus;
import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;
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

	private String name;

	private String remark;

	private BoardStatus status;

	//bi-directional many-to-one association to BoardDetail
	@OneToMany(mappedBy="board")
	private List<BoardDetail> boardDetails;

    @ManyToOne
    @JoinColumn(name="company_id")
    private Company company;

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

	public BoardStatus getStatus() {
		return this.status;
	}

	public void setStatus(BoardStatus status) {
		this.status = status;
	}

	public List<BoardDetail> getBoardDetails() {
		return this.boardDetails;
	}

	public void setBoardDetails(List<BoardDetail> boardDetails) {
		this.boardDetails = boardDetails;
	}

    public BoardDetail addBoardDetail(BoardDetail boardDetail) {
        getBoardDetails().add(boardDetail);
        boardDetail.setBoard(this);
        return boardDetail;
    }

    public BoardDetail removeBoardDetail(BoardDetail boardDetail) {
        getBoardDetails().remove(boardDetail);
        boardDetail.setBoard(null);
        return boardDetail;
    }

}