package com.le07.framework.support.spring.tx;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;

import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.orm.jpa.EntityManagerFactoryAccessor;
import org.springframework.orm.jpa.EntityManagerFactoryUtils;
import org.springframework.orm.jpa.EntityManagerHolder;

public class JpaResourceProvider extends EntityManagerFactoryAccessor implements ResourceProvider<EntityManagerHolder> {
	
	@Override
	public Object getKey() {
		return getEntityManagerFactory();
	}

	@Override
	public EntityManagerHolder getResource() {
		try {
			EntityManager em = createEntityManager();
			return new EntityManagerHolder(em);
		} catch (PersistenceException ex) {
			throw new DataAccessResourceFailureException("Could not create JPA EntityManager", ex);
		}
	}

	@Override
	public void releaseResource(EntityManagerHolder resource) {
		EntityManagerFactoryUtils.closeEntityManager(resource.getEntityManager());
	}

}
