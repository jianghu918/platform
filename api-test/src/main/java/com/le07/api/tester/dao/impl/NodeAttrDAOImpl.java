
package com.le07.api.tester.dao.impl;

import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import com.le07.api.tester.dao.NodeAttrDAO;
import com.le07.api.tester.model.NodeAttr;
import com.le07.api.tester.model.NodeAttrKey;
import com.le07.framework.support.hibernate.HibernateEntityDAO;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Repository
@SuppressWarnings("unchecked")
public class NodeAttrDAOImpl extends HibernateEntityDAO<NodeAttr, NodeAttrKey> implements NodeAttrDAO {

    @Override
    public NodeAttr saveNodeAttr(NodeAttr nodeAttr) {
        return save(nodeAttr);
    }

    @Override
    public void removeNodeAttr(String nodeId, String key) {
        deleteByPk(new NodeAttrKey(nodeId, key));
    }

    @Override
    public NodeAttr getNodeAttr(String nodeId, String key) {
        return get(new NodeAttrKey(nodeId, key));
    }

    @Override
    public List<NodeAttr> getNodeAttrs(String nodeId) {
        return query(newCriteria(Restrictions.eq("nodeId", nodeId)));
    }

    @Override
    public Map<String, Map<String, Object>> getAllNodeAttrMap() {
        Map<String, Map<String, Object>> map = new LinkedHashMap<String, Map<String, Object>>();
        for (NodeAttr nodeAttr : getAll()) {
            Map<String, Object> attrMap = map.get(nodeAttr.getNodeId());
            if (attrMap == null) {
                map.put(nodeAttr.getNodeId(), attrMap = new HashMap<String, Object>());
            }
            attrMap.put(nodeAttr.getKey(), nodeAttr.getValue());
        }
        return map;
    }
}
