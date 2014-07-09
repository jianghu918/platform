package com.le07.catering.dao;

import com.le07.catering.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created with IDEA.
 * User: hu
 * Date: 13-8-6
 * Time: 下午5:03
 */
@Repository
public interface CompanyDao extends JpaRepository<Company, Long>{


    List<Company> findByAreaId(long areaId);

    List<Company> findByTag(String tag);

    @Query("select c from Company c where c.entreeType.id = ?1")
    List<Company> findByEntreeType(long entreeType);

}
