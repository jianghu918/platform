package com.le07.framework.support.hibernate;

import org.hibernate.*;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.exception.ConstraintViolationException;
import org.hibernate.metadata.ClassMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import com.le07.framework.entity.EntityNotFoundException;
import com.le07.framework.entity.GeneralEntityDAO;
import com.le07.framework.util.GenericUtils;
import com.le07.framework.util.Page;

import java.io.Serializable;
import java.util.*;

@SuppressWarnings("unchecked")
public class HibernateEntityDAO<E, PK extends Serializable> implements GeneralEntityDAO<E, PK> {

    public static final String COUNT_QUERY_STRING = "select count(*) from %s";

    protected Logger logger = LoggerFactory.getLogger(getClass());
    protected Class<E> entityClass;

    public HibernateEntityDAO() {
        this.entityClass = GenericUtils.getGenericParameter0(getClass());
    }

    @Autowired
    @Qualifier("sessionFactory")
    private SessionFactory sessionFactory;

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    protected Session openSession() {
        return sessionFactory.openSession();
    }

    protected void closeSession() {
        getSession().close();
    }

    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    @Override
    public E save(E entity){
        try {
            getSession().saveOrUpdate(beforeSave(entity));
        } catch (ConstraintViolationException e) {
            throw e;
        }
        return prepare(entity);
    }

    @Override
    public List<E> save(List<E> entities) {
        List<E> result = new ArrayList<E>();
        if(null == entities)
            return result;
        for (E entity : entities) {
            result.add(save(entity));
        }
        return result;
    }

    @Override
    public void deleteByPk(PK id) {
        delete(load(id));
    }

    @Override
    public void delete(E entity){
        getSession().delete(entity);
    }

    @Override
    public void batchDeleteByPK(Collection<PK> ids)  {
        if (ids == null) {
            return;
        }
        for (PK id : ids) {
            E entity = get(id);
            if (entity != null) {
                delete(entity);
            }
        }
    }

    @Override
    public void batchDelete(Collection<E> entities) {
        for (E entity : entities) {
            delete(entity);
        }
    }

    @Override
    public E get(PK id) throws EntityNotFoundException {
        E e = prepare(getRaw(id));
        if(null == e)
            throw new EntityNotFoundException(entityClass, id);
        return e;
    }

    @Override
    public E load(PK id) throws EntityNotFoundException {
        try {
            return prepare((E) getSession().load(entityClass, id));
        } catch (ObjectNotFoundException e) {
            throw new EntityNotFoundException(entityClass, id);
        }
    }

    @Override
    public Map<PK, E> batchGet(Collection<PK> ids) throws EntityNotFoundException {
        Map<PK, E> map = new HashMap<PK, E>(ids.size());
        for (PK id : ids) {
            E entity = get(id);
            if (entity != null) {
                map.put(id, entity);
            }
        }
        return map;
    }

    @Override
    public List<E> getAll() {
        return query(newCriteria());
    }



    public E getRaw(PK id) throws EntityNotFoundException {
        return (E) getSession().get(entityClass, id);
    }

    public E merge(E entity) {
        try {
            if (getId(entity) == null) {
                getSession().save(beforeSave(entity));
            } else {
                getSession().merge(beforeSave(entity));
            }
        } catch (ConstraintViolationException e) {
            throw e;
        }
        return prepare(entity);
    }

    public E naturalIdBy(Map<String, Object> args) {
        NaturalIdLoadAccess nia = getSession().byNaturalId(entityClass);
        for (Map.Entry<String, Object> entry : args.entrySet()) {
            nia.using(entry.getKey(), entry.getValue());
        }
        return (E) nia.load();
    }

    public E unique(Criteria criteria) {
        return prepare((E) criteria.uniqueResult());
    }

    public E uniqueBy(String propertyName, Object value) {
        return unique(newCriteria(Restrictions.eq(propertyName, value)));
    }

    public Criteria newCriteria(Criterion... criterions) {
        Criteria criteria = getSession().createCriteria(entityClass);
        if (criterions != null) {
            for (Criterion c : criterions) {
                if (c != null) {
                    criteria.add(c);
                }
            }
        }
        return criteria;
    }

    public Criteria newCriteria(List<Criterion> criterions) {
        return newCriteria(criterions.toArray(new Criterion[criterions.size()]));
    }

