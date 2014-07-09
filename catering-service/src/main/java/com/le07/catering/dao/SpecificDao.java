package com.le07.catering.dao;

import com.le07.catering.model.Company;
import com.le07.catering.vto.CompanyQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * JPA复杂查询
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-19
 * Time: 下午1:40
 */
public interface SpecificDao {

    Page<Company> listCompany(CompanyQuery companyQuery, Pageable pageable);
}
