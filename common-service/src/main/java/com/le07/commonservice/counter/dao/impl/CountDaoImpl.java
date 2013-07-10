package com.le07.commonservice.counter.dao.impl;

import com.google.common.collect.Maps;
import com.le07.commonservice.counter.dao.CountDao;
import com.le07.commonservice.counter.model.Count;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import com.le07.framework.support.hibernate.HibernateUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Count Dao
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-9
 * Time: 下午5:13
 */
@Repository
public class CountDaoImpl extends HibernateEntityDAO<Count, Long> implements CountDao{
    @Override
    public int getCount(int bizId, int type, String owner) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(3);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owner", owner);
        Query query = newHqlQuery("select sum(num) from Count where bizId=:bizId and type=:type and owner=:owner", args);
        return HibernateUtils.getInt(query.uniqueResult());
    }

    @Override
    public Map<String, Integer> getCountMap(int bizId, int type, Collection<String> owners) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(3);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owners", owners);
        Query query = newHqlQuery("select owner,sum(num) from Count where bizId=:bizId and type=:type and owner in(:owners) group by owner", args);
        return HibernateUtils.toIntMap(query.list());
    }

    @Override
    public void resetCount(int bizId, int type, String owner) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(3);
        args.put("bizId", bizId);
        args.put("type", type);
        args.put("owner", owner);
        update(newHqlQuery("delete from Count where bizId=:bizId and type=:type and owner=:owner", args));
    }

    @Override
    public void increaseCount(int bizId, int type, String owner, int count) {
        Count c = new Count();
        c.setBizId(bizId);
        c.setType(type);
        c.setOwner(owner);
        c.setNum(count);
        c.setClock(System.currentTimeMillis());
        save(c);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> getHotOwner(int bizId, int type, int size, int algorithm) {
        Map<String, Object> args = Maps.newHashMapWithExpectedSize(2);
        args.put("bizId", bizId);
        args.put("type", type);
        Query query = newHqlQuery("select owner from Count where bizId=:bizId and type=:type group by owner order by sum(num) desc", args);
        return query.setMaxResults(size).list();
    }

    @Override
    public void upgrade0() {
        long now = System.currentTimeMillis();
        List<Count> counts;
        int total = getTotalCount(newCriteria());
        int lastPercent = 0;
        int i = 1;
        while (true) {
            counts = query(newCriteria(Restrictions.lt("clock", now)), 0, 1);
            if (counts.size() > 0) {
                Count count = counts.get(0);
                count.setNum(getCount(count.getBizId(), count.getType(), count.getOwner()));
                count.setClock(now);
                save(count);
                Map<String, Object> args = Maps.newHashMapWithExpectedSize(4);
                args.put("bizId", count.getBizId());
                args.put("type", count.getType());
                args.put("owner", count.getOwner());
                args.put("clock", now);
                update(newHqlQuery("delete from Count where bizId=:bizId and type=:type and owner=:owner and clock<:clock", args));
            } else {
                break;
            }
            if (i++ % 100 == 0) {
                Session session = getSession();
                session.flush();
                session.clear();
                int percent = (int) (i / (float) total * 1e4);
                if (percent != lastPercent) {
                    lastPercent = percent;
                    //System.out.println("Upgrade count percent:" + percent / 100d + "%");
                }
            }
        }
    }
}