    public Query newHqlQuery(String hql, Object... args) {
        Query query = getSession().createQuery(hql);
        return addParameters(query, args);
    }

    public Query newHqlQuery(String hql, Map<String, Object> args) {
        Query query = getSession().createQuery(hql);
        return addParameters(query, args);
    }

    public Query newSqlQuery(String sql, Object... args) {
        Query query = getSession().createSQLQuery(sql).addEntity(entityClass);
        return addParameters(query, args);
    }

    public Query newSqlQuery(String sql, Map<String, Object> args) {
        Query query = getSession().createSQLQuery(sql).addEntity(entityClass);
        return addParameters(query, args);
    }

    public Query newCountSqlQuery(String sql, Object... args) {
        Query query = getSession().createSQLQuery(sql);
        return addParameters(query, args);
    }

    public Query newCountSqlQuery(String sql, Map<String, Object> args) {
        Query query = getSession().createSQLQuery(sql);
        return addParameters(query, args);
    }

    public List<E> query(Criteria criteria) {
        return prepare(criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list());
    }

    public List<E> query(Criteria criteria, int start, int size) {
        criteria.setProjection(null);
        if(start >= 0)
            criteria.setFirstResult(start);
        if (size > 0) {
            criteria.setMaxResults(size);
        }
        return query(criteria);
    }

    public List<E> query(Query query) {
        return prepare(query.list());
    }

    public List<E> query(Query query, int start, int size) {
        if(start >= 0){
            query.setFirstResult(start);
        }
        if (size > 0) {
            query.setMaxResults(size);
        }
        return query(query);
    }

    public int getTotalCount(Criteria criteria) {
        return HibernateUtils.getInt(criteria.setProjection(Projections.rowCount()).uniqueResult());
    }

    public Page<E> pageQuery(Criteria criteria, int start, int size) {
        int totalCount;
        List items = Collections.EMPTY_LIST;
        if (start < 0 || size <= 0) {
            items = query(criteria);
            totalCount = items.size();
        } else {
            totalCount = getTotalCount(criteria);
            if (totalCount > 0) {
                items = query(criteria, start, size);
            }
        }
//        if (size == 0) {
//            items = query(criteria);
//            totalCount = items.size();
//        } else if (size > 0) {
//            totalCount = getTotalCount(criteria);
//            if (totalCount > 0) {
//                items = query(criteria, start, size);
//            }
//        } else {
//            items = query(criteria, start, Math.abs(size));
//            totalCount = items.size();
//        }
        return new Page(items, totalCount, start, size);
    }

    public Page<E> pageQuery(Query query, Query countQuery, int start, int size) {
        int totalCount;
        List items = Collections.EMPTY_LIST;
        if (start < 0 || size <= 0) {
            items = prepare(query.list());
            totalCount = items.size();
        } else {
            totalCount = HibernateUtils.getInt(countQuery.uniqueResult());
            if (totalCount > 0) {
                items = query(query, start, size);
            }
        }
//        else {
//            items = query(query, start, Math.abs(size));
//            totalCount = items.size();
//        }
        return new Page(items, totalCount, start, size);
    }

    public int update(Query query) {
        return query.executeUpdate();
    }

    protected E prepare(E entity) {
        return entity;
    }

    protected List<E> prepare(List<E> list) {
        for (E entity : list) {
            prepare(entity);
        }
        return list;
    }

    protected E beforeSave(E entity) {
        return entity;
    }

    protected ClassMetadata getClassMetadata() {
        return getSessionFactory().getClassMetadata(entityClass);
    }

    protected PK getId(E entity) {
        return (PK) getClassMetadata().getIdentifier(entity, null);
    }

    private static Query addParameters(Query query, Object... args) {
        if (args != null) {
            for (int i = 0, len = args.length; i < len; i++) {
                query.setParameter(i, args[i]);
            }
        }
        return query;
    }

    private static Query addParameters(Query query, Map<String, Object> args) {
        if (args != null) {
            for (Map.Entry<String, Object> entry : args.entrySet()) {
                Object arg = entry.getValue();
                if (arg.getClass().isArray()) {
                    query.setParameterList(entry.getKey(), (Object[]) entry.getValue());
                } else if (arg instanceof Collection) {
                    query.setParameterList(entry.getKey(), ((Collection) arg));
                } else {
                    query.setParameter(entry.getKey(), arg);
                }
            }
        }
        return query;
    }
}
