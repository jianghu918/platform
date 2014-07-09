package com.le07.catering.dao;

import com.le07.catering.model.Company;
import com.le07.catering.vto.CompanyQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.text.MessageFormat;
import java.util.Iterator;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-19
 * Time: 下午1:41
 */
@Repository
public class SpecficDaoImpl implements SpecificDao{

    @PersistenceContext
    private EntityManager em;


    @Override
    public Page<Company> listCompany(CompanyQuery companyQuery, Pageable pageable) {
        StringBuffer sb = new StringBuffer("select {0} from Company c where 1=1 ");

        if(null != companyQuery){
            if(null != companyQuery.getEntreeId()){
                sb.append(" and c.entreeType.id = ").append(companyQuery.getEntreeId());
            }
            if(null != companyQuery.getAreaId()){
                sb.append(" and c.area.id = ").append(companyQuery.getAreaId());
            }
            if(null != companyQuery.getTag()){
                sb.append("c.tag like ").append(companyQuery.getTag());
            }
        }

        if(null != pageable.getSort())
        {
            Sort sort = pageable.getSort();
            int i = 0;
            for (Sort.Order order : sort) {
                if(i ==0){
                    sb.append(" order by ");
                }
                sb.append(order.getProperty()).append(" ").append(order.getDirection());
                i++;
            }
        }

        String jpql = sb.toString();
        Query query = em.createQuery(MessageFormat.format(jpql, "c"));

        if(null != pageable)
        {
            query.setFirstResult(pageable.getOffset());
            query.setMaxResults(pageable.getPageSize());
        }

        Query countQuery = em.createQuery(MessageFormat.format(jpql, "count(c)"));
        Page<Company> page = new PageImpl<Company>(query.getResultList(), pageable, Integer.valueOf(countQuery.getSingleResult().toString()));

       /* Page<Company> page = new Page<Company>();
        page.setItems(query.getResultList());
        page.setTotal(Integer.valueOf(countQuery.getSingleResult().toString()));*/
        return page;
    }
}
