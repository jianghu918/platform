package com.le07.api.tester.model;

import org.apache.commons.lang.builder.ToStringBuilder;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
public class NodeAttrKey implements Serializable {
    private static final long serialVersionUID = -3995740819087912259L;
    @Id
    @Column(length = 64)
    private String nodeId;
    @Id
    @Column(name = "attr_key", length = 64)
    private String key;

    public NodeAttrKey(String nodeId, String key) {
        this.nodeId = nodeId;
        this.key = key;
    }

    public NodeAttrKey() {
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public int hashCode() {
        return nodeId.hashCode() * 31 + key.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof NodeAttrKey) {
            NodeAttrKey other = (NodeAttrKey) obj;
            return nodeId.equals(other.getNodeId()) && key.equals(other.getKey());
        }
        return false;
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
