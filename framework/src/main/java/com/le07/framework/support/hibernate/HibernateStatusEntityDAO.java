
package com.le07.framework.support.hibernate;

import java.io.Serializable;
import java.util.Collection;

import org.apache.commons.lang.ArrayUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.le07.framework.entity.EntityNotFoundException;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Statusable;


public abstract class HibernateStatusEntityDAO<E extends Statusable, PK extends Serializable> extends HibernateEntityDAO<E, PK> {

    @Override
    public void deleteByPk(PK id){
        E entity = load(id);
        if (entity != null) {
            entity.setStatus(Status.DELETED);
            save(entity);
        }
    }

    @Override
    public void delete(E entity) {
        entity.setStatus(Status.DELETED);
        save(entity);
    }

    @Override
    public void batchDeleteByPK(Collection<PK> ids){
        if (ids == null) {
            return;
        }
        for (PK id : ids) {
            E entity = super.getRaw(id);
            if (entity != null && entity.getStatus() != Status.DELETED) {
                entity.setStatus(Status.DELETED);
                save(entity);
            }
        }
    }

    @Override
    public E load(PK id) {
        return checkStatus(super.load(id), id);
    }

    @Override
    public E getRaw(PK id) throws EntityNotFoundException {
        return checkStatus(super.getRaw(id), id);
    }

    @Override
    public Criteria newCriteria(Criterion... criterions) {
        int len = ArrayUtils.getLength(criterions);
        Criterion[] arr = new Criterion[len + 1];
        arr[0] = Restrictions.eq("status", Status.ENABLED);
        if (len > 0) {
            System.arraycopy(criterions, 0, arr, 1, criterions.length);
        }
        return super.newCriteria(arr);
    }

    private E checkStatus(E entity, Serializable msg) throws EntityNotFoundException {
        if (entity == null || entity.getStatus() == Status.DELETED) {
            throw new EntityNotFoundException(entityClass, msg);
        }
        return entity;
    }
}
