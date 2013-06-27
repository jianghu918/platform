
package com.le07.framework.util;

import com.google.common.collect.Maps;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;


public abstract class LoaderEx<K, V> {

    public V load(K key) {
        return null;
    }

    public Map<K, V> batchLoad(K... keys) {
        return batchLoad(Arrays.asList(keys));
    }

    public Map<K, V> batchLoad(Collection<K> keys) {
        Map<K, V> map = Maps.newHashMapWithExpectedSize(keys.size());
        for (K key : keys) {
            V value = load(key);
            if (value != null) {
                map.put(key, value);
            }
        }
        return map;
    }
}
