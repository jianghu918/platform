package com.le07.framework.support.hibernate;

import java.sql.SQLException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;

import org.springframework.jdbc.datasource.ConnectionHandle;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.orm.jpa.vendor.HibernateJpaDialect;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionException;

import java.sql.Connection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateJpaIsolationSupportDialect extends HibernateJpaDialect {
	private static final long serialVersionUID = 1L;
	private boolean readonly = true;
	
	public void setReadonly(boolean readonly) {
		this.readonly = readonly;
	}

	private Logger logger = LoggerFactory
			.getLogger(HibernateJpaIsolationSupportDialect.class);

	@Override
	public Object beginTransaction(final EntityManager entityManager,
			final TransactionDefinition definition)
			throws PersistenceException, SQLException, TransactionException {
		if (definition.getTimeout() != TransactionDefinition.TIMEOUT_DEFAULT) {
			getSession(entityManager).getTransaction().setTimeout(
					definition.getTimeout());
		}
		if (logger.isDebugEnabled()) {
			logger.debug(
					"Transaction Info: IsolationLevel={} , PropagationBehavior={} , Timeout={} , Name={}",
					new Object[] { definition.getIsolationLevel(),
							definition.getPropagationBehavior(),
							definition.getTimeout(), definition.getName()});
			logger.debug("The isolation level set on the transaction is {}",
					definition.getIsolationLevel());
		}
		
		ConnectionHandle connHandle = getJdbcConnection(entityManager, definition.isReadOnly());
		Connection conn = connHandle.getConnection();
		if(readonly)
			conn.setReadOnly(definition.isReadOnly());
		
		Integer previousIsolationLevel = DataSourceUtils
				.prepareConnectionForTransaction(conn, definition);
		logger.debug("The previousIsolationLevel {}", previousIsolationLevel);
		
		entityManager.getTransaction().begin();
		Object transactionData = prepareTransaction(entityManager,
				definition.isReadOnly(), definition.getName());

		return new IsolationSupportSessionTransactionData(transactionData,
				previousIsolationLevel, conn);
	}

	@Override
	public void cleanupTransaction(Object transactionData) {
		IsolationSupportSessionTransactionData isstd = (IsolationSupportSessionTransactionData) transactionData;
		super.cleanupTransaction(isstd.getSessionTransactionData());
		isstd.resetIsolationLevel();
		
		Connection conn = isstd.getConnection();
		try {
			logger.debug("cleanupTransaction set conn readonly to false");
			conn.setReadOnly(false); // 防止返回连接池的conn是readonly，然后给某些不走jpa事务的代码调用
		} catch (SQLException e) {
			logger.error(e.getMessage(), e);
		} 
	}

	private static class IsolationSupportSessionTransactionData {

		private final Object sessionTransactionData;
		private final Integer previousIsolationLevel;
		private final Connection connection;

		public IsolationSupportSessionTransactionData(
				Object sessionTransactionData,
				Integer previousIsolationLevel, Connection connection) {
			this.sessionTransactionData = sessionTransactionData;
			this.previousIsolationLevel = previousIsolationLevel;
			this.connection = connection;
		}

		public void resetIsolationLevel() {
			if (this.previousIsolationLevel != null) {
				DataSourceUtils.resetConnectionAfterTransaction(connection,
						previousIsolationLevel);
			}
		}

		public Object getSessionTransactionData() {
			return this.sessionTransactionData;
		}
		
		public Connection getConnection() {
			return this.connection;
		}

	}

}
