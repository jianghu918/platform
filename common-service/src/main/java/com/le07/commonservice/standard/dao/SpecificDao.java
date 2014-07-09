package com.le07.commonservice.standard.dao;

import com.le07.commonservice.standard.model.Classification;
import com.le07.commonservice.standard.model.Unit;
import com.le07.framework.global.type.Status;
import com.le07.framework.util.Page;

import java.util.Set;

/**
 * //TODO
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-3
 * Time: 下午4:44
 */
public interface SpecificDao {

    /**           Unit   **/

    Page<Unit> listUnit(String name, Set<Status> status, long bizId, long offset, long size);



    /**          Classification    **/
    Page<Classification> listClassification(String name, Set<Status> status, long bizId, long offset, long size);


}
