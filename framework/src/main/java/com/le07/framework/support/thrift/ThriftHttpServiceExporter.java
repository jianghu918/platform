package com.le07.framework.support.thrift;

import org.apache.thrift.protocol.TJSONProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.protocol.TProtocolFactory;
import org.apache.thrift.transport.TIOStreamTransport;
import org.apache.thrift.transport.TTransport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.HttpRequestHandler;
import com.le07.framework.api.metadata.MetadataFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URL;


public class ThriftHttpServiceExporter extends ThriftExporter implements HttpRequestHandler {
    private static Logger LOG = LoggerFactory.getLogger(ThriftHttpServiceExporter.class);
    private TProtocolFactory jsonProtocolFactory = new TJSONProtocol.Factory();
    private URL metadataXml;

    @Override
    public void handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (!"POST".equals(request.getMethod()) && metadataXml != null) {
            response.setContentType("text/xml; charset=UTF-8");
            FileCopyUtils.copy(metadataXml.openStream(), response.getOutputStream());
            return;
        }
        InputStream in = request.getInputStream();
        OutputStream out = response.getOutputStream();
        try {
            ThriftContextHolder.init();
            response.setContentType("application/x-thrift");
            TTransport transport = new TIOStreamTransport(in, out);
            TProtocol protocol = request.getParameter("_json") != null ? jsonProtocolFactory.getProtocol(transport) : getProtocolFactory().getProtocol(transport);
            doInvoke(protocol, protocol);
        } catch (Throwable e) {
            response.setContentType("text/plain; charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace(new PrintWriter(out, true));
            if (LOG.isErrorEnabled()) {
                LOG.error("Thrift server direct error", e);
            }
        } finally {
            ThriftContextHolder.reset();
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        metadataXml = MetadataFactory.getInstance().getMetadata(getServiceInterface().getEnclosingClass());
        super.afterPropertiesSet();
    }
}
