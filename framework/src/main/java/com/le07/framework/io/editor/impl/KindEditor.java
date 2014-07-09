package com.le07.framework.io.editor.impl;

import com.google.common.collect.Maps;
import com.le07.framework.io.editor.Editor;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: 虎
 * Date: 13-8-10
 * Time: 下午10:12
 */
@Service
public class KindEditor implements Editor {
    private Logger log = LoggerFactory.getLogger(KindEditor.class);


    /**
     * @return (rootPaht/attached)/年月日/文件名
     * @throws Exception
     */
    @Override
    public Map<String, Object> saveFile(MultipartFile file, String rootPath) {
        Map<String, Object> resMap = Maps.newHashMap();
        resMap.put(ERROR, 0);
        try {
            String[] path = buildPath(rootPath, file.getOriginalFilename());
            makeDir(path[0]);
            InputStream in = file.getInputStream();
            OutputStream out = new FileOutputStream(path[1]);
            IOUtils.copy(in, out);
            IOUtils.closeQuietly(out);
            IOUtils.closeQuietly(in);
            resMap.put(STORAGE, path[2]);
        } catch (IOException e) {
            resMap.put(ERROR, -1);
            resMap.put(MESSAGE, e.getMessage());
            log.error("save file error:{0}", e.getMessage());
            log.error("save file error", e);
        }
        return resMap;
    }


    @Override
    public Map<String, Object> getFiles(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>(10);

        //根目录路径，可以指定绝对路径，比如 /var/www/attached/
        String rootPath = request.getContextPath() + "/" /*+ "/attached/"*/;
        //根目录URL，可以指定绝对路径，比如 http://www.yoursite.com/attached/
        String rootUrl = request.getContextPath() +"/" /*+ "/attached/"*/;
        //图片扩展名
        String[] fileTypes = new String[]{"gif", "jpg", "jpeg", "png", "bmp"};

        //String dirName = request.getParameter("dir");
        String dirName = null;
        if (dirName != null) {
            if (!Arrays.<String>asList(new String[]{"image", "flash", "media", "file"}).contains(dirName)) {
                result.put(Editor.ERROR, "-1");
                result.put(Editor.MESSAGE, "Invalid Directory name.");
                return result;
            }
            rootPath += dirName + "/";
            rootUrl += dirName + "/";
            File saveDirFile = new File(rootPath);
            if (!saveDirFile.exists()) {
                saveDirFile.mkdirs();
            }
        }
        //根据path参数，设置各路径和URL
        String path = request.getParameter("path") != null ? request.getParameter("path") : "";
        String currentPath = rootPath + path;
        String currentUrl = rootUrl + path;
        String currentDirPath = path;
        String moveupDirPath = "";
        if (!"".equals(path)) {
            String str = currentDirPath.substring(0, currentDirPath.length() - 1);
            moveupDirPath = str.lastIndexOf("/") >= 0 ? str.substring(0, str.lastIndexOf("/") + 1) : "";
        }

        //排序形式，name or size or type
        String order = request.getParameter("order") != null ? request.getParameter("order").toLowerCase() : "name";

        //不允许使用..移动到上一级目录
        if (path.indexOf("..") >= 0) {
            result.put(Editor.ERROR, "-1");
            result.put(Editor.MESSAGE, "Access is not allowed.");
            return result;
        }
        //最后一个字符不是/
        if (!"".equals(path) && !path.endsWith("/")) {
            result.put(Editor.ERROR, "-1");
            result.put(Editor.MESSAGE, "Parameter is not valid.");
            return result;
        }
        //目录不存在或不是目录
        File currentPathFile = new File(currentPath);
        if (!currentPathFile.isDirectory()) {
            result.put(Editor.ERROR, "-1");
            result.put(Editor.MESSAGE, "Directory does not exist.");
            return result;
        }

        //遍历目录取的文件信息
        List<Hashtable> fileList = new ArrayList<Hashtable>();
        if (currentPathFile.listFiles() != null) {
            for (File file : currentPathFile.listFiles()) {
                Hashtable<String, Object> hash = new Hashtable<String, Object>();
                String fileName = file.getName();
                if (file.isDirectory()) {
                    hash.put("is_dir", true);
                    hash.put("has_file", (file.listFiles() != null));
                    hash.put("filesize", 0L);
                    hash.put("is_photo", false);
                    hash.put("filetype", "");
                } else if (file.isFile()) {
                    String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
                    hash.put("is_dir", false);
                    hash.put("has_file", false);
                    hash.put("filesize", file.length());
                    hash.put("is_photo", Arrays.<String>asList(fileTypes).contains(fileExt));
                    hash.put("filetype", fileExt);
                }
                hash.put("filename", fileName);
                hash.put("datetime", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(file.lastModified()));
                fileList.add(hash);
            }
        }

        if ("size".equals(order)) {
            Collections.sort(fileList, new SizeComparator());
        } else if ("type".equals(order)) {
            Collections.sort(fileList, new TypeComparator());
        } else {
            Collections.sort(fileList, new NameComparator());
        }

        result.put("moveup_dir_path", moveupDirPath);
        result.put("current_dir_path", currentDirPath);
        result.put("current_url", currentUrl);
        result.put("total_count", fileList.size());
        result.put("file_list", fileList);
        return result;
    }


