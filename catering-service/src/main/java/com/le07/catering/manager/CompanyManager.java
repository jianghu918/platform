package com.le07.catering.manager;

import com.le07.catering.model.Company;
import com.le07.catering.vto.CompanyQuery;
import com.le07.framework.base.BaseManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Created with IDEA.
 * User: hu
 * Date: 13-8-6
 * Time: 下午5:00
 */
public interface CompanyManager extends BaseManager<Company, Long>{

    List<Company> listByAreaId(long areaId);

    List<Company> listByTag(String tag);

    List<Company> listByEntreeType(long entreeType);

    Page<Company> listCompany(CompanyQuery companyQuery, Pageable pageable);
}
