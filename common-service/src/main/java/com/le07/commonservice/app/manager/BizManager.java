package com.le07.commonservice.app.manager;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 上午11:15
 */
public interface BizManager {

    /**
     * 根据业务key获取业务id
     *
     * @param bizKey 业务key
     * @return 业务id
     */
    long getBizId(String bizKey);

    /**
     * 根据业务id获取业务key
     *
     * @param bizId 业务id
     * @return 业务key
     */
    String getBizKey(long bizId);

}
