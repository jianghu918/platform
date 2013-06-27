
package com.le07.framework.support.hibernate;

import com.google.common.collect.Maps;

import java.util.List;
import java.util.Map;


public class HibernateUtils {
    private HibernateUtils() {
    }

    public static int getInt(Object o) {
        if (o == null) {
            return 0;
        }
        return ((Number) o).intValue();
    }

    public static float getFloat(Object o) {
        if (o == null) {
            return 0;
        }
        return ((Number) o).floatValue();
    }

    public static double getDouble(Object o) {
        if (o == null) {
            return 0;
        }
        return ((Number) o).doubleValue();
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Integer> toIntMap(List list) {
        Map<String, Integer> map = Maps.newHashMap();
        for (Object[] arr : (List<Object[]>) list) {
            map.put((String) arr[0], getInt(arr[1]));
        }
        return map;
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Float> toFloatMap(List list) {
        Map<String, Float> map = Maps.newHashMap();
        for (Object[] arr : (List<Object[]>) list) {
            map.put((String) arr[0], getFloat(arr[1]));
        }
        return map;
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Double> toDoubleMap(List list) {
        Map<String, Double> map = Maps.newHashMap();
        for (Object[] arr : (List<Object[]>) list) {
            map.put((String) arr[0], getDouble(arr[1]));
        }
        return map;
    }
    
    @SuppressWarnings("unchecked")
    public static Map<Long, Double> toDoubleMap1(List list) {
        Map<Long, Double> map = Maps.newHashMap();
        for (Object[] arr : (List<Object[]>) list) {
            map.put((Long) arr[0], getDouble(arr[1]));
        }
        return map;
    }
}
