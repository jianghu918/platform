package com.le07.commonservice.rating.dao;

import com.le07.framework.util.Page;
import com.le07.commonservice.rating.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Rating Dao
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 上午10:38
 */
@Repository
public interface RatingDao extends JpaRepository<Rating, Long>{



    @Query("select r from Rating r where r.bizId = ?1 and r.type = ?2 and r.owner = ?3 and r.userId = ?4")
    Rating getRating(int bizId, int type, String owner, long userId);



}
