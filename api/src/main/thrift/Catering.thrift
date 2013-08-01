include "Type.thrift"

namespace csharp Com.Le07.Api.Catering
namespace java com.le07.api.catering
namespace php Catering
namespace js Catering








/**
 * 菜品信息
 */
struct Dishes{
    /**
     * id
     * @readonly
     */
     1: optional i64 id,

    /**
     * classificationId
     */
     2: optional i64 classificationId,

    /**
     * name
     */
     3: optional string name,

     /**
      * 摘要
      */
     4: optional string summary,

    /**
     * 价格
     */
     5: optional double price,

    /**
     * 评分
     */
     6: optional i64 score,

    /**
     * 状态
     */
     7: optional Type.Status status,

    /**
     * 单位Id
     */
     8: optional i64 unitId,

    /**
     * thumbnail
     */
     9: optional string thumbnail,

    /**
     * remark
     */
     10: optional string remark
}


/**
 * 菜品折扣信息
 */
struct Discount{
    /**
     * id
     * @readonly
     */
     1: optional i64 id,

    /**
     * dishesId
     */
     2: optional i64 dishesId,

    /**
     * 折价
     */
     3: optional double price,

    /**
     * 折率
     */
     4: optional double rate,

     /**
      * 状态
      */
     5: optional Type.Status status,

    /**
     * type
     */
     6: optional i32 type,

    /**
     * remark
     */
     7: optional string remark
}


/**
 * 订单Item
 */
struct OrderItem{
   /**
    * id
    * @readonly
    */
    1: optional i64 id,

    /**
     * orderId
     */
    2: optional i64 orderId,

    /**
     * 菜品id
     */
    3: optional i64 dishesId,

    /**
     * quantity
     */
     4: optional i32 quantity,

    /**
     * price 单价
     */
     5: optional double price,

    /**
     * 总价
     */
     6: optional double totalPrice,

    /**
     * description
     */
     7: optional string description
}


/**
 * 订单
 */
struct Order{
   /**
    * id
    * @readonly
    */
    1: optional i64 id,

    /**
     * 订单号
     */
    2: optional string orderNo,

    /**
     * 商家id
     */
    3: optional i64 companyId,

    /**
     * 订单创建时间
     */
     4: optional Type.Timestamp creatAt,

    /**
     * 更新时间
     */
     5: optional Type.Timestamp updateAt,

    /**
     * 是否外送
     */
     6: optional bool isOutside,

    /**
     * 支付方式
     */
     7: optional Type.PayType payType,

    /**
     * 支付状态
     */
     8: optional Type.PayStatus payStatus,

    /**
     * 支付时间
     */
     9: optional Type.Timestamp payTime,

    /**
     * 收货人联系电话
     */
    10: optional string phone,

    /**
     * 预约时间
     */
    11: optional Type.Timestamp presetTime,

    /**
     * 订单总价
     */
    12: optional double totalPrice,

     /**
      * 总折扣价
      */
     13: optional double discountPrice,

    /**
     * 实付
     */
    14: optional double price,

    /**
     * 支付类型
     */
    15: optional i64 paymentTypeId,

    /**
     * Order Items
     */
    16: optional list<OrderItem> orderItems
}



/**
 * 支付方式
 */
struct PaymentType{
   /**
    * id
    * @readonly
    */
    1: optional i64 id,

    /**
     * payCode
     */
     2: optional i64 payCode,

    /**
     * payName
     */
     3: optional string payName,

    /**
     * 状态
     */
     4: optional Type.Status status,

    /**
     * 是否货到付款
     */
     5: optional bool isCod,

    /**
     * description
     */
     6: optional string description,

     /**
      * Orders
      */
     7: optional list<Order> orders
}



/**
 * 支付方式Page
 */
struct PaymentTypePage{
    1: i64 total,
    2: list<PaymentType> items
}


/**
 * 餐桌详情信息（是指预定信息）
 */
struct BoardItem{
   /**
    * id
    * @readonly
    */
    1: optional i64 id,

    /**
     * boardId
     */
     2: optional i64 boardId,

    /**
     * 开始时间
     */
     3: optional Type.Timestamp beginTime,

    /**
     * 结束时间
     */
     4: optional Type.Timestamp endTime,

    /**
     * 订餐人数
     */
     5: optional i32 number,

    /**
     * remark
     */
     6: optional string remark
}


/**
 * 餐桌信息表
 */
struct Board{
   /**
    * id
    * @readonly
    */
    1: optional i64 id,

    /**
     * CompanyId
     */
     2: optional i64 companyId,

    /**
     * 容纳人数
     */
     3: optional i64 galleryful,

    /**
     * name
     */
     4: optional string name,

    /**
     * 摘要
     */
     5: optional string summary,

    /**
     * 状态
     */
     6: optional Type.BoardStatus status,

    /**
     * remark
     */
     7: optional string remark,

    /**
     * boardItems
     * 预定详情
     */
     8: optional list<BoardItem> boardItems

}


/**
 * 商家信息
 */
struct Company{
    /**
     * id
     * @readonly
     */
     1: optional i64 id,

    /**
     * bizKey
     */
     2: optional string bizKey,

     /**
      * name
      */
      3: optional string name,

