package com.le07.catering.manager.impl;

import com.le07.catering.dao.CompanyDao;
import com.le07.catering.dao.SpecificDao;
import com.le07.catering.manager.CompanyManager;
import com.le07.catering.model.Company;
import com.le07.catering.vto.CompanyQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created with IDEA.
 * User: hu
 * Date: 13-8-6
 * Time: 下午5:01
 */
@Service
@Transactional
public class CompanyManagerImpl implements CompanyManager{

    @Autowired
    private CompanyDao companyDao;

    @Autowired
    private SpecificDao specificDao;



    @Override
    public Company save(Company entity) {
        return companyDao.save(entity);
    }

    @Override
    public <S extends Company> List<S> save(Iterable<S> entities) {
        return companyDao.save(entities);
    }

    @Override
    public void delete(Long id) {
        companyDao.delete(id);
    }

    @Override
    public void delete(Iterable<? extends Company> entities) {
        companyDao.delete(entities);
    }

    @Override
    public Company findOne(Long id) {
        return companyDao.findOne(id);
    }

    @Override
    public long count() {
        return companyDao.count();
    }

    @Override
    public Iterable<Company> findAll(Iterable<? extends Long> ids) {
        return null;
    }

    @Override
    public Iterable<Company> findAll(Sort orders) {
        return companyDao.findAll(orders);
    }

    @Override
    public Page<Company> findAll(Pageable pageable) {
        return companyDao.findAll(pageable);
    }


    @Override
    public List<Company> listByAreaId(long areaId) {
        return companyDao.findByAreaId(areaId);
    }

    @Override
    public List<Company> listByTag(String tag) {
        return companyDao.findByTag(tag);
    }

    @Override
    public List<Company> listByEntreeType(long entreeType) {
        return entreeType > 0 ? companyDao.findByEntreeType(entreeType)
                : companyDao.findAll();
    }

    @Override
    public Page<Company> listCompany(CompanyQuery companyQuery, Pageable pageable) {
        return specificDao.listCompany(companyQuery, pageable);
    }


}
