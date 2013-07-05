package com.le07.commonservice.app.manager;

/**
 *
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-5
 * Time: 下午1:49
 */
public interface BizConfigManager {
    /**
     * 根据业务key获取业务id
     *
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

   /* *//**
     * 根据业务key获取业务配置对象
     *
     * @param bizKey    业务key
     * @param configKey 配置key
     * @return 业务配置对象
     *//*
    BizConfig getBizConfig(String bizKey, String configKey);

    *//**
     * 根据业务id获取业务配置对象
     *
     * @param bizId     业务id
     * @param configKey 配置key
     * @return 业务配置对象
     *//*
    BizConfig getBizConfig(int bizId, String configKey);

    *//**
     * 保存一个业务配置
     *
     * @param bizConfig 业务配置对象
     *//*
    void saveBizConfig(BizConfig bizConfig);

    *//**
     * 获取已配置的所有业务配置对象列表
     *
     * @param configKey 配置key
     * @return 业务配置对象列表
     *//*
    List<BizConfig> getBizConfigs(String configKey);*/
}
