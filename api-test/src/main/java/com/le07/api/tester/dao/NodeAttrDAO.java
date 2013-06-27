package com.le07.api.tester.dao;

import com.le07.api.tester.model.NodeAttr;

import java.util.List;
import java.util.Map;


public interface NodeAttrDAO {

    NodeAttr saveNodeAttr(NodeAttr nodeAttr);

    void removeNodeAttr(String nodeId, String key);

    NodeAttr getNodeAttr(String nodeId, String key);

    List<NodeAttr> getNodeAttrs(String nodeId);

    Map<String, Map<String, Object>> getAllNodeAttrMap();
}
