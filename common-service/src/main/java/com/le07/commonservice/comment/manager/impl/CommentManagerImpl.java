package com.le07.commonservice.comment.manager.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.comment.dao.SpecificDao;
import com.le07.commonservice.comment.manager.CommentManager;
import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.Query;
import com.le07.commonservice.comment.util.SortType;
import com.le07.commonservice.base.BaseManagerImpl;
import com.le07.framework.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.*;

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
public class CommentManagerImpl extends BaseManagerImpl implements CommentManager{


    @Autowired
    private SpecificDao specificDao;



    @Override
    public Comment saveComment(Comment comment) {
        comment.setId(null);
        comment.setCreateAt(new Date());
        return commentDao.save(comment);
    }

    @Override
    public void removeComments(List<Long> ids) {
        commentDao.removeComments(ids.toArray(new Long[ids.size()]));
    }

    @Override
    public void removeCommentsByOwner(String bizKey, String owner) {
        commentDao.removeCommentsByOwner(getBizId(bizKey), owner);
    }

    @Override
    @Transactional(readOnly=true)
    public Comment getComment(long id) {
        return commentDao.findOne(id);
    }

    @Override
    @Transactional(readOnly=true)
    public Map<Long, Comment> getCommentMap(List<Long> ids) {
        if(CollectionUtils.isEmpty(ids))
            return Collections.EMPTY_MAP;
        Map<Long, Comment> map = Maps.newHashMapWithExpectedSize(ids.size());
        for (Long id : ids) {
            map.put(id, getComment(id));
        }
        return map;
    }

    @Override
    @Transactional(readOnly=true)
    public Map<String, List<Comment>> batchGetComments(String bizKey, Set<String> owners, int size) {
        Map<String, List<Comment>> map = Maps.newHashMapWithExpectedSize(owners.size());
        for (String owner : owners) {
            map.put(owner, specificDao.getComments(getBizId(bizKey), owner, 0, size).getItems());
        }
        return map;
    }

    @Override
    @Transactional(readOnly=true)
    public Page<Comment> getComments(String bizKey, String owner, int start, int size) {
        return specificDao.getComments(getBizId(bizKey), owner, start, size);
    }

    @Override
    @Transactional(readOnly=true)
    public Page<Comment> getUserComments(String bizKey, long userId, int start, int size) {
        return specificDao.getUserComments(getBizId(bizKey), userId, start, size);
    }

    @Override
    @Transactional(readOnly=true)
    public Map<String, Integer> getCommentCountMap(String bizKey, List<String> owners) {
        return specificDao.getCommentCountMap(getBizId(bizKey), owners);
    }

    @Override
    @Transactional(readOnly=true)
    public Page<Comment> listComment(Query query, long offset, long limit, List<SortType> sortTypes) {
        return specificDao.listComment(query, offset, limit, sortTypes);
    }
}
