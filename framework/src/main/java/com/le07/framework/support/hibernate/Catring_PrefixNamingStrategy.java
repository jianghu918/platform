
package com.le07.framework.support.hibernate;

import org.hibernate.cfg.ImprovedNamingStrategy;


public class Catring_PrefixNamingStrategy extends ImprovedNamingStrategy {
    private static final long serialVersionUID = -5422825505217904901L;
    private String prefix = "ctr_";

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    @Override
    public String classToTableName(String tableName) {
        return prefix + super.classToTableName(tableName);
    }

    @Override
    public String tableName(String tableName) {
        if (!tableName.startsWith(prefix)) {
            tableName = prefix + tableName;
        }
        return super.tableName(tableName);
    }
}
