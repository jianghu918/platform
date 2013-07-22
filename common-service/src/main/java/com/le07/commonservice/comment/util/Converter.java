package com.le07.commonservice.comment.util;

import com.google.common.collect.Lists;
import com.le07.commonservice.comment.model.Comment;
import com.le07.framework.global.type.Sort;
import com.le07.framework.util.ThriftUtils;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * 转换类
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午5:16
 */
public class Converter {


    public static Comment toComment(Comment origin, com.le07.api.comment.Comment comment) {
        Comment entity = null != origin ? origin : new Comment();
        entity.setUserId(comment.getUserId());
        entity.setBody(comment.getBody());
        entity.setBizKey(comment.getBizKey());
        entity.setStatus(ThriftUtils.toStatus(comment.getStatus()));
        entity.setTitle(comment.getTitle());
        Map<String,Object> data= ThriftUtils.toMap(comment.getData());
        if(CollectionUtils.isEmpty(data)){
            entity.setData(null);
        }else{
            entity.setData(data);
        }
        entity.setOwner(comment.getOwner());
        return entity;
    }

    public static com.le07.api.comment.Comment toApiComment(Comment comment) {
        com.le07.api.comment.Comment entity = new com.le07.api.comment.Comment();
        entity.setId(comment.getId());
        entity.setUserId(comment.getUserId());
        entity.setBizKey(comment.getBizKey());
        entity.setTitle(comment.getTitle());
        entity.setBody(comment.getBody());
        entity.setData(ThriftUtils.toStringMap(comment.getData()));
        entity.setCreateAt(ThriftUtils.toDateValue(comment.getCreateAt()));
        entity.setOwner(comment.getOwner());
        return entity;
    }

    public static List<com.le07.api.comment.Comment> toApiComments(List<Comment> comments) {
        if(CollectionUtils.isEmpty(comments))
            return Collections.emptyList();
        List<com.le07.api.comment.Comment> list = Lists.newArrayListWithCapacity(comments.size());
        for (Comment comment : comments) {
            list.add(toApiComment(comment));
        }
        return list;
    }

    public static List<SortType> toSortTypes(List<com.le07.api.comment.SortType> sortTypes) {
        if(CollectionUtils.isEmpty(sortTypes))
            return null;
        List<SortType> list = Lists.newArrayListWithCapacity(sortTypes.size());
        SortType st ;
        for (com.le07.api.comment.SortType sortType : sortTypes) {
            st = new SortType();
            st.setColumn(com.le07.commonservice.comment.type.Column.values()[sortType.getColumn().getValue()]);
            st.setSort(Sort.values()[sortType.getSort().getValue()]);
            list.add(st);
        }
        return list;
    }

    public static Query toQuery(com.le07.api.comment.Query query) {
        Query entity = new Query();
        entity.setTitle(query.getTitle());
        entity.setBody(query.getBody());
        entity.setBeginTime(ThriftUtils.toDate(query.getBeginTime()));
        entity.setEndTime(ThriftUtils.toDate(query.getEndTime()));
        entity.setKoMap(query.getKoMap());
        entity.setStatus(ThriftUtils.toStatus(query.getStatus()));
        entity.setUserId(query.getUserId());
        return entity;
    }
}
