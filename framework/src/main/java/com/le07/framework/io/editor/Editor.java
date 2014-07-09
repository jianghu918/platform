package com.le07.framework.io.editor;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 编辑器
 * Created with IntelliJ IDEA.
 * User: 虎
 * Date: 13-8-10
 * Time: 下午10:10
 */
public interface Editor {
    String DEFAULT_BIZKEY = "default";
    SimpleDateFormat DATEFORMAT = new SimpleDateFormat("yyyyMMdd");
    String ERROR = "error";
    String URL = "url";
    String MESSAGE = "message";
    String STORAGE = "storage";
    //返回文件的md5值, 判断是不是同一文件
    String MD5 = "md5";
    String ID = "id"; //fileId


    String MOVEUP_DIR_PATH = "moveup_dir_path";
    String CURRENT_DIR_PATH = "current_dir_path";
    String CURRENT_URL = "current_url";
    String TOTAL_COUNT = "total_count";
    String FILE_LIST = "file_list";


    /**
     * 保存文件
     * @return 多个文件的ID
     */
    Map<String, Object> saveFile(MultipartFile file, String rootPath) throws Exception;


    Map<String, Object> getFiles(HttpServletRequest request);

}
