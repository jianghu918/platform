package com.le07.framework.ex;

/**
 * 所有CODE到这里来统一定义吧，知道到用到哪儿了。
 * Created with IDEA
 * User: jh
 * Date: 13-7-3
 * Time: 下午2:21
 */
public class ECode {
    /** 基数 */
    public static int RADIX = 100;

    /**
     *  APP
     */
    public interface AppCode extends ErrorCode{
        int base = ECode.RADIX * 1;


    }

    /**
     * IDENTITY
     */
    public interface IdentityCode extends ErrorCode{
        int base = ECode.RADIX * 2;


    }
}
