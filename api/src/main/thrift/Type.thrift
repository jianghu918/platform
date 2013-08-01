namespace csharp Com.le07.Api.Type
namespace java com.le07.api.type
namespace php Type
namespace js Type



/**
 * 表示时间戳类型
 * 因为Thrift原生没有时间类型,所以用到时间的话推荐使用这个类型
 */
typedef i64 Timestamp

/**
 * 对于这种自定义数据的方式,7: optional map<string, string> data
 * 如果放入一个已JSON常量作为key的值,则表示已这个值反序列后作为data
 */
const string JSON="_json";

typedef i16 Boolean
const Boolean TRUE_BOOLEAN = 1;
const Boolean FALSE_BOOLEAN = -1;

/**
 * 表示空的bool
 * 因为Thrift的基本类型不支持null,在做插入操作的时候用来表示主键为空
 */
const Boolean NULL_BOOLEAN = 0;

/**
 * 同上
 */
const i16 NULL_SHORT = 0;

/**
 * 同上
 */
const i32 NULL_INT = 0;

/**
 * 同上
 */
const i64 NULL_LONG = 0;

/**
 * 同上
 */
const double NULL_DOUBLE = 0;

/**
 * 同上
 */
const Timestamp NULL_DATE = 0;

/**
 * 一分钟的秒数
 */
const i32 SECONDS_PER_MINUTE = 60;

/**
 * 一小时的秒数
 */
const i32 SECONDS_PER_HOUR = 3600;

/**
 * 一天的秒数
 */
const i32 SECONDS_PER_DAY = 86400;

/**
 * 一周的秒数
 */
const i32 SECONDS_PER_WEEK = 604800;

/**
 * 一个月的秒数
 */
const i32 SECONDS_PER_MONTH = 18144000;

/**
 * 表示实体对象的状态
 *
 * @field ENABLED 表示对象处于正常启用状态
 *
 * @field DISABLED 表示对象被禁用
 *
 * @field DELETED 表示对象已被删除
 */
enum Status {
	ENABLED = 0, DISABLED = 1, DELETED = 2
}



/**
 * 用户类型
 *
 * @field ADMIN 系统管理员
 *
 * @field BUSINESS 商家管理员
 *
 * @field INTERNAL 商家内部用户
 *
 * @field CONSUMER 普通用户
 */
enum UserType {
	ADMIN = 0, BUSINESS = 1, INTERNAL = 2, CONSUMER = 3
}


/**
 * 排序
 */
enum Sort {
	/**
	 * 正序
	 */
	ASC = 0,

	/**
	 * 倒序
	 */
	DESC = 1
}

/**
 * FetchType
 */
enum FetchType {

	/**
	 * 正序
	 */
	ALL = 0,

	/**
	 * LAZY
	 */
	LAZY = 1,

	/**
	 * EAGER
	 */
	EAGER = 2
}


/**
 * 评分类型
 */
enum RatingType{
    /**
     * 味道
     */
    DEFAULT = 0,

    /**
     * 味道
     */
    TASTE = 1,

    /**
     * 环境
     */
     ENVIRONMENT = 2,
    /**
     * 服务
     */
     SERVICE = 3

}


/**
 * 支付状态
 */
enum PayStatus{
    /**
     * 未付款
     */
    NONPAYMENT = 0,

    /**
     * 已付款
     */
    PAYMENT = 1
}


/**
 * 支付类型
 */
enum PayType{
    /**
     * 到店结算
     */
    DEFAULT = 0,

    /**
     * 货到付款
     */
    COD = 1,

    /**
     * 余额付款
     */
     BALANCE = 2,

    /**
     * 支付宝
     */
     ALIPAY = 3,

    /**
     * 财付通
     */
    TENPAY = 4,

    /**
     * 银行汇款/转帐
     */
    BANK = 5,

    /**
     * 银联
     */
     PAYPAL = 6
}


/**
 * 餐桌状态
 */
enum BoardStatus{
    /**
     * 空闲
     */
    DEFAULT = 0,

    /**
     * 正在用餐中
     */
    DINNER = 1,

    /**
     * 预定
     */
     PREDETERMINE = 2,

    /**
     * 禁用
     */
     DISABLE = 3,

    /**
     * 删除
     */
    DELETE = 4
}


/**
 * 餐桌状态
 */
enum OrderStatus{
    /**
     * 未确认
     */
    UNCONFIRMED = 0,

    /**
     * 已确认
     */
    CONFIRMED = 1,

    /**
     * 取消
     */
     CANCEL = 2,

    /**
     * 完成
     */
     COMPLETED = 3
}









































































































/**
 * 异常堆栈对象
 *
 * @field className 发生异常的类
 *
 * @field methodName 发生异常的方法
 *
 * @field fileName 发生异常的文件
 *
 * @field lineNumber 发生异常的行号
 */
struct StackTrace {
	1: string className,
	2: string methodName,
	3: string fileName,
	4: i32 lineNumber
}


/**
 * 通用错误对象
 *
 * @field code 错误代码
 *
 * @field msg 错误消息
 *
 * @field stackTraces 错误堆栈，供调试用
 */
exception AnyException {
	1: optional i32 code = 1,
	2: optional string msg,
	3: optional list<StackTrace> stackTraces
}
