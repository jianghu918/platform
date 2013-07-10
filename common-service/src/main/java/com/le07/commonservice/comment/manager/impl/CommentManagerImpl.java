package com.le07.commonservice.comment.manager.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.comment.dao.CommentDao;
import com.le07.commonservice.comment.manager.CommentManager;
import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.Query;
import com.le07.commonservice.comment.util.SortType;
import com.le07.framework.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 评论服务
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-9
 * Time: 下午3:57
 */
@Service
@Transactional
public class CommentManagerImpl implements CommentManager{

    @Autowired
    private CommentDao commentDao;



    @Override
    public Comment saveComment(Comment comment) {
        comment.setId(null);
        comment.setCreateAt(new Date());
        return commentDao.saveComment(comment);
    }

    @Override
    public void removeComments(List<Long> ids) {
        commentDao.removeComments(ids.toArray(new Long[ids.size()]));
    }

    @Override
    public void removeCommentsByOwner(String bizKey, String owner) {
        commentDao.removeCommentsByOwner(bizKey, owner);
    }

    @Override
    @Transactional(readOnly=true)
    public Comment getComment(long id) {
        return commentDao.getComment(id);
    }

    @Override
    @Transactional(readOnly=true)
    public Map<Long, Comment> getCommentMap(List<Long> ids) {
        return commentDao.getCommentMap(ids);
    }

    @Override
    @Transactional(readOnly=true)
    public Map<String, List<Comment>> batchGetComments(String bizKey, Set<String> owners, int size) {
        Map<String, List<Comment>> map = Maps.newHashMapWithExpectedSize(owners.size());
        for (String owner : owners) {
            map.put(owner, commentDao.getComments(bizKey, owner, 0, size).getItems());
        }
        return map;
    }

    @Override
    @Transactional(readOnly=true)
    public Page<Comment> getComments(String bizKey, String owner, int start, int size) {
        return commentDao.getComments(bizKey, owner, start, size);
    }

    @Override
    @Transactional(readOnly=true)
    public Page<Comment> getUserComments(String bizKey, long userId, int start, int size) {
        return commentDao.getUserComments(bizKey, userId, start, size);
    }

    @Override
    @Transactional(readOnly=true)
    public Map<String, Integer> getCommentCountMap(String bizKey, List<String> owners) {
        return commentDao.getCommentCountMap(bizKey, owners);
    }

    @Override
    @Transactional(readOnly=true)
    public Page<Comment> listComment(Query query, long offset, long limit, List<SortType> sortTypes) {
        return commentDao.listComment(query, offset, limit, sortTypes);
    }
}
