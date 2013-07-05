include "Type.thrift"

namespace csharp Com.Le07.Api.Favorite
namespace java com.le07.api.favorite
namespace php Favorite
namespace js Favorite

/**
 * 收藏对象
 *
 * @field id 收藏的id,主键
 *
 * @field bizKey 收藏所属的业务key
 *
 * @field owner 收藏的所有者
 *
 * @field userId 收藏的用户
 *
 * @field url 收藏的访问地址
 *
 * @field title 收藏的标题
 *
 * @field remark 收藏的说明
 *
 * @field hash 收藏的链接hash
 *
 * @field createAt 创建时间
 */
struct Favorite {
	/**
	 * @readonly
	 */
    1: optional i64 id,
    2: optional string bizKey,
    3: optional string owner,
    4: optional i64 userId,
    5: optional string url,
    6: optional string title,
    7: optional string remark,
    8: optional string hash,
    /**
     * @readonly
     */
    9: optional Type.Timestamp createAt
}

/**
 * 收藏列表分页对象
 *
 * @field items 收藏列表
 *
 * @field total 收藏总数
 */
struct FavoritePage {
	/**
	 * @readonly
	 */
    1: optional list<Favorite> items,

    /**
     * @readonly
     */
    2: optional i32 total
}

/**
 * 查询对象
 */
struct Query{
	/**
     * bizKey
     */
	1: optional string bizKey,
	/**
     * userId
     */
    2: optional set<i64> userId,
    /**
     * owner
     */
    3: optional string owner,
    /**
     * url
     */
    4: optional string url,
    /**
     * title
     */
    5: optional string title,
    /**
     * remark
     */
    6: optional string remark,
    /**
     * createAt 时间段开始
    */
    7: optional Type.Timestamp beginTime,

    /**
     * createAt 时间段结束
     */
    8: optional Type.Timestamp endTime
}

/**
 * 收藏服务
 *
 * @tables cs_message
 */
service FavoriteService {
    /**
     * 保存一个收藏
	 * 1，如果id存在，根据id查询收藏
	 * 2，如果id不存在, 则抛异常。
	 * 3，如果查询到收藏则更新除了BizKey之外的字段。
     *
     * @param favorite 收藏
     *
     * @return 收藏
     *
     * @tables cs_favorite
     */
    Favorite saveFavorite(1: Favorite favorite) throws (1: Type.AnyException ex),

    /**
     * 删除多个收藏
     *
     * 1，根据参数更新指定收藏为删除状态。（更新cs_favorite表status字段）
     *
     * @param ids 收藏id列表
     *
     * @tables cs_favorite
     */
    void removeFavorites(1: list<i64> ids) throws (1: Type.AnyException ex),

    /**
     * 根据所有者批量删除收藏
     *
     * 1，根据参数更新指定收藏为删除状态。（更新cs_favorite表status字段）
     *
     * @param bizKey 业务key
     *
     * @param owner  所有者
     *
     * @tables cs_favorite
     */
    void removeFavoritesByOwner(1: string bizKey, 2: string owner) throws (1: Type.AnyException ex),

    /**
     * 获取一个收藏（抓取cs_favorite表）
     *
     * @param id 收藏id
     *
     * @return 收藏
     *
     * @tables cs_favorite
     */
    Favorite getFavorite(1: i64 id) throws (1: Type.AnyException ex),

    /**
     * 根据id批量获取收藏（抓取cs_favorite表）
     *
     * @param ids id列表
     * @return 收藏map
     *
     * @tables cs_favorite
     */
    map<i64, Favorite> getFavoriteMap(1: list<i64> ids) throws (1: Type.AnyException ex),

    /**
     * 获取一页收藏（抓取cs_favorite表）
     *
     * 1，根据参数组装查询语句。
     * 2，执行语句。
     *
     * @param bizKey  业务key
     *
     * @param userId  用户id
     *
     * @param keyword 收藏标题检索关键字
     *
     * @param start   开始位置
     *
     * @param size    获取个数
     *
     * @return 收藏列表分页对象
     *
     * @tables cs_favorite
     */
    FavoritePage getFavorites(1: string bizKey, 2: i64 userId, 3: string keyword, 4: i32 start, 5: i32 size) throws (1: Type.AnyException ex),

    /**
     * 获取收藏数量map（抓取cs_favorite表）
     *
     * 1，根据参数组装查询语句。
     * 2，执行语句。
     *
     * @param bizKey 业务key
     *
     * @param owners 所有者列表
     *
     * @return 收藏数量map
     *
     * @tables cs_favorite
     */
    map<string, i32> getFavoriteCountMap(1: string bizKey, 2: list<string> owners) throws (1: Type.AnyException ex),


    /**
     * 收藏列表，根据传入的Query查询（抓取cs_favorite表）
     *
     * 1，根据参数组装查询语句。
     * 2，执行语句。
     *
     */
    FavoritePage listFavorites(
    		/**
			 * 查询
			 */
			1: Query query,

			/**
			 * 偏移量,若小于0则查询全部
			 */
			2: i64 offset,

			/**
			 * 数量,若小于等于0则查询全部
			 */
			3: i64 limit
	)throws (
			1: Type.AnyException ex
	),


	/**
	 * 检查用户是否对这个owner已收藏
	 * 返回true则已收藏过
	 *
	 * 1，根据参数组装查询语句查询收藏个数。
	 * 2，个数大于0返回true，否则返回false。
	 */
	bool isFavorited(
			/**
			 * bizKey
			 */
			1: string bizKey,

			/**
			 * userId
			 */
			2: i64 userId,

			/**
			 * owner
			 */
			3: string owner
    )throws (
			1: Type.AnyException ex
	),

	/**
	 * 获取指定bizkey的收藏排行榜，返回值中map的键为“owner”表示该业务的owner，“count”表示收藏该owner的总个数。
	 */
	list<map<string, string>> getTopOwners(
			/**
			 * bizKey
			 */
			1: string bizKey,
			/**
			 * size
			 */
			2: i32 size,
	)throws (
			1: Type.AnyException ex
	)
}