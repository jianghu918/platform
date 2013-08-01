package com.le07.framework.support.thrift;

import org.apache.http.client.HttpClient;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.thrift.transport.THttpClient;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.util.Assert;

/**
 * Created with IDEA.
 * User: hu
 * Date: 13-8-1
 * Time: 上午9:43
 */
public class ThriftHttpProxyFactoryBean<T> extends ThriftClientInterceptor implements FactoryBean<T> {
    private static final int DEFAULT_MAX_TOTAL_CONNECTIONS = 100;
    private static final int DEFAULT_MAX_CONNECTIONS_PER_ROUTE = 10;
    private static final int DEFAULT_READ_TIMEOUT_MILLISECONDS = 180 * 1000;

    private HttpClient httpClient;
    public void setHttpClient(HttpClient httpClient) {
        this.httpClient = httpClient;
    }
    public HttpClient getHttpClient() {
        return this.httpClient;
    }

    public ThriftHttpProxyFactoryBean() {
        SchemeRegistry schemeRegistry = new SchemeRegistry();
        schemeRegistry.register(new Scheme("http", 80, PlainSocketFactory.getSocketFactory()));
        schemeRegistry.register(new Scheme("https", 443, SSLSocketFactory.getSocketFactory()));
        PoolingClientConnectionManager connectionManager = new PoolingClientConnectionManager(schemeRegistry);
        connectionManager.setMaxTotal(DEFAULT_MAX_TOTAL_CONNECTIONS);
        connectionManager.setDefaultMaxPerRoute(DEFAULT_MAX_CONNECTIONS_PER_ROUTE);
        this.httpClient = new DefaultHttpClient(connectionManager);
        setReadTimeout(DEFAULT_READ_TIMEOUT_MILLISECONDS);
    }

    /**
     * Set the connection timeout for the underlying HttpClient.
     * A timeout value of 0 specifies an infinite timeout.
     *
     * @param timeout the timeout value in milliseconds
     */
    public void setConnectTimeout(int timeout) {
        Assert.isTrue(timeout >= 0, "Timeout must be a non-negative value");
        getHttpClient().getParams().setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, timeout);
    }

    /**
     * Set the socket read timeout for the underlying HttpClient.
     * A timeout value of 0 specifies an infinite timeout.
     *
     * @param timeout the timeout value in milliseconds
     * @see #DEFAULT_READ_TIMEOUT_MILLISECONDS
     */
    public void setReadTimeout(int timeout) {
        Assert.isTrue(timeout >= 0, "Timeout must be a non-negative value");
        getHttpClient().getParams().setIntParameter(CoreConnectionPNames.SO_TIMEOUT, timeout);
    }


    @SuppressWarnings("unchecked")
    @Override
    public T getObject() throws Exception {
        return (T) getServiceProxy();
    }

    @Override
    public Class<?> getObjectType() {
        return getServiceInterface();
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    @Override
    protected TTransport getTransport() {
        try {
            return new THttpClient(getServiceUrl(), getHttpClient());
        } catch (TTransportException e) {
            e.printStackTrace();
            return null;
        }
    }
}
