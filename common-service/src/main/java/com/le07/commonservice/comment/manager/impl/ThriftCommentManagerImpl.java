package com.le07.commonservice.comment.manager.impl;

import com.google.common.collect.Maps;
import com.le07.api.comment.CommentPage;
import com.le07.api.comment.CommentService;
import com.le07.api.type.AnyException;
import com.le07.commonservice.comment.manager.CommentManager;
import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.Converter;
import com.le07.framework.util.Page;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Thrift Comment Manager
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午5:12
 */
@Service("thriftCommentService")
public class ThriftCommentManagerImpl implements CommentService.Iface{

    @Autowired
    private CommentManager manager;


    @Override
    public com.le07.api.comment.Comment saveComment(com.le07.api.comment.Comment comment) throws AnyException, TException {
        Comment origin = null;
        if(comment.isSetId())
        {
            origin = manager.getComment(comment.getId());
        }
        return Converter.toApiComment(manager.saveComment(Converter.toComment(origin, comment)));
    }

    @Override
    public void removeComments(List<Long> ids) throws AnyException, TException {
        manager.removeComments(ids);
    }

    @Override
    public void removeCommentsByOwner(String bizKey, String owner) throws AnyException, TException {
        manager.removeCommentsByOwner(bizKey, owner);
    }

    @Override
    public com.le07.api.comment.Comment getComment(long id) throws AnyException, TException {
        return Converter.toApiComment(manager.getComment(id));
    }

    @Override
    public Map<Long, com.le07.api.comment.Comment> getCommentMap(List<Long> ids) throws AnyException, TException {
        if(CollectionUtils.isEmpty(ids))
            return Collections.emptyMap();
        Map<Long, com.le07.api.comment.Comment> map = Maps.newHashMapWithExpectedSize(ids.size());
        Map<Long,Comment> commentMap = manager.getCommentMap(ids);
        for (Long id : ids) {
            map.put(id, Converter.toApiComment(commentMap.get(id)));
        }
        return map;
    }

    @Override
    public Map<String, List<com.le07.api.comment.Comment>> batchGetComments(String bizKey, Set<String> owners, int size) throws AnyException, TException {
        Map<String, List<Comment>> map = manager.batchGetComments(bizKey, owners, size);
        if(CollectionUtils.isEmpty(map))
            return Collections.emptyMap();
        Map<String, List<com.le07.api.comment.Comment>> rsMap = Maps.newHashMapWithExpectedSize(map.size());
        for (String key : rsMap.keySet()) {
            rsMap.put(bizKey, Converter.toApiComments(map.get(key)));
        }
        return rsMap;
    }

    @Override
    public CommentPage getComments(String bizKey, String owner, int start, int size) throws AnyException, TException {
        CommentPage commentPage = new CommentPage();
        Page<Comment> comments = manager.getComments(bizKey, owner, start, size);
        commentPage.setTotal(comments.getTotal());
        commentPage.setItems(Converter.toApiComments(comments.getItems()));
        return commentPage;
    }

    @Override
    public CommentPage getUserComments(String bizKey, long userId, int start, int size) throws AnyException, TException {
        CommentPage commentPage = new CommentPage();
        Page<Comment> comments = manager.getUserComments(bizKey, userId, start, size);
        commentPage.setTotal(comments.getTotal());
        commentPage.setItems(Converter.toApiComments(comments.getItems()));
        return commentPage;
    }

    @Override
    public Map<String, Integer> getCommentCountMap(String bizKey, List<String> owners) throws AnyException, TException {
        return manager.getCommentCountMap(bizKey, owners);
    }

    @Override
    public CommentPage listComment(com.le07.api.comment.Query query, long offset, long limit, List<com.le07.api.comment.SortType> sortTypes) throws AnyException, TException {
        CommentPage commentPage = new CommentPage();
        Page<Comment> comments = manager.listComment(Converter.toQuery(query), offset, limit, Converter.toSortTypes(sortTypes));
        commentPage.setTotal(comments.getTotal());
        commentPage.setItems(Converter.toApiComments(comments.getItems()));
        return commentPage;
    }
}
