package com.le07.catering.web;

/**
 * Created with IDEA.
 * User: hu
 * Date: 13-7-31
 * Time: 下午5:22
 */
public class Constants {
	
	public static final String HASH_ALGORITHM = "SHA-1";
	public static final int HASH_INTERATIONS = 1024;
	private static final int SALT_SIZE = 8;
	
	
    public static final String USER_INFO_SESSION = "user_info_session";


    /**
     * 后台
     * 每个控制器的mapping定义在这里
     */
    public static final String LOGIN = "/login";
    public static final String ADMIN = "/admin";
    //商家信息
    public static final String COMPANY = ADMIN + "/company";
    //商家桌子信息
    public static final String BOARD = ADMIN + "/board";
    //商家桌子信息
    public static final String DISHES = ADMIN + "/dishes";


    /**
     * 前台
     * 每个控制器的mapping定义在这里
     */
    public static final String INDEX = "/";
    public static final String INDEX_VIEW = "index/";

    public static final String INDEX_COMPANY = INDEX + "company";



    /**
     * 公共
     */
    public static final String COMMON = "/common";
    public static final String COMPONENT = COMMON + "/component";

    public static final String AREA = COMMON + "/area";
    public static final String UNIT = COMMON + "/unit";
    public static final String CLASSIFICATION = COMMON + "/classification";


    public static final String EDITOR = COMMON + "/editor";


    /**
     * session 公共的key
     */
    public interface SessionKeys{
        //城市id
        int entreeId = 0;
    }

}
