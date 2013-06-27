package com.le07.api.tester.dao;

import com.le07.api.tester.model.ValueHistory;

import java.util.List;
import java.util.Map;

public interface ValueHistoryDAO {

    ValueHistory getValueHistory(String nodeId, String value);

    void saveValueHistory(String nodeId, String value);

    Map<String, List<String>> getValuesMap(List<String> nodeIds, int size);
}
