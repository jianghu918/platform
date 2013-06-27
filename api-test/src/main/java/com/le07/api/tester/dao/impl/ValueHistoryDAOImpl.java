package com.le07.api.tester.dao.impl;

import org.apache.commons.collections.CollectionUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import com.le07.api.tester.dao.ValueHistoryDAO;
import com.le07.api.tester.model.ValueHistory;
import com.le07.framework.support.hibernate.HibernateEntityDAO;

import java.util.*;

@Repository
public class ValueHistoryDAOImpl extends HibernateEntityDAO<ValueHistory, Integer> implements ValueHistoryDAO {
    @Override
    public void saveValueHistory(String nodeId, String value) {
        ValueHistory vh = getValueHistory(nodeId, value);
        if (vh != null) {
            vh.setCount(vh.getCount() + 1);
        } else {
            vh = new ValueHistory();
            vh.setNodeId(nodeId);
            vh.setValue(value);
        }
        vh.setUpdateAt(new Date());
        save(vh);
    }

    @Override
    public ValueHistory getValueHistory(String nodeId, String value) {
        return unique(newCriteria(
                Restrictions.eq("nodeId", nodeId),
                Restrictions.eq("value", value)));
    }

    @Override
    public Map<String, List<String>> getValuesMap(List<String> nodeIds, int size) {
        Map<String, List<String>> map = new HashMap<String, List<String>>();
        if (CollectionUtils.isNotEmpty(nodeIds)) {
            for (ValueHistory vh : query(newCriteria(Restrictions.in("nodeId", nodeIds)).addOrder(Order.desc("updateAt")), 0, size * nodeIds.size())) {
                List<String> list = map.get(vh.getNodeId());
                if (list == null) {
                    map.put(vh.getNodeId(), list = new ArrayList<String>());
                }
                list.add(vh.getValue());
            }
        }
        return map;
    }
}
