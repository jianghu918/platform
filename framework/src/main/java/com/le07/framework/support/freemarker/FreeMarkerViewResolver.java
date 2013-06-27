
package com.le07.framework.support.freemarker;

import org.springframework.web.servlet.view.AbstractUrlBasedView;


public class FreeMarkerViewResolver extends org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver {
    @Override
    protected Class requiredViewClass() {
        return FreeMarkerView.class;
    }

    @Override
    protected AbstractUrlBasedView buildView(String viewName) throws Exception {
        return super.buildView(viewName);
    }
}