    /**
     * 摘要
     */
     4: optional string summary,

    /**
     * 地址
     */
     5: optional string address,

    /**
     * 联系人
     */
     6: optional string contact,

    /**
     * 环境评分
     */
     7: optional i64 environmentScore,

    /**
     * 服务评分
     */
     8: optional i64 serviceScore,

    /**
     * 口味评分
     */
     9: optional i64 tasteScore,

    /**
     * 地图
     */
     10: optional string mapurl,

    /**
     * 区域id
     */
     11: optional i64 areaId,

    /**
     *  phone
     */
     12: optional string phone,

    /**
     * qq
     */
     13: optional string qq,

    /**
     * msn
     */
     14: optional string msn,

    /**
     *  weibo
     */
     15: optional string weibo,

    /**
     * weixin
     */
     16: optional string weixin,

    /**
     * remark
     */
     17: optional string remark,

    /**
     * Disheses
     */
     18: optional list<Dishes> disheses,

     /**
      * Boards
      */
      19: optional list<Board> boards,

      /**
       * 状态
       */
      20: optional Type.Status status
}


/**
 * 商家信息分页
 */
struct CompanyPage{
    1: i64 total,
    2: list<Company> items
}

/**
 * company fetch
 */
struct CompanyFetchType{
    1: bool all = false,
    2: bool disheses = false,
    3: bool boards = false
}































#####################################################################################
service CateringService{

    #####        支付方式       ####

    /**
     * 新增或修改一个支付类型
     * id存在则更新。 为空则新增。
     */
    PaymentType savePaymentType(
        /**
         * 支付类型
         */
        1: PaymentType paymentType
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 更新状态
     */
    void updatePaymentStatus(
        /**
         * 支付类型ID
         */
        1: i64 paymentTypeId,

        /**
         * 状态
         */
        2: Type.Status status
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 批量更新状态
     */
    void batchUpdatePaymentStatus(
        /**
         * 支付类型IDs
         */
        1: set<i64> paymentTypeIds,

        /**
         * 状态
         */
        2: Type.Status status
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 根据ID获取
     */
    PaymentType getPaymentType(
        /**
         * 支付类型ID
         */
        1: i64 paymentTypeId,
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 根据ID获取
     */
    list<PaymentType> getPaymentTypeByIds(
        /**
         * 支付类型ID
         */
        1: list<i64> paymentTypeIds,
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 根据指定条件获取
     * 条件为空则取全部
     */
    PaymentTypePage listPaymentTypes(
        /**
         * payCode
         */
        1: string payCode,

        /**
         * payName
         */
        2: string payName,

        /**
         * 状态
         */
        3: set<Type.Status> status,

        /**
         * 是否货到付款
         */
        4: bool isCod,

        /**
         * FetchType
         */
        5: Type.FetchType fetch,

        /**
         * offset
         */
        6: i64 offset,

        /**
         * size
         */
        7: i64 size
    )throws(
        1: Type.AnyException ex
    ),




    #####    Company商家信息      ####################################################
    /**
     * 新增或修改商家信息
     * id存在则更新。 为空则新增。
     */
    Company saveCompany(
        /**
         * 商家信息
         */
        1: Company company
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 更新状态
     */
    void updateCompanyStatus(
        /**
         * 商家信息ID
         */
        1: i64 companyId,

        /**
         * 状态
         */
        2: Type.Status status
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 批量更新状态
     */
    void batchUpdateCompanyStatus(
        /**
         * 商家信息IDs
         */
        1: set<i64> companyIds,

        /**
         * 状态
         */
        2: Type.Status status
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 根据ID获取
     */
    Company getCompany(
        /**
         * 商家信息ID
         */
        1: i64 companyId,
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 根据ID获取
     */
    list<Company> getCompanyByIds(
        /**
         * 支付类型ID
         */
        1: list<i64> companyIds,
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 根据区域ID获取商家
     */
    list<Company> getCompaniesByAreaId(
        /**
         * 区域id
         */
        1: i64 areaId,
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 获取区域内热门商家信息
     * (根据评分最高)
     */
    list<Company> getHotRatingCompaniesByAreaId(
        /**
         * 区域id
         */
        1: i64 areaId,
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 获取区域内热门商家信息
     * (收藏最多)
     */
    list<Company> getHotFavoriteCompaniesByAreaId(
        /**
         * 区域id
         */
        1: i64 areaId,
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 获取区域内热门商家信息
     * (点击最多)
     */
    list<Company> getHotCounterCompaniesByAreaId(
        /**
         * 区域id
         */
        1: i64 areaId,
    )throws(
        1: Type.AnyException ex
    ),

    /**
     * 根据指定条件获取
     * 条件为空则取全部
     */
    CompanyPage listCompanies(
        /**
         * bizKey
         */
        1: string bizKey,

        /**
         * name
         */
        2: string name,

        /**
         * 摘要
         */
        3: string summary,

        /**
         * 地址
         */
        4: string address,

        /**
         * FetchType
         */
        5: CompanyFetchType fetch,

        /**
         * offset
         */
        6: i64 offset,

        /**
         * size
         */
        7: i64 size
    )throws(
        1: Type.AnyException ex
    ),




}