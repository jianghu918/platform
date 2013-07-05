include "Type.thrift"

namespace csharp Com.Le07.Api.Comment
namespace java com.le07.api.comment
namespace php Comment
namespace js Comment



/**
 * 评论对象
 *
 * @field id 评论的id,主键
 *
 * @field bizKey 评论所属的业务key
 *
 * @field owner 评论的所有者
 *
 * @field userId 评论的用户,表示评论由提交的
 *
 * @field parentId 父评论id
 *
 * @field title 评论的标题
 *
 * @field body 评论内容
 *
 * @field data 评论的附加属性
 *
 * @field createAt 创建时间
 *
 * @field status 状态
 */
struct Comment {
	/**
	 * @readonly
	 */
    1: optional i64 id,
    2: optional string bizKey,
    3: optional string owner,
    4: optional i64 userId,
    5: optional i64 parentId,
    6: optional string title,
    7: optional string body,
    8: optional map<string, string> data,

    /**
     * @readonly
     */
    9: optional Type.Timestamp createAt,
    10: optional Type.Status status
}

/**
 * 评论列表分页对象
 *
 * @field items 评论列表
 *
 * @field total 评论总数
 */
struct CommentPage {
	/**
	 * @readonly
	 */
    1: optional list<Comment> items,

    /**
     * @readonly
     */
    2: optional i32 total
}

struct Query {
	/**
	 * bizKey->owners
	 */
    1: map<string, set<string>> koMap,

    /**
	 * userId
	 */
    2: set<i64> userId,

    /**
	 * title LIKE查询
	 */
    3: string title,

    /**
	 * body　LIKE查询
	 */
    4: string body,

    /**
	 * creatAt 时间段开始
	 */
    5: Type.Timestamp beginTime,

    /**
	 * creatAt 时间段结束
	 */
    6: Type.Timestamp endTime,

	/**
	 * status 多个状态OR关系
	 */
    7: set<Type.Status> status,

	/**
	 * parentId 表自关联父id
	 */
    8: i64 parentId,

	/**
	 * data 查询
	 */
    9: map<string, string> data
}

/**
 * 排序列
 */
enum Column{
    /**
	 * ID
	 */
	ID = 0,
	/**
	 * BIZKEY（内部实际上是根据biz_id列排序的）
	 */
    BIZKEY = 1,
    /**
	 * OWNER
	 */
    OWNER = 2,
    /**
	 * USERID
	 */
    USERID = 3,
    /**
	 * PARENTID
	 */
    PARENTID = 4,
    /**
	 * TITLE
	 */
    TITLE = 5,
    /**
	 * BODY
	 */
    BODY = 6,
    /**
	 * CREATEAT
	 */
    CREATEAT = 7,
    /**
	 * STATUS
	 */
    STATUS = 8
}


/**
 * 排序类型
 */
struct SortType {
	/**
	 * 排序列
	 */
	1: optional Column column,

	/**
	 * 排序
	 */
	2: optional Type.Sort sort

}

/**
 * 评论服务
 * 1.凡是删除动作，都将Status设置成Status.DELETED，即2
 * 2.返回获取动作，都是取Status不等于Status.DELETED的结果
 *
 * @tables cs_comment
 */
service CommentService {
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
     */
    Comment saveComment(1: Comment comment) throws (1: Type.AnyException ex),

    /**
     * 根据评论编号删除多个评论
     *
     *
     * @param ids 评论id列表
     *
     * @tables cs_comment
     */
    void removeComments(1: list<i64> ids) throws (1: Type.AnyException ex),

    /**
     * 根据所有者批量删除评论
     *
     * @param bizKey 业务key
     *
     * @param owner  所有者
     *
     * @tables cs_comment
     */
    void removeCommentsByOwner(1: string bizKey, 2: string owner) throws (1: Type.AnyException ex),

    /**
     * 获取一个评论
     *
     * @param id 评论id
     *
     * @return 评论
     *
     * @tables cs_comment
     */
    Comment getComment(1: i64 id) throws (1: Type.AnyException ex),

    /**
     * 根据id批量获取评论
     *
     * @param ids id列表
     * @return 评论map
     *
     * @tables cs_comment
     */
    map<i64, Comment> getCommentMap(1: list<i64> ids) throws (1: Type.AnyException ex),

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
     */
    map<string, list<Comment>> batchGetComments(1: string bizKey, 2: set<string> owners, 3: i32 size) throws (1: Type.AnyException ex),

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
     */
    CommentPage getComments(1: string bizKey, 2: string owner, 3: i32 start, 4: i32 size) throws (1: Type.AnyException ex),

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
     */
    CommentPage getUserComments(1: string bizKey, 2: i64 userId, 3: i32 start, 4: i32 size) throws (1: Type.AnyException ex),

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
     */
    map<string, i32> getCommentCountMap(1: string bizKey, 2: list<string> owners) throws (1: Type.AnyException ex),



    /**
     * 评论列表，根据传入的Query查询
     */
    CommentPage listComment(
    		/**
			 * 查询
			 */
			1: Query query,

			/**
			 * 偏移量(<0则查询全部)
			 */
			2: i64 offset,

			/**
			 * 数量(<=0则查询全部)
			 */
			3: i64 limit,

			4: list<SortType> sortTypes = null
	)throws (
			1: Type.AnyException ex
	)

}
