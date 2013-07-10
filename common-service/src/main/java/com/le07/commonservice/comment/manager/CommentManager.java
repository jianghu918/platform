package com.le07.commonservice.comment.manager;

import com.le07.commonservice.comment.model.Comment;
import com.le07.commonservice.comment.util.Query;
import com.le07.commonservice.comment.util.SortType;
import com.le07.framework.util.Page;

import java.util.List;
import java.util.Map;
import java.util.Set;



/**
 * Comment Manager
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-8
 * Time: 上午10:48
 */
@SuppressWarnings({"unused","unchecked","all"})
public interface CommentManager {
    /**
     * 保存一个评论
     * 1. 若设置了评论编号,且该编号对应的评论存在,则更新这个评论,否则新建一个评论
     * 	  1.1 其中的data会转化成json格式存储在数据库的json字段中,data一般用来设置评论的扩展属性
     * 2. 评论的标题和内容均会经过敏感词接口(spamService)过滤
     *
     * @param comment 评论
     *
     * @return 评论
     *
     * @tables cs_comment
     *
     * @param comment
     */
    public Comment saveComment(Comment comment) ;

    /**
     * 根据评论编号删除多个评论
     *
     *
     * @param ids 评论id列表
     *
     * @tables cs_comment
     *
     * @param ids
     */
    public void removeComments(List<Long> ids) ;

    /**
     * 根据所有者批量删除评论
     *
     * @param bizKey 业务key
     *
     * @param owner  所有者
     *
     * @tables cs_comment
     *
     * @param bizKey
     * @param owner
     */
    public void removeCommentsByOwner(String bizKey, String owner) ;

    /**
     * 获取一个评论
     *
     * @param id 评论id
     *
     * @return 评论
     *
     * @tables cs_comment
     *
     * @param id
     */
    public Comment getComment(long id) ;

    /**
     * 根据id批量获取评论
     *
     * @param ids id列表
     * @return 评论map
     *
     * @tables cs_comment
     *
     * @param ids
     */
    public Map<Long,Comment> getCommentMap(List<Long> ids) ;

    /**
     * 根据owner列表批量获取评论
     *
     * @param bizKey 业务名
     *
     * @param owners 所有者列表
     *
     * @param size 获取个数(<=0则查询全部)
     *
     * @return 评论列表map
     *
     * @tables cs_comment
     *
     * @param bizKey
     * @param owners
     * @param size
     */
    public Map<String,List<Comment>> batchGetComments(String bizKey, Set<String> owners, int size) ;

    /**
     * 获取一页评论
     *
     * @param bizKey 业务key
     *
     * @param owner  所有者
     *
     * @param start  开始位置(<0则查询全部)
     *
     * @param size   获取个数(<=0则查询全部)
     *
     * @return 评论列表分页对象
     *
     * @tables cs_comment
     *
     * @param bizKey
     * @param owner
     * @param start
     * @param size
     */
    public Page<Comment> getComments(String bizKey, String owner, int start, int size) ;

    /**
     * 获取一页评论
     *
     * @param bizKey 业务key
     *
     * @param userId 用户id
     *
     * @param start  开始位置(<0则查询全部)
     *
     * @param size   获取个数(<=0则查询全部)
     *
     * @return 评论列表分页对象
     *
     * @tables cs_comment
     *
     * @param bizKey
     * @param userId
     * @param start
     * @param size
     */
    public Page<Comment> getUserComments(String bizKey, long userId, int start, int size) ;

    /**
     * 获取评论数量map
     *
     * @param bizKey 业务key
     *
     * @param owners 所有者列表
     *
     * @return 评论数量map
     *
     * @tables cs_comment
     *
     * @param bizKey
     * @param owners
     */
    public Map<String,Integer> getCommentCountMap(String bizKey, List<String> owners) ;

    /**
     * 评论列表，根据传入的Query查询
     *
     * @param query 查询
     *
     * @param offset 偏移量(<0则查询全部)
     *
     * @param limit 数量(<=0则查询全部)
     *
     * @param sortTypes
     */
    public Page<Comment> listComment(Query query, long offset, long limit, List<SortType> sortTypes) ;

}
