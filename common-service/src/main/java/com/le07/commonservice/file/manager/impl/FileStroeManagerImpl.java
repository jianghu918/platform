package com.le07.commonservice.file.manager.impl;

import com.le07.commonservice.base.BaseManagerImpl;
import com.le07.commonservice.file.manager.FileStroeManager;
import com.le07.commonservice.file.model.FileStroe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 虎
 * Date: 13-8-10
 * Time: 下午9:09
 */
@Service
public class FileStroeManagerImpl extends BaseManagerImpl implements FileStroeManager{


    @Override
    public FileStroe save(FileStroe entity) {
        entity.setBizId(0);
        entity.setUpdateAt(new Date());
        return fileStroeDao.save(entity);
    }

    @Override
    public <S extends FileStroe> List<S> save(Iterable<S> entities) {
        return fileStroeDao.save(entities);
    }

    @Override
    public void delete(Long aLong) {

    }

    @Override
    public void delete(Iterable<? extends FileStroe> entities) {

    }

    @Override
    public FileStroe findOne(Long aLong) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public Iterable<FileStroe> findAll(Iterable<? extends Long> longs) {
        return null;
    }

    @Override
    public Iterable<FileStroe> findAll(Sort orders) {
        return null;
    }

    @Override
    public Page<FileStroe> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public FileStroe findByMd5(String md5) {
        return fileStroeDao.findByMd5(md5);
    }

    @Override
    public FileStroe findByName(String fileName) {
        return fileStroeDao.findByName(fileName);
    }

    @Override
    public FileStroe findById(Long id) {
        return fileStroeDao.findOne(id);
    }

    @Override
    public List<String> getDirs() {

        return null;
    }

    @Override
    public List<String> getFileNamesByDir(String path) {
        return null;
    }
}
