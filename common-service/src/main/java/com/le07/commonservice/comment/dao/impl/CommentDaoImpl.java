package com.le07.commonservice.comment.dao.impl;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Maps;
import com.le07.commonservice.app.manager.BizConfigManager;
import com.le07.commonservice.comment.dao.CommentDAO;
import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.SortType;
import com.le07.framework.entity.EntityNotFoundException;
import com.le07.framework.global.type.Sort;
import com.le07.framework.global.type.Status;
import com.le07.framework.support.hibernate.HibernateStatusEntityDAO;
import com.le07.framework.support.hibernate.HibernateUtils;
import com.le07.framework.util.Page;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import java.util.*;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 上午11:10
 */
public class CommentDaoImpl extends HibernateStatusEntityDAO<Comment, Long> implements CommentDAO {


    @Autowired
    private BizConfigManager bizConfigService;


    @Autowired
    public void setBizConfigService(BizConfigManager bizConfigService) {
        this.bizConfigService = bizConfigService;
    }

    @Override
    public Comment saveComment(Comment comment) {
        return save(comment);
    }

    @Override
    public void removeComments(Long... ids) {
        batchDeleteByPK(Arrays.asList(ids));
    }

    @Override
    public void removeCommentsByOwner(String bizKey, String owner) {
        update(newHqlQuery("update Comment set status=? where bizId=? and owner=?", Status.DELETED, getBizId(bizKey), owner));
    }

    @Override
    public Comment getComment(long id) {
        return load(id);
    }

    @Override
    public Map<Long, Comment> getCommentMap(List<Long> ids) {
        List<Comment> comments = query(newCriteria(Restrictions.in("id", ids)));
        Map<Long, Comment> map = Maps.newHashMapWithExpectedSize(comments.size());
        for (Comment comment : comments) {
            map.put(comment.getId(), comment);
        }
        return map;
    }

    @Override
    public Page<Comment> getComments(String bizKey, String owner, int start, int size) {
        return pageQuery(newCriteria(
                Restrictions.eq("bizId", getBizId(bizKey)),
                Restrictions.eq("owner", owner)).addOrder(Order.desc("id")), start, size);
    }

    @Override
    public Page<Comment> getUserComments(String bizKey, long userId, int start, int size) {
        return pageQuery(newCriteria(
                Restrictions.eq("bizId", getBizId(bizKey)),
                Restrictions.eq("userId", userId)).addOrder(Order.desc("id")), start, size);
    }

    @Override
    public Map<String, Integer> getCommentCountMap(String bizKey, List<String> owners) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(3);
        args.put("status", Status.ENABLED);
        args.put("bizId", getBizId(bizKey));
        args.put("owners", owners);
        Query query = newHqlQuery("select owner,count(id) from Comment where status=:status and bizId=:bizId and owner in(:owners) group by owner", args);
        return HibernateUtils.toIntMap(query.list());
    }



    @Override
    protected Comment prepare(Comment entity) {
        internalPrepare(entity);
        if (entity.getParentId() != null && entity.getParentId()> 0) {
            internalPrepare(getRaw(entity.getParentId()));
        }
        return entity;
    }

    @Override
    protected Comment beforeSave(Comment entity) {
        Map<String, Object> data = entity.getData();
        if (MapUtils.isNotEmpty(data)) {
            entity.setJson(JSON.toJSONString(data));
        }
        try {
            if (entity.getBizId() < 1) {
                entity.setBizId(getBizId(entity.getBizKey()));
            }
        } catch (EntityNotFoundException ignored) {
        }
        return entity;
    }

    @SuppressWarnings("unchecked")
    private void internalPrepare(Comment entity) {
        if (entity == null) {
            return;
        }
        String json = entity.getJson();
        if (json != null) {
            entity.setData(JSON.parseObject(json, Map.class));
        }
        try {
            entity.setBizKey(bizConfigService.getBizKey(entity.getBizId()));
        } catch (EntityNotFoundException ignored) {
        }
    }

    private int getBizId(String bizKey) {
        return (int) bizConfigService.getBizId(bizKey);
    }

    @Override
    public Page<Comment> listComment(com.le07.commonservice.comment.util.Query query,
                                     long offset, long limit, List<SortType> sortTypes) {
        List<Criterion> criterions = new ArrayList<Criterion>();
        if(null != query) {
            if(!CollectionUtils.isEmpty(query.getKoMap())){
                boolean isFirst = true;
                StringBuffer sb = new StringBuffer();
                sb.append("(");
                for(String key : query.getKoMap().keySet()) {
                    if(isFirst) {
                        isFirst = false;
                    } else {
                        sb.append(" or ");
                    }
                    sb.append("(");
                    if(CollectionUtils.isEmpty(query.getKoMap().get(key))) {
                        sb.append(" biz_id = ").append((Integer)getBizId(key));
                    } else {
                        sb.append(" biz_id = ").append((Integer) getBizId(key));
                        sb.append(" and owner in(").append(jionVal(key, query.getKoMap().get(key))).append(")");
                    }
                    sb.append(")");
                }
                sb.append(")");
                criterions.add(Restrictions.sqlRestriction(sb.toString()));
            }
            if(!CollectionUtils.isEmpty(query.getUserId()))
                criterions.add(Restrictions.in("userId", query.getUserId()));
            if(StringUtils.isNotBlank(query.getTitle()))
                criterions.add(Restrictions.like("title", "%" + com.le07.framework.util.StringUtils.toTransferredString(query.getTitle()) + "%"));
            if(StringUtils.isNotBlank(query.getBody()))
                criterions.add(Restrictions.like("body", "%" + com.le07.framework.util.StringUtils.toTransferredString(query.getBody()) + "%"));
            if(query.getBeginTime() > 0)
                criterions.add(Restrictions.ge("createAt", new Date(query.getBeginTime())));
            if(query.getEndTime() > 0)
                criterions.add(Restrictions.le("createAt", new Date(query.getEndTime())));
            if(!CollectionUtils.isEmpty(query.getStatus()))
                criterions.add(Restrictions.in("status", query.getStatus()));
            if(query.getParentId() != 0)
                criterions.add(Restrictions.eq("parentId", query.getParentId()));
            if(!MapUtils.isEmpty(query.getData())) {
                for (Map.Entry<String, String> entry : query.getData().entrySet()) {
                    criterions.add(Restrictions.like("json", "%\""+entry.getKey()+"\":%"));
                    criterions.add(Restrictions.like("json", "%\""+entry.getValue()+"\"%"));
                }
            }
        }

        Criteria criteria = newCriteria(criterions);
        if(!CollectionUtils.isEmpty(sortTypes)) {
            for(SortType s : sortTypes)
            {
                if(s.getSort() == Sort.ASC)
                    criteria.addOrder(Property.forName(s.getColumn().getLabel()).asc());
                if(s.getSort() == Sort.DESC)
                    criteria.addOrder(Property.forName(s.getColumn().getLabel()).desc());
            }
        }
        return pageQuery(criteria, (int)offset, (int)limit);
    }

    private String jionVal(String key, Set<String> values) {
        StringBuffer sb = new StringBuffer();
        for(String val : values)
        {
            sb.append("'").append(val).append("',");
        }
        if(sb.length() > 1)
            sb.deleteCharAt(sb.length()-1);
        return sb.toString();
    }
    
}
