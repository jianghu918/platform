package com.le07.commonservice.base;

import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-23
 * Time: 下午1:33
 */
public interface MyRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {

}
