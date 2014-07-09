
package com.le07.framework.support.hibernate;

import com.google.common.collect.Lists;
import org.hibernate.cfg.ImprovedNamingStrategy;

import java.util.List;


public class Catring_PrefixNamingStrategy extends ImprovedNamingStrategy{
    private static final long serialVersionUID = -5422825505217904901L;
    private String prefix = "ctr_";

    private List<String> excludes = Lists.newArrayList();
    {
        excludes.add("cs_");
        excludes.add("app");
        excludes.add("biz");
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    @Override
    public String classToTableName(String tableName) {
        return prefix + super.classToTableName(tableName);
    }

    @Override
    public String tableName(String tableName) {
        if (!tableName.startsWith(prefix) && !isExclude(tableName) ) {
            tableName = prefix + tableName;
        }
        return super.tableName(tableName);
    }


    public boolean isExclude(String tableName)
    {
        for (String exclude : excludes) {
            if(tableName.startsWith(exclude))
                return true;
        }
        return false;
    }


}
