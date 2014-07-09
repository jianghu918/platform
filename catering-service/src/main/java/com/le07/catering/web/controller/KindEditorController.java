package com.le07.catering.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import com.le07.catering.shiro.realm.ShiroDbRealm;
import com.le07.catering.web.Constants;
import com.le07.commonservice.file.manager.FileStroeManager;
import com.le07.commonservice.file.model.FileStroe;
import com.le07.framework.io.editor.Editor;
import com.le07.framework.util.MD5Util;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

/**
 * 文件处理
 * Created with IntelliJ IDEA.
 * User: 虎
 * Date: 13-8-10
 * Time: 下午4:14
 */
@Controller
@RequestMapping(Constants.EDITOR)
public class KindEditorController {
    private Logger log = LoggerFactory.getLogger(KindEditorController.class);

    @Autowired
    private Editor kindEditor;

    @Autowired
    private FileStroeManager fileStroeManager;


    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    @ResponseBody
    public byte[] getFile(@PathVariable Long id) throws IOException {
        FileStroe fileStroe = fileStroeManager.findById(id);
        if (null != fileStroe) {
            String url = getUrl(fileStroe);
            File f = new File(url);
            if (f.exists()) {
                return FileCopyUtils.copyToByteArray(f);
            }
        }
        return null;
    }


    public String getUrl(FileStroe fileStroe) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String rootPath = request.getContextPath() + "/attached/";
        return rootPath + fileStroe.getStorage() + "/" + fileStroe.getName();
    }


    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public JSONObject save(MultipartHttpServletRequest request) {
        Map<String, Object> resMap = Maps.newHashMap();
        ShiroDbRealm.ShiroUser shiroUser = (ShiroDbRealm.ShiroUser) SecurityUtils.getSubject().getPrincipal();
        try {
            String rootPath = request.getContextPath() + "/attached/";
            rootPath += null != shiroUser ? shiroUser.getLoginName() : Editor.DEFAULT_BIZKEY;
            rootPath += "/";

            Map<String, MultipartFile> fileMap = request.getFileMap();
            for (MultipartFile file : fileMap.values()) {
                /*String md5 = DigestUtils.md5Hex(file.getInputStream());
                //String md5 = MD5Util.getFileMD5String(file.getInputStream());
                FileStroe fileStroe = fileStroeManager.findByMd5(md5);

                //有相同的就不再上传了
                if (null != fileStroe) {
                    resMap.put(Editor.ERROR, 0);
                    //resMap.put(Editor.URL, String.valueOf(fileStroe.getId()));
                    resMap.put(Editor.URL, rootPath + fileStroe.getStorage() + "/" + fileStroe.getName());
                } else {*/

                //调用Editor保存文件到磁盘
                resMap = kindEditor.saveFile(file, rootPath);
                String url = rootPath + resMap.get(Editor.STORAGE) + "/" + file.getOriginalFilename();
                resMap.put(Editor.URL, url);
                //save for db
                /*if (Integer.valueOf(resMap.get(Editor.ERROR).toString()) == 0) {
                    FileStroe entity = new FileStroe();
                    entity.setUserId(shiroUser.getId());
                    entity.setName(file.getOriginalFilename());
                    entity.setStorage(resMap.get(Editor.STORAGE).toString());
                    //entity.setMd5(md5);
                    fileStroeManager.save(entity);
                    String url = rootPath + "/" + file.getOriginalFilename();
                    resMap.put(Editor.URL, null != resMap.get(Editor.URL)
                            ? resMap.get(Editor.URL) + "," + url
                            : url);
                }*/
            }
        } catch (Exception e) {
            resMap.put(Editor.ERROR, -1);
            resMap.put(Editor.MESSAGE, e.getMessage());
            log.error("KindEditorController->save():{0}", e);
        }
        JSONObject obj = new JSONObject();
        obj.put("error", resMap.get(Editor.ERROR));
        obj.put("url", resMap.get(Editor.URL));
        return obj;
    }


    @RequestMapping(value = "/fileManager", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject fileManager(HttpServletRequest request) {
        Map<String, Object> map = kindEditor.getFiles(request);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("moveup_dir_path", map.get(Editor.MOVEUP_DIR_PATH));
        jsonObject.put("current_dir_path", map.get(Editor.CURRENT_DIR_PATH));
        jsonObject.put("current_url", map.get(Editor.CURRENT_URL));
        List<Hashtable> fileList = (List<Hashtable>) map.get(Editor.FILE_LIST);
        jsonObject.put("total_count", fileList.size());
        jsonObject.put("file_list", fileList);

        //response.setContentType("application/json; charset=UTF-8"); 配置文件配置
        return jsonObject;
    }


}
