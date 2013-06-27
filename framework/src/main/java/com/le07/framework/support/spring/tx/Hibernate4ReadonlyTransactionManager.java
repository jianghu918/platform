package com.le07.framework.support.spring.tx;


import java.lang.reflect.Method;
import java.sql.Connection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.ConnectionHolder;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.transaction.TransactionDefinition;


public class Hibernate4ReadonlyTransactionManager extends HibernateTransactionManager{
	private static final Logger logger = LoggerFactory.getLogger(Hibernate4ReadonlyTransactionManager.class);

	private static final long serialVersionUID = 2165018263141348132L;

	@Override
	protected void doBegin(Object transaction, TransactionDefinition definition) {
		super.doBegin(transaction, definition);
		try {
			Method getConnectionHolder = transaction.getClass().getMethod("getConnectionHolder", null);
			ConnectionHolder connectionHolder = (ConnectionHolder)getConnectionHolder.invoke(transaction, null);
			Connection con = null;
			con = connectionHolder.getConnection();
			if(null != con)
				con.setReadOnly(definition.isReadOnly());
		} catch (Throwable ignore) {
		}
		
	}

	@Override
	protected void doCleanupAfterCompletion(Object transaction) {
		try {
			logger.debug("doCleanupAfterCompletion set connection readonly false");
			Method getConnectionHolder = transaction.getClass().getMethod("getConnectionHolder", null);
			ConnectionHolder connectionHolder = (ConnectionHolder)getConnectionHolder.invoke(transaction, null);
			Connection con = null;
			con = connectionHolder.getConnection();
			if(null != con)
				con.setReadOnly(false);
		} catch (Throwable e) {
			logger.error(e.getMessage(), e);
		}
		super.doCleanupAfterCompletion(transaction);
	}
	
	
}
