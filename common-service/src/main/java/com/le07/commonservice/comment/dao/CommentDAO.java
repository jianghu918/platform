package com.le07.commonservice.comment.dao;

import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.Query;
import com.le07.commonservice.comment.util.SortType;
import com.le07.framework.util.Page;


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
public interface CommentDao {

    Comment saveComment(Comment comment);

    void removeComments(Long... ids);

    void removeCommentsByOwner(String bizKey, String owner);

    Comment getComment(long id);

    Map<Long, Comment> getCommentMap(List<Long> ids);

    Page<Comment> getComments(String bizKey, String owner, int start, int size);

    Page<Comment> getUserComments(String bizKey, long userId, int start, int size);

    Map<String, Integer> getCommentCountMap(String bizKey, List<String> owners);

    Page<Comment> listComment(Query query, long offset, long limit, List<SortType> sortTypes);

}
