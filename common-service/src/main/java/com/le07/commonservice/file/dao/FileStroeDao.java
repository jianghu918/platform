package com.le07.commonservice.file.dao;

import com.le07.commonservice.file.model.FileStroe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created with IntelliJ IDEA.
 * User: 虎
 * Date: 13-8-11
 * Time: 下午3:28
 */
@Repository
public interface FileStroeDao extends JpaRepository<FileStroe, Long>{


    FileStroe findByMd5(String md5);

    FileStroe findByName(String fileName);
}
