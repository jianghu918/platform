package com.le07.framework.context;

import static org.springframework.util.SystemPropertyUtils.PLACEHOLDER_PREFIX;
import static org.springframework.util.SystemPropertyUtils.PLACEHOLDER_SUFFIX;
import static org.springframework.util.SystemPropertyUtils.VALUE_SEPARATOR;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.reflect.MethodUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.beans.factory.config.PlaceholderConfigurerSupport;
import org.springframework.core.OrderComparator;
import org.springframework.core.io.support.PropertiesLoaderSupport;
import org.springframework.util.Assert;
import org.springframework.util.PropertyPlaceholderHelper;

import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.util.TypeUtils;
import com.le07.framework.Constants;

/**
 * 用来读取系统配置项.
 *
 */
@SuppressWarnings("unchecked")
public final class Config extends PropertiesLoaderSupport implements BeanPostProcessor, InitializingBean {
    private static final Logger LOG = LoggerFactory.getLogger(Config.class);
    private static final PropertyPlaceholderHelper HELPER = new PropertyPlaceholderHelper(PLACEHOLDER_PREFIX, PLACEHOLDER_SUFFIX, VALUE_SEPARATOR, true);
    private static final Map PROPERTIES = new HashMap();
    private static final ConfigPlaceholderResolver RESOLVER = new ConfigPlaceholderResolver(PROPERTIES);

    private List<PropertiesLoaderSupport> loaders = new ArrayList<PropertiesLoaderSupport>();
    private String[] necessaryConfigs;
    private boolean usePlaceholderProperties = true;

    public void setNecessaryConfigs(String[] necessaryConfigs) {
        this.necessaryConfigs = necessaryConfigs;
    }

    public void setUsePlaceholderProperties(boolean usePlaceholderProperties) {
        this.usePlaceholderProperties = usePlaceholderProperties;
    }

    public static void setConfiguration(Map properties) {
        PROPERTIES.putAll(properties);
    }

    /**
     * 获取配置文件或系统参数，系统环境中的参数值，如server.url
     *
     * @param key 参数名称
     * @return 参数值
     */
    public static String get(String key) {
        Assert.notNull(key, "Argument 'key' must not be null.");
        return key.contains(PLACEHOLDER_PREFIX) ? getPlaceholder(key) : RESOLVER.resolvePlaceholder(key);
    }

    /**
     * 获取配置文件或系统参数，系统环境中的参数值，如不存在则返回defaultValue
     *
     * @param key          参数名称
     * @param defaultValue 默认值
     * @return 参数值
     */
    public static String get(String key, String defaultValue) {
        Assert.notNull(key, "Argument 'key' must not be null.");
        String value = get(key);
        return value == null ? defaultValue : value;
    }

    /**
     * 计算带占位符的表达式值，如：http://${server.url}/api
     *
     * @param key 参数
     * @return 参数值
     */
    public static String getPlaceholder(String key) {
        Assert.notNull(key, "Argument 'key' must not be null.");
        return HELPER.replacePlaceholders(key, RESOLVER);
    }

