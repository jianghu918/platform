package com.le07.commonservice.comment.dao;

import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.SortType;
import com.le07.framework.util.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Map;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 上午10:48
 */
@Repository
public interface CommentDao extends JpaRepository<Comment, Long>{


    @Modifying
    @Query("delete  from Comment c where c.id in (?1)")
    void removeComments(Long... ids);

    @Modifying
    @Query("delete  from Comment c where c.bizId = ?1 and c.owner = ?2")
    void removeCommentsByOwner(long bizId, String owner);



}
