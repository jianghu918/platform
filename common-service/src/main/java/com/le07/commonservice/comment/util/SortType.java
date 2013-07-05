package com.le07.commonservice.comment.util;

import com.le07.commonservice.comment.type.Column;
import com.le07.framework.global.type.Sort;

/**
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 上午10:57
 */
public class SortType {
    private Column column;
    private Sort sort;

    public Column getColumn() {
        return column;
    }

    public void setColumn(Column column) {
        this.column = column;
    }

    public Sort getSort() {
        return sort;
    }

    public void setSort(Sort sort) {
        this.sort = sort;
    }
}
