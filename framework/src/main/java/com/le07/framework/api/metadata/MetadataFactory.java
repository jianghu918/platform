package com.le07.framework.api.metadata;


import java.io.IOException;
import java.net.URL;
import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import com.le07.framework.api.metadata.parser.PackageParser;


public class MetadataFactory {
    public static final String DEFAULT_API_PATH = "classpath*:com/le07/api/*/metadata.xml";
    private static Logger LOG = LoggerFactory.getLogger(MetadataFactory.class);
    private static MetadataFactory INSTANCE = new MetadataFactory();
    private Map<String, Package> packages = new TreeMap<String, Package>();
    private Map<Class, Package> classPackages = new ConcurrentHashMap<Class, Package>();
    private PackageParser packageParser = new PackageParser();
    private boolean inited;

    private MetadataFactory() {
    }

    public static MetadataFactory getInstance() {
        return INSTANCE;
    }

    public URL getMetadata(Class clazz) {
        return clazz.getResource("metadata.xml");
    }

    public Package getPackage(String pkId) {
        Package pk = packages.get(pkId);
        if (pk == null) {
            if (!inited) {
                initPackages();
                return packages.get(pkId);
            }
        }
        return pk;
    }

    public Package getPackage(Class clazz) {
        Package pk = null;
        try {
            if (classPackages.containsKey(clazz)) {
                pk = classPackages.get(clazz);
            } else {
                URL url = getMetadata(clazz);
                String pkId = packageParser.getPackageId(url.openStream());
                pk = packages.get(pkId);
                if (pk == null) {
                    synchronized (this) {
                        pk = packageParser.parse(url.openStream());
                        classPackages.put(clazz, pk);
                        packages.put(pkId, pk);
                    }
                } else {
                    classPackages.put(clazz, pk);
                }
            }
        } catch (Exception e) {
            LOG.error("Parse metadata for class [" + clazz.getName() + "] error", e);
            classPackages.put(clazz, null);
        }
        return pk;
    }

    public Collection<Package> getPackages() {
        if (!inited) {
            initPackages();
        }
        return packages.values();
    }

    private synchronized void initPackages() {
        if (inited) {
            return;
        }
        ResourcePatternResolver resourceLoader = new PathMatchingResourcePatternResolver();
        try {
            for (Resource resource : resourceLoader.getResources(DEFAULT_API_PATH)) {
                try {
                    Package pk = packageParser.parse(resource.getInputStream());
                    packages.put(pk.getId(), pk);
                } catch (Exception e) {
                    LOG.error("Parse metadata file [" + resource + "] error", e);
                }
            }
        } catch (IOException e) {
            LOG.error("Init MetadataFactory error", e);
        }
        inited = true;
    }

    public static void main(String[] args) {
        System.out.println(MetadataFactory.getInstance().getPackages());
    }
}
