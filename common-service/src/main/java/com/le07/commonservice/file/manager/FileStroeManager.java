package com.le07.commonservice.file.manager;

import com.le07.commonservice.file.model.FileStroe;
import com.le07.framework.base.BaseManager;

import java.util.List;

/**
 * 文件管理 DB
 * Created with IntelliJ IDEA.
 * User: 虎
 * Date: 13-8-10
 * Time: 下午4:40
 */
public interface FileStroeManager  extends BaseManager<FileStroe, Long>{

    FileStroe findByMd5(String md5);

    FileStroe findByName(String fileName);

    FileStroe findById(Long id);

    List<String> getDirs();

    List<String> getFileNamesByDir(String path);
}
