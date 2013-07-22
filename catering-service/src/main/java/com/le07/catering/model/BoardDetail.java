package com.le07.catering.model;

import org.hibernate.annotations.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
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
@Table(name="board_detail")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BoardDetail implements Serializable {
    private static final long serialVersionUID = 1818895690904242667L;

    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="begin_time")
	private Date beginTime;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="end_time")
	private Date endTime;

    private int number;

	private String remark;

	//bi-directional many-to-one association to Board
	@ManyToOne
    @JoinColumn(name = "board_id")
	private Board board;

	public BoardDetail() {
	}

	public long getId() {
		return this.id;
	}

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
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

	public Date getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Board getBoard() {
		return this.board;
	}

	public void setBoard(Board board) {
		this.board = board;
	}

}