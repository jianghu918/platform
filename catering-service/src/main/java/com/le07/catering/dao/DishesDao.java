package com.le07.catering.dao;

import com.le07.catering.model.Dishes;
import com.le07.commonservice.base.MyRepository;
import org.springframework.stereotype.Repository;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-23
 * Time: 下午1:31
 */
@Repository
public interface DishesDao extends MyRepository<Dishes, Long> {



}