    /**
     * 获取配置文件中的整数参数值
     *
     * @param key 参数名称.
     * @return 整数参数值.
     */
    public static Integer getInt(String key) {
        String value = get(key);
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            LOG.warn("Convert config [{}={}]{} value to Integer error,{}", key, value, e.getMessage());
            return null;
        }
    }

    /**
     * 获取配置文件中的整数参数.如果文件中没有该参数就返回defaultValue.
     *
     * @param key          参数名称.
     * @param defaultValue 参数默认值.
     * @return 整数参数值.
     */
    public static int getInt(String key, int defaultValue) {
        Integer value = getInt(key);
        return value == null ? defaultValue : value;
    }

    /**
     * 获取配置文件中的长整数参数值
     *
     * @param key 参数名称.
     * @return 整数参数值.
     */
    public static Long getLong(String key) {
        String value = get(key);
        try {
            return Long.parseLong(value);
        } catch (NumberFormatException e) {
            LOG.warn("Convert config [{}={}]{} value to Long error,{}", key, value, e.getMessage());
            return null;
        }
    }

    /**
     * 获取配置文件中的长整数参数.如果文件中没有该参数就返回defaultValue.
     *
     * @param key          参数名称.
     * @param defaultValue 参数默认值.
     * @return 整数参数值.
     */
    public static long getLong(String key, int defaultValue) {
        Long value = getLong(key);
        return value == null ? defaultValue : value;
    }

    /**
     * 获取配置文件中的float参数.如果文件中没有该参数就返回defaultValue.
     *
     * @param key          参数名称.
     * @param defaultValue 参数默认值.
     * @return 整数参数值.
     */
    public static float getFloat(String key, int defaultValue) {
        Float value = getFloat(key);
        return value == null ? defaultValue : value;
    }

    /**
     * 获取配置文件中的float参数值
     *
     * @param key 参数名称.
     * @return 整数参数值.
     */
    public static Float getFloat(String key) {
        String value = get(key);
        try {
            return Float.parseFloat(value);
        } catch (NumberFormatException e) {
            LOG.warn("Convert config [{}={}]{} value to Float error,{}", key, value, e.getMessage());
            return null;
        }
    }

    /**
     * 获取配置文件中的double参数值
     *
     * @param key 参数名称.
     * @return 整数参数值.
     */
    public static Double getDouble(String key) {
        String value = get(key);
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            LOG.warn("Convert config [{}={}]{} value to Double error,{}", key, value, e.getMessage());
            return null;
        }
    }

    /**
     * 获取配置文件中的double参数.如果文件中没有该参数就返回defaultValue.
     *
     * @param key          参数名称.
     * @param defaultValue 参数默认值.
     * @return 整数参数值.
     */
    public static double getDouble(String key, int defaultValue) {
        Double value = getDouble(key);
        return value == null ? defaultValue : value;
    }

    /**
     * 获取配置文件中的double参数值
     *
     * @param key 参数名称.
     * @return 整数参数值.
     */
    public static Date getDate(String key) {
        String value = get(key);
        try {
            return TypeUtils.castToDate(value);
        } catch (JSONException e) {
            LOG.warn("Convert config [{}={}]{} value to Date error,{}", key, value, e.getMessage());
            return null;
        }
    }

    /**
     * 获取配置文件中的date参数.如果文件中没有该参数就返回defaultValue.
     *
     * @param key          参数名称.
     * @param defaultValue 参数默认值.
     * @return 整数参数值.
     */
    public static Date getDate(String key, Date defaultValue) {
        Date value = getDate(key);
        return value == null ? defaultValue : value;
    }

    /**
     * 获取配置文件中的布尔参数值.
     *
     * @param key 参数名称.
     * @return 布尔参数值.
     */
    public static Boolean getBool(String key) {
        return BooleanUtils.toBooleanObject(get(key));
    }

    /**
     * 获取配置文件中的布尔参数.如果文件中没有该参数就返回defaultValue.
     *
     * @param key          参数名称.
     * @param defaultValue 参数默认值.
     * @return 布尔参数值.
     */
    public static boolean getBool(String key, boolean defaultValue) {
        Boolean value = getBool(key);
        return value == null ? defaultValue : value;
    }

    /**
     * 获取配置文件中的文件参数
     *
     * @param key 参数名称.
     * @return 文件路径参数值.
     */
    public static File getPath(String key) {
        String path = get(key);
        if (path.startsWith("file:")) {
            try {
                return new File(new URI(StringUtils.replace(path, " ", "%20")).getSchemeSpecificPart());
            } catch (URISyntaxException ex) {
                try {
                    return new File(new URL(path).getFile());
                } catch (MalformedURLException e) {
                    return null;
                }
            }
        } else {
            return new File(path);
        }
    }

    public static Map getProperties() {
        return PROPERTIES;
    }

    public static String getAnyHome() {
        return get(Constants.ANY_HOME);
    }

    private static String namesToPath(String... name) {
        if (name != null && name.length > 0) {
            return "/" + StringUtils.join(name, "/");
        } else {
            return "";
        }
    }

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if (usePlaceholderProperties && bean instanceof PlaceholderConfigurerSupport) {
            loaders.add((PropertiesLoaderSupport) bean);
        }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }

    public void afterPropertiesSet() throws Exception {
        if (usePlaceholderProperties) {
            OrderComparator.sort(loaders);
            for (PropertiesLoaderSupport loader : loaders) {
                PROPERTIES.putAll((Properties) MethodUtils.invokeMethod(loader, "mergeProperties", null));
            }
        }
        PROPERTIES.putAll(mergeProperties());
        // 检查某些关键的配置顶是否存在，不存在就报初始化错误
        String[] keys = this.necessaryConfigs;
        if (keys != null) {
            for (String key : keys) {
                key = StringUtils.trimToEmpty(key);
                if (!PROPERTIES.containsKey(key)) {
                    throw new IllegalStateException("Can not find property \"" + key + "\" in configuration file.");
                }
            }
        }
    }

    static class ConfigPlaceholderResolver implements PropertyPlaceholderHelper.PlaceholderResolver {

        private final Map props;

        public ConfigPlaceholderResolver(Map props) {
            this.props = props;
        }

        public String resolvePlaceholder(String placeholderName) {
            String propVal = (String) props.get(placeholderName);
            if (propVal == null) {
                propVal = System.getProperty(placeholderName);
                if (propVal == null) {
                    propVal = System.getenv(placeholderName);
                }
            }
            return propVal;
        }
    }
}
