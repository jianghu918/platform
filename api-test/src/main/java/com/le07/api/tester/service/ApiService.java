package com.le07.api.tester.service;

import com.le07.api.tester.model.NodeAttr;
import com.le07.framework.api.metadata.Node;
import com.le07.framework.api.metadata.Package;
import com.le07.framework.api.metadata.Service;

import java.util.List;
import java.util.Map;

public interface ApiService {

    NodeAttr saveNodeAttr(NodeAttr nodeAttr);

    void removeNodeAttr(String nodeId, String key);

    void saveValue(String nodeId, String value);

    void saveValues(Map<String, String> values);

    List<String> getValues(String nodeId, int size);

    Map<String, List<String>> getValuesMap(List<String> nodeIds, int size);

    <N extends Node> N getNode(String nodeId, Class<N> clazz);

    Node getNode(String nodeId);

    List<Package> getPackages();

    List<Service> getServices();
}