    public class NameComparator implements Comparator {
        public int compare(Object a, Object b) {
            Hashtable hashA = (Hashtable) a;
            Hashtable hashB = (Hashtable) b;
            if (((Boolean) hashA.get("is_dir")) && !((Boolean) hashB.get("is_dir"))) {
                return -1;
            } else if (!((Boolean) hashA.get("is_dir")) && ((Boolean) hashB.get("is_dir"))) {
                return 1;
            } else {
                return ((String) hashA.get("filename")).compareTo((String) hashB.get("filename"));
            }
        }
    }

    public class SizeComparator implements Comparator {
        public int compare(Object a, Object b) {
            Hashtable hashA = (Hashtable) a;
            Hashtable hashB = (Hashtable) b;
            if (((Boolean) hashA.get("is_dir")) && !((Boolean) hashB.get("is_dir"))) {
                return -1;
            } else if (!((Boolean) hashA.get("is_dir")) && ((Boolean) hashB.get("is_dir"))) {
                return 1;
            } else {
                if (((Long) hashA.get("filesize")) > ((Long) hashB.get("filesize"))) {
                    return 1;
                } else if (((Long) hashA.get("filesize")) < ((Long) hashB.get("filesize"))) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }

    public class TypeComparator implements Comparator {
        public int compare(Object a, Object b) {
            Hashtable hashA = (Hashtable) a;
            Hashtable hashB = (Hashtable) b;
            if (((Boolean) hashA.get("is_dir")) && !((Boolean) hashB.get("is_dir"))) {
                return -1;
            } else if (!((Boolean) hashA.get("is_dir")) && ((Boolean) hashB.get("is_dir"))) {
                return 1;
            } else {
                return ((String) hashA.get("filetype")).compareTo((String) hashB.get("filetype"));
            }
        }
    }

    private void makeDir(String dirPath) {
        File dir = new File(dirPath);
        if (!dir.exists())
            dir.mkdirs();
    }


    /**
     * @param rootPath
     * @param fileName
     * @return String[] {0: 目录, 1: 全url}
     *         rootPaht/attached/年月日/文件名
     */
    private String[] buildPath(String rootPath, String fileName) {
        String[] path = new String[5];
        String storage = DATEFORMAT.format(new Date());
        String dir = rootPath + storage;
        path[0] = dir;
        path[1] = dir + "/" + fileName;
        path[2] = /*rootPath +*/ DATEFORMAT.format(new Date());
        return path;
    }

    private void getErrorMessage(Map<String, String> resMap, String message) {
        resMap.put(ERROR, "-1");
        resMap.put(MESSAGE, message);
    }
}
