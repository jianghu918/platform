package com.le07.catering.dao;

import com.le07.catering.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-19
 * Time: 下午1:39
 */
@Repository
public interface BoardDao extends JpaRepository<Board, Long>{

    @Query("select b from Board b where b.company.id = ?1")
    List<Board> findByCompanyId(Long companyId);
}
