namespace csharp Com.le07.Api.Standard
namespace java com.le07.api.standard
namespace php Standard
namespace js Standard

include "Type.thrift"
###################################################################################
## 包含 区域、计量单位、分类信息
###################################################################################


/**
 * 区域信息
 */
struct Area{
    /**
     * id
     */
    1: i64 id,

    2: string name,

    3: i64 level,

    4: i64 usetype,

    /**
     * pid
     */
    5: i64 pid,

    6: i64 displayorder
}



/**
 * 区域服务
 * 暂时只提供查询
 */
service AreaService{

    /**
     * 查询pid下所有区域
     */
    list<Area> getAreaByPid(
        /**
         *  pid
         */
         1: i64 pid

    )throws (
        1: Type.AnyException ex
    )

}




################################### 计量单位 ###################################################
/**
 * 计量单位
 */
struct Unit{
    /**
     * ID
     *
     * @readonly
     */
	1: optional i64 id,

	/**
     * 单位名
     */
    2: optional string name,

    /**
     * BizKey
     */
    3: optional string  bizKey,

    /**
     * 状态
     */
    4: optional Type.Status status = 0,

    /**
     * 描述
     */
   5: optional string remark

}

/**
 * Unit 分页对象
 */
struct UnitPage{
    /**
     * 总数
     */
	1: optional i64 total,

	/**
     * Unit列表
     */
    2: optional list<Unit> items
}



/**
 * 计量单位服务
 */
service UnitService{

    /**
     * 保存或更新一个计量单位
     * 如果有携带id, 则认为是更新
     */
    Unit saveOrUpdate(
        /**
         * 计量单位
         */
         1: Unit unit

    )throws (
        1: Type.AnyException ex
    )


    /**
     * 修改状态
     */
    void updateStatus(
        /**
         * id
         */
         1: i64 id,

         /**
          * 修改后的状态
          */
         2: Type.Status status
    )throws (
        1: Type.AnyException ex
    )


    /**
     * 批量修改状态
     */
    void batchUpdateStatus(
        /**
         * ids
         */
         1: set<i64> ids,

         /**
          * 修改后的状态
          */
         2: Type.Status status

    )throws (
        1: Type.AnyException ex
    )

    /**
     * 根据ID获取
     */
    Unit get(
        /**
         * id
         */
         1: i64 id
    )throws (
        1: Type.AnyException ex
    )


    /**
     * Unit 列表
     * ps: offset>=0 && size>0 分页才生效
     */
    UnitPage listUnit(
        /**
         * name 模糊查询， 不传或空查询全部
         */
         1: string name,

         /**
          * 状态，不传或空查询全部
          */
         2: set<Type.Status> status,

         /**
          * 业务Key， 不传或空查询全部
          */
         3: string bizKey,

         /**
          * 偏移量
          */
         4: i64 offset,

         /**
           * 抓取数
           */
         5: i64 size,
    )throws (
        1: Type.AnyException ex
    )

}




################################## 分类信息 ###############################################

/**
 * 分类信息
 * 每个应用各自拥有各自的分类信息
 */
struct Classification{
    /**
     * ID
     *
     * @readonly
     */
	1: optional i64 id,

	/**
     * 分类名
     */
    2: optional string name,

 	/**
     * 所属父分类ID
     */
    3: optional i64 pid,

    /**
     * BizKey
     */
    4: optional string  bizKey,

    /**
     * 状态
     */
    5: optional Type.Status status = 0,

    /**
     * 描述
     */
    6: optional string remark

}

/**
 * Classification 分页对象
 */
struct ClassificationPage{
    /**
     * 总数
     */
	1: optional i64 total,

	/**
     * Unit列表
     */
    2: optional list<Classification> items
}



/**
 * 分类信息服务
 */
service ClassificationService{

    /**
     * 保存或保存一个分类信息，
     * 最顶层的分类Pid为0
     * 如果有携带id, 则认为是更新
     */
    Classification saveOrUpdate(
        /**
         * 分类信息
         */
         1: Classification classification

    )throws (
        1: Type.AnyException ex
    )


    /**
     * 修改状态
     */
    void updateStatus(
        /**
         * id
         */
         1: i64 id,

         /**
          * 修改后的状态
          */
         2: Type.Status status
    )throws (
        1: Type.AnyException ex
    )


    /**
     * 批量修改状态
     */
    void batchUpdateStatus(
        /**
         * ids
         */
         1: set<i64> ids,

         /**
          * 修改后的状态
          */
         2: Type.Status status

    )throws (
        1: Type.AnyException ex
    )

    /**
     * 根据ID获取
     */
    Classification get(
        /**
         * id
         */
         1: i64 id
    )throws (
        1: Type.AnyException ex
    )

    /**
     * 或许pids下所有分类信息
     */
    list<Classification> listClassificationByPids(
        /**
         * pids
         */
         1: set<i64> pids,

        /**
         * bizKey
         */
         2: string bizKey,

         /**
          * 状态, 为空则查询所有状态
          */
         3: set<Type.Status> status

    )throws (
        1: Type.AnyException ex
    )


    /**
     * Classification 列表
     * ps: offset>=0 && size>0 分页才生效
     */
    ClassificationPage listClassification(
        /**
         * name 模糊查询， 不传或空查询全部
         */
         1: string name,

         /**
          * 状态，不传或空查询全部
          */
         2: set<Type.Status> status,

         /**
          * 业务Key， 不传或空查询全部
          */
         3: string bizKey,

         /**
          * 偏移量
          */
         4: i64 offset,

         /**
           * 抓取数
           */
         5: i64 size,
    )throws (
        1: Type.AnyException ex
    )



}
