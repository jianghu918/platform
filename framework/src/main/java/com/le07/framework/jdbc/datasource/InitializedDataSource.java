package com.le07.framework.jdbc.datasource;

import com.google.common.collect.Sets;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.datasource.init.DatabasePopulator;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.util.Set;
import java.util.logging.Logger;

/**
 * 用来更新数据库结构，或是初始化一些数据
 *
 * Created with IDEA.
 * User: hu
 * Date: 13-7-19
 * Time: 上午10:40
 */
public class InitializedDataSource implements DataSource, InitializingBean, ResourceLoaderAware{
    protected final Log logger = LogFactory.getLog(InitializedDataSource.class);
    public static final String MULTI_VALUE_ATTRIBUTE_DELIMITERS = ",; \n\r";
    public static final Set<String> AUTOS = Sets.newHashSet("update", "create", "create-drop");

    private DataSource dataSource;

    private String scriptEncoding = "UTF-8";

    private String[] sqlScripts = ArrayUtils.EMPTY_STRING_ARRAY;

    protected ResourceLoader resourceLoader;
    private boolean updateSchema;


    public InitializedDataSource() {
        super();
    }

    public InitializedDataSource(DataSource ds) {
        this();

        this.setDataSource(ds);
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void setScriptEncoding(String scriptEncoding) {
        this.scriptEncoding = scriptEncoding;
    }

    public void setUpdateSchema(String updateSchema) {
        this.updateSchema = AUTOS.contains(updateSchema);
    }


    public void setScripts(String scripts) {
        this.sqlScripts = StringUtils.tokenizeToStringArray(scripts, MULTI_VALUE_ATTRIBUTE_DELIMITERS);
    }

    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public <T> T unwrap(Class<T> iface) throws SQLException {
        return dataSource.unwrap(iface);
    }

    @Override
    public boolean isWrapperFor(Class<?> iface) throws SQLException {
        return dataSource.isWrapperFor(iface);
    }

    @Override
    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    @Override
    public Connection getConnection(String username, String password) throws SQLException {
        return dataSource.getConnection(username, password);
    }

    @Override
    public PrintWriter getLogWriter() throws SQLException {
        return dataSource.getLogWriter();
    }

    @Override
    public void setLogWriter(PrintWriter out) throws SQLException {
        dataSource.setLogWriter(out);
    }

    @Override
    public void setLoginTimeout(int seconds) throws SQLException {
        dataSource.setLoginTimeout(seconds);
    }

    @Override
    public int getLoginTimeout() throws SQLException {
        return dataSource.getLoginTimeout();
    }

    @Override
    public void afterPropertiesSet() throws Exception {
         if(!updateSchema)
         {
             logger.info("Schema update has bean disabled");
             return;
         }
        Assert.notNull(this.dataSource);
        if(!ArrayUtils.isEmpty(this.sqlScripts))
            this.populate();

    }

    protected void populate() throws Exception {
        logger.info("Initializing DataSource ...");
        for (String script : this.sqlScripts) {
            logger.info("\tpopulating: [" + script + "]");
            try {
                Resource resource = this.resourceLoader.getResource(script);
                if (resource.exists()) {
                    DatabasePopulator populator = this.createPopulator(resource);
                    execute(populator, dataSource);
                    logger.info("\t\t[DONE].");
                } else {
                    logger.warn("\t\t[NOT EXISTS].");
                }
            } catch (Exception ex) {
                logger.warn("\t\t[IGNORE] with [" + ex.getMessage() + "].");
            }
        }
        logger.info("DataSource initialized.");
    }

    protected DatabasePopulator createPopulator(Resource script) {
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.setContinueOnError(false);
        populator.setIgnoreFailedDrops(false);
        populator.setScripts(new Resource[] { script });
        populator.setSqlScriptEncoding(scriptEncoding);
        return populator;
    }

    public static void execute(DatabasePopulator populator, DataSource dataSource) {
        Assert.notNull(populator, "DatabasePopulator must be provided");
        Assert.notNull(dataSource, "DataSource must be provided");
        try {
            Connection connection = null;
            try {
                connection = DataSourceUtils.getConnection(dataSource);
                connection.setReadOnly(false);
                populator.populate(connection);
            } finally {
                if (connection != null) {
                    DataSourceUtils.releaseConnection(connection, dataSource);
                }
            }
        } catch (Exception ex) {
            throw new DataAccessResourceFailureException("Failed to execute database script", ex);
        }
    }

	
	public Logger getParentLogger() throws SQLFeatureNotSupportedException {
		// TODO Auto-generated method stub
		return null;
	}


}
