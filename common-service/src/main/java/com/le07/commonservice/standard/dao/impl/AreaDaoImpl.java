package com.le07.commonservice.standard.dao.impl;

import com.le07.commonservice.standard.dao.AreaDao;
import com.le07.commonservice.standard.model.Area;
import com.le07.framework.support.hibernate.HibernateEntityDAO;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * //TODO
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 下午5:58
 */
@Repository
public class AreaDaoImpl extends HibernateEntityDAO<Area, Long> implements AreaDao{

    @Override
    public List<Area> findByPid(Long pid) {
        Query query = newHqlQuery("from Area where pid = ?", pid);
        return query.list();
    }
}
