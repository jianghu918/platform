package com.le07.api.tester.service;

import com.le07.api.tester.model.test.Case;
import com.le07.api.tester.model.test.Step;
import com.le07.api.tester.model.test.Suite;

import java.util.List;

public interface TestService {

    Suite saveSuite(Suite suite);

    Case saveCase(Case testCase);

    Step saveStep(Step step);

    void removeSuite(int... suiteId);

    void removeCase(int... caseId);

    void removeStep(int... stepId);

    List<Suite> getSuites();

    Suite getSuite(int id);

    List<Case> getCases(int suiteId);

    Case getCase(int id);

    List<Step> getSteps(int caseId);

    Step getStep(int id);
}
