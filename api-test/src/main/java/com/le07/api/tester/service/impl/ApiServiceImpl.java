package com.le07.api.tester.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.le07.api.tester.dao.NodeAttrDAO;
import com.le07.api.tester.dao.ValueHistoryDAO;
import com.le07.api.tester.model.NodeAttr;
import com.le07.api.tester.service.ApiService;
import com.le07.api.tester.util.TypeHelper;
import com.le07.framework.api.metadata.Enum;
import com.le07.framework.api.metadata.Field;
import com.le07.framework.api.metadata.MetadataFactory;
import com.le07.framework.api.metadata.Method;
import com.le07.framework.api.metadata.Node;
import com.le07.framework.api.metadata.Object;
import com.le07.framework.api.metadata.Package;
import com.le07.framework.api.metadata.Service;
import com.le07.framework.entity.EntityNotFoundException;
import com.le07.framework.support.spring.tx.ThreadResourceSupportTaskExecutor;

public class ApiServiceImpl implements ApiService, InitializingBean {
	private NodeAttrDAO nodeAttrDAO;
	private ValueHistoryDAO valueHistoryDAO;
	private Map<String, Node> nodes = new LinkedHashMap<String, Node>();
	private Map<String, String> serviceUrls;
	private String defaultServiceUrl;
	private ThreadResourceSupportTaskExecutor taskExecutor;

	public void setServiceUrls(Map<String, String> serviceUrls) {
		this.serviceUrls = serviceUrls;
	}

	public void setDefaultServiceUrl(String defaultServiceUrl) {
		this.defaultServiceUrl = defaultServiceUrl;
	}

	@Autowired
	public void setNodeAttrDAO(NodeAttrDAO nodeAttrDAO) {
		this.nodeAttrDAO = nodeAttrDAO;
	}

	@Autowired
	public void setValueHistoryDAO(ValueHistoryDAO valueHistoryDAO) {
		this.valueHistoryDAO = valueHistoryDAO;
	}

	public void setTaskExecutor(ThreadResourceSupportTaskExecutor taskExecutor) {
		this.taskExecutor = taskExecutor;
	}

	@Override
	@Transactional
	public NodeAttr saveNodeAttr(NodeAttr nodeAttr) {
		nodeAttrDAO.saveNodeAttr(nodeAttr);
		Node node = nodes.get(nodeAttr.getNodeId());
		if (node != null) {
			node.getAttrs().put(nodeAttr.getKey(), nodeAttr.getValue());
		}
		return nodeAttr;
	}

	@Override
	@Transactional
	public void removeNodeAttr(String nodeId, String key) {
		nodeAttrDAO.removeNodeAttr(nodeId, key);
		Node node = nodes.get(nodeId);
		if (node != null) {
			node.getAttrs().remove(key);
		}
	}

	@Override
	@Transactional
	public void saveValue(String nodeId, String value) {
		valueHistoryDAO.saveValueHistory(nodeId, value);
	}

	@Override
	@Transactional
	public void saveValues(Map<String, String> values) {
		for (Map.Entry<String, String> entry : values.entrySet()) {
			valueHistoryDAO.saveValueHistory(entry.getKey(), entry.getValue());
		}
	}

	@Override
	@Transactional(readOnly = true)
	public List<String> getValues(String nodeId, int size) {
		Map<String, List<String>> map = getValuesMap(Collections.singletonList(nodeId), size);
		if (map.containsKey(nodeId)) {
			return map.get(nodeId);
		} else {
			return Collections.emptyList();
		}
	}

	@Override
	@Transactional(readOnly = true)
	public Map<String, List<String>> getValuesMap(List<String> nodeIds, int size) {
		return valueHistoryDAO.getValuesMap(nodeIds, size);
	}

	@SuppressWarnings("unchecked")
	public <N extends Node> N getNode(String nodeId, Class<N> clazz) {
		Node node = nodes.get(nodeId);
		if (node != null && node.getClass() == clazz) {
			return (N) node;
		}
		throw new EntityNotFoundException(clazz, nodeId);
	}

	@Override
	public Node getNode(String nodeId) {
		return nodes.get(nodeId);
	}

	@Override
	public List<Package> getPackages() {
		List<Package> pks = new ArrayList<Package>();
		for (Node node : nodes.values()) {
			if (node instanceof Package) {
				pks.add((Package) node);
			}
		}
		return pks;
	}

	@Override
	public List<Service> getServices() {
		List<Service> ss = new ArrayList<Service>();
		for (Node node : nodes.values()) {
			if (node instanceof Service) {
				ss.add((Service) node);
			}
		}
		Collections.sort(ss);
		return ss;
	}

	private void initNodes() {
		Map<String, Map<String, java.lang.Object>> allAttrMap = nodeAttrDAO.getAllNodeAttrMap();
		for (Package pk : MetadataFactory.getInstance().getPackages()) {
			addNode(pk, allAttrMap);
			for (Field _const : pk.getConsts()) {
				addNode(_const, allAttrMap);
			}
			for (Enum _enum : pk.getEnums()) {
				addNode(_enum, allAttrMap);
				for (Field item : _enum.getFields()) {
					addNode(item, allAttrMap);
				}
			}
			for (Object obj : pk.getObjects()) {
				addNode(obj, allAttrMap);
				for (Field field : obj.getFields()) {
					addNode(field, allAttrMap);
				}
			}
			for (Service service : pk.getServices()) {
				addNode(service, allAttrMap);
				for (Method method : service.getMethods()) {
					addNode(method, allAttrMap);
					for (Field arg : method.getArgs()) {
						arg.setValue(TypeHelper.generateFieldDefalutValue(pk, arg));
						addNode(arg, allAttrMap);
					}
					for (Field ex : method.getExs()) {
						addNode(ex, allAttrMap);
					}
				}
			}
		}
	}

	private void addNode(Node node, Map<String, Map<String, java.lang.Object>> allAttrMap) {
		if (allAttrMap.containsKey(node.getId())) {
			node.setAttrs(allAttrMap.get(node.getId()));
		}
		if (node instanceof Service) {
			node.putAttr("url", getServiceUrl(node.getId()));
		}
		nodes.put(node.getId(), node);
	}

	private String getServiceUrl(String serviceId) {
		String serviceUrl = serviceUrls.get(serviceId);
		if (serviceUrl == null) {
			serviceUrl = defaultServiceUrl + "/"
					+ StringUtils.uncapitalize(StringUtils.substringAfterLast(serviceId, "."));
		}
		return serviceUrl;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		taskExecutor.execute(new Runnable() {
			@Override
			public void run() {
				initNodes();
			}
		});
	}
}
