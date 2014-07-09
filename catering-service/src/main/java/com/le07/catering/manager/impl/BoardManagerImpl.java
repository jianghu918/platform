package com.le07.catering.manager.impl;

import com.le07.catering.dao.BoardDao;
import com.le07.catering.manager.BoardManager;
import com.le07.catering.model.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-19
 * Time: 下午1:38
 */
@Service
@Transactional
public class BoardManagerImpl implements BoardManager {

    @Autowired
    private BoardDao boardDao;


    @Override
    public Board save(Board entity) {
        return boardDao.save(entity);
    }

    @Override
    public <S extends Board> List<S> save(Iterable<S> entities) {
        return boardDao.save(entities);
    }

    @Override
    public void delete(Long id) {
        boardDao.delete(id);
    }

    @Override
    public void delete(Iterable<? extends Board> entities) {
        boardDao.delete(entities);
    }

    @Override
    public Board findOne(Long id) {
        return boardDao.findOne(id);
    }

    @Override
    public long count() {
        return boardDao.count();
    }

    @Override
    public Iterable<Board> findAll(Iterable<? extends Long> ids) {
        return boardDao.findAll((Iterable<Long>) ids);
    }

    @Override
    public Iterable<Board> findAll(Sort orders) {
        return boardDao.findAll(orders);
    }

    @Override
    public Page<Board> findAll(Pageable pageable) {
        return boardDao.findAll(pageable);
    }


    @Override
    public List<Board> findByCompanyId(Long companyId) {
        return boardDao.findByCompanyId(companyId);
    }
}
