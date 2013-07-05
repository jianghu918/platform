package com.le07.commonservice.identity.dao.impl;

import com.le07.commonservice.identity.dao.SpecificDao;
import com.le07.commonservice.identity.model.User;
import com.le07.commonservice.identity.util.Query;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * 复杂用户查询实现
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-1
 * Time: 下午3:05
 */
@Repository
@SuppressWarnings({"unchecked", "unused"})
public class SpecificDaoImpl implements SpecificDao {
    Logger log = LoggerFactory.getLogger(SpecificDaoImpl.class);
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    @PersistenceContext
    private EntityManager em;


    public List<User> listUsers(Query query, long offset, long size) {
        StringBuffer sb = new StringBuffer("select * from cs_identity_user where 1=1 ");
        if(null != query)
        {
            if(StringUtils.isNotBlank(query.getName()))
            {
                sb.append(" and name like '%").append(query.getName().trim()).append("%'");
            }
            if(StringUtils.isNotBlank(query.getPhone()))
            {
                sb.append(" and phone like '%").append(query.getPhone().trim()).append("%'");
            }
        }
        javax.persistence.Query q = em.createNativeQuery(sb.toString(), User.class);
        buildLimitSQL(q, offset, size);

        return q.getResultList();
    }

    public void buildLimitSQL(javax.persistence.Query q, long offset, long size)
    {
        if(offset >= 0 && size > 0)
        {
            q.setFirstResult((int) offset);
            q.setMaxResults((int) size);
        }
    }

}
