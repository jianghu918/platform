package com.le07.framework.support.thrift;

import org.apache.thrift.TProcessor;
import org.apache.thrift.protocol.TProtocol;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

import java.lang.reflect.Constructor;


@SuppressWarnings({"unchecked"})
abstract public class ThriftHelper {
    /**
     * string to find the {@link org.apache.thrift.TProcessor} implementation
     * inside the Thrift class
     */
    public static String PROCESSOR_NAME = "$Processor";
    /**
     * String to find interface of the class inside the Thrift class
     */
    public static String IFACE_NAME = "$Iface";
    /**
     * String to find client inside the Thrift class
     */
    public static String CLIENT_NAME = "$Client";

    public static Class<?> getThriftServiceInnerClassOrNull(Class<?> thriftServiceClass, String match, boolean isInterface) {
        Class<?>[] declaredClasses = thriftServiceClass.getDeclaredClasses();
        for (Class<?> declaredClass : declaredClasses) {
            if (declaredClass.isInterface()) {
                if (isInterface && declaredClass.getName().contains(match)) {
                    return declaredClass;
                }
            } else {
                if (!isInterface && declaredClass.getName().contains(match)) {
                    return declaredClass;
                }
            }
        }
        return null;
    }

    public static TProcessor buildProcessor(Class<?> svcInterface, Object service) throws Exception {
        Class<TProcessor> processorClass = (Class<TProcessor>) getThriftServiceInnerClassOrNull(svcInterface.getEnclosingClass(), PROCESSOR_NAME, false);
        Assert.notNull(processorClass, "the processor class must not be null");
        Constructor<TProcessor> constructor = ClassUtils.getConstructorIfAvailable(processorClass, svcInterface);
        Assert.notNull(constructor);
        return constructor.newInstance(service);
    }

    public static Constructor<?> getClientConstructor(Class<?> svcInterface) throws Exception {
        Class<?> clientClass = getThriftServiceInnerClassOrNull(svcInterface.getEnclosingClass(), CLIENT_NAME, false);
        Assert.notNull(clientClass, "the client class must not be null");
        Constructor<?> constructor = ClassUtils.getConstructorIfAvailable(clientClass, TProtocol.class);
        Assert.notNull(constructor);
        return constructor;
    }

    public static Object buildClient(Class<?> svcInterface, TProtocol protocol) throws Exception {
        return getClientConstructor(svcInterface).newInstance(protocol);
    }
}
