package com.le07.commonservice.comment.dao;

import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.SortType;
import com.le07.framework.util.Page;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

/**
 * JPA复杂查询
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-4
 * Time: 下午12:11
 */
public interface SpecificDao {


    Page<Comment> getComments(long bizId, String owner, int start, int size);

    Page<Comment> getUserComments(long bizId, long userId, int start, int size);

    Map<String, Integer> getCommentCountMap(long bizId, List<String> owners);

    Page<Comment> listComment(com.le07.commonservice.comment.util.Query query, long offset, long limit, List<SortType> sortTypes);

}
