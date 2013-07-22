package com.le07.commonservice.app.dao.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.app.dao.BizDao;
import com.le07.commonservice.app.model.Biz;
import com.le07.framework.entity.EntityNotFoundException;
import com.le07.framework.global.type.Status;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 下午2:31
 */
@Repository
public class BizDaoImpl extends HibernateEntityDAO<Biz, Long> implements BizDao
{
    @Override
    public void updateBizStatus(Status status, Long[] ids) {
        if(null == ids)
            return;
        Biz biz;
        for (Long id : ids) {
            biz = get(id);
            if(null != biz)
            {
                biz.setStatus(status);
                save(biz);
            }
        }
    }

    @Override
    public long getBizId(String key) {
       /* Map<String, Object> args = Maps.newHashMapWithExpectedSize(1);
        args.put("bizKey", key);
        Query query = newHqlQuery("select id from Biz where key=:bizKey", args);
        Object object = query.uniqueResult();
        if(null == object)
            throw new EntityNotFoundException(Biz.class, key);
        return Long.valueOf(object.toString());*/
        Biz biz = uniqueBy("key",key);
        if(null == biz)
            throw new EntityNotFoundException(Biz.class, key);
        return biz.getId();
    }

    @Override
    public String getBizKey(long id) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(1);
        args.put("id", id);
        Query query = newHqlQuery("select bizKey from Biz where id=:id", args);
        Object object = query.uniqueResult();
        if(null == object)
            throw new EntityNotFoundException(Biz.class, id);
        return object.toString();
    }

    @Override
    public List<Biz> getAppBizs(long appId) {
        Query query = newHqlQuery("from Biz where app.id = ?1", appId);
        return query.list();
    }
}
