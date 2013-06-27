package com.le07.api.tester.model;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import com.le07.framework.support.hibernate.JSONType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.IdClass;

@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@TypeDef(name = "json", typeClass = JSONType.class)
@IdClass(NodeAttrKey.class)
public class NodeAttr extends NodeAttrKey {
    private static final long serialVersionUID = 15982917966357158L;
    @Type(type = "json")
    @Column(length = 500000)
    private Object value;

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }
}
