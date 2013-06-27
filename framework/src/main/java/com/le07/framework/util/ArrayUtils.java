
package com.le07.framework.util;

import org.springframework.util.CollectionUtils;

import java.lang.reflect.Array;
import java.util.*;


public class ArrayUtils extends org.apache.commons.lang.ArrayUtils {

    public static long[] toLongPrimitive(List<Long> array) {
        if (array == null) {
            return null;
        } else if (array.size() == 0) {
            return EMPTY_LONG_ARRAY;
        }
        int len = array.size();
        final long[] result = new long[len];
        for (int i = 0; i < len; i++) {
            result[i] = array.get(i);
        }
        return result;
    }

    public static int[] toIntPrimitive(List<Integer> array) {
        if (array == null) {
            return null;
        } else if (array.size() == 0) {
            return EMPTY_INT_ARRAY;
        }
        int len = array.size();
        final int[] result = new int[len];
        for (int i = 0; i < len; i++) {
            result[i] = array.get(i);
        }
        return result;
    }

    public static <T> Set<T> toSet(T... elements) {
        if (isEmpty(elements)) {
            return Collections.emptySet();
        }
        Set<T> set = new HashSet<T>(elements.length);
        Collections.addAll(set, elements);
        return set;
    }

    public static <T> List<T> toList(T... elements) {
        if (isEmpty(elements)) {
            return Collections.emptyList();
        }
        List<T> list = new ArrayList<T>(elements.length);
        Collections.addAll(list, elements);
        return list;
    }

    @SuppressWarnings("unchecked")
    public static <T> T[] toArray(Collection<T> col, Class<T> type) {
        if (CollectionUtils.isEmpty(col)) {
            return (T[]) Array.newInstance(type, 0);
        }
        return col.toArray((T[]) Array.newInstance(type, col.size()));
    }
}
