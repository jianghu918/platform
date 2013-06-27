include "Type.thrift"

namespace csharp com.le07.Api.App
namespace java com.le07.api.app
namespace php App
namespace js App



/**
 * 表示一个需要公用服务支持的应用,包含多个业务
 */
struct App {
	/**
	 * 应用的编号
	 *
	 * @readonly
	 */
	1: optional i32 id,

	/**
	 * 应用的key,必须唯一
	 */
	2: optional string key,

	/**
	 * 应用的名称
	 */
	3: optional string name,

	/**
	 * 应用的状态
	 */
	4: optional Type.Status status
}

/**
 * 表示一个需要公用服务支持的业务,多个业务归属于一个应用
 */
struct Biz {
	/**
	 * 业务的编号
	 *
	 * @readonly
	 */
	1: optional i32 id,

	/**
	 * 业务所属应用的编号
	 */
	2: optional i32 appId,

	/**
	 * 业务的key,必须唯一
	 */
	3: optional string key,

	/**
	 * 业务的名称
	 */
	4: optional string name,

	/**
	 * 业务的状态
	 */
	5: optional Type.Status status
}

/**
 * 表示一个业务配置
 */
struct BizConfig {
	/**
	 * 业务的编号
	 *
	 * @readonly
	 */
	1: optional i32 bizId,

	/**
	 * 业务的key
	 *
	 * @readonly
	 */
	2: optional string bizKey,

	/**
	 * 业务的名称
	 *
	 * @readonly
	 */
	3: optional string bizName,

	/**
	 * 配置key
	 *
	 * @readonly
	 */
	4: optional string configKey,

	/**
	 * 配置值
	 */
	5: optional string configValue
}

/**
 * 应用管理服务
 *
 * @tables cs_app, cs_biz
 */
service AppService {
	/**
	 * 保存一个应用
	 * 1. 如果app有设置id,则更新. 没有设置，则新增。
	 * 2. 保存在cs_app表中
	 *
	 * @param app 待保存的应用
	 *
	 * @return 包含id的应用
	 *
	 * @tables cs_app
	 */
	App saveApp(1: App app) throws (1: Type.AnyException ex),

	/**
	 * 删除多个应用
	 * 1. 实际表表中的记录是修改状态为DELETED，不是物理删除
	 * @param ids 应用id列表
	 *
	 * @tables cs_app
	 */
	void removeApps(1: list<i32> ids) throws (1: Type.AnyException ex),

	/**
	 * 获取一个应用信息
	 * 1.如果记录的状态为DELETED，则会认为不存在
	 * @param id 应用id
	 *
	 * @return 应用
	 *
	 * @tables cs_app
	 */
	App getApp(1: i32 id) throws (1: Type.AnyException ex),

	/**
	 * 获取应用列表
	 * 1.如果记录的状态为DELETED，则会认为不存在
	 * @return 应用列表
	 *
	 * @tables cs_app
	 */
	list<App> getApps() throws (1: Type.AnyException ex),

	/**
	 * 保存一个业务
	 *　1. 如果id设置了，则更新。　没有设置则新增
	 *　2. 保存记录在cs_biz表中
	 *
	 * @param biz 待保存的业务
	 *
	 * @return 业务
	 *
	 * @tables cs_biz
	 */
	Biz saveBiz(1: Biz biz) throws (1: Type.AnyException ex),

	/**
	 * 删除多个业务
	 * 1. 修改数据库中状态为DELETED，不是物理删除
	 * @param ids 业务id列表
	 *
	 * @tables cs_biz
	 */
	void removeBizs(1: list<i32> ids) throws (1: Type.AnyException ex),

	/**
	 * 获取一个业务
	 * 1. 如果库中的记录为DELETED，则会认为不存在
	 *
	 * @param id 业务id
	 *
	 * @return 业务
	 *
	 * @tables cs_biz
	 */
	Biz getBiz(1: i32 id) throws (1: Type.AnyException ex),

	/**
	 * 获取业务列表
	 *　1. 如果库中的记录为DELETED，则会认为不存在
	 *
	 * @return 业务列表
	 *
	 * @tables cs_biz
	 */
	list<Biz> getBizs() throws (1: Type.AnyException ex),

	/**
	 * 获取某个应用的业务列表
	 *
	 * @param id 应用id
	 *
	 * @return 业务列表
	 *
	 * @tables cs_biz
	 */
	list<Biz> getAppBizs(1: i32 appId) throws (1: Type.AnyException ex)
}

/**
 * 业务配置服务
 *
 * @tables cs_app
 *		   cs_app_attr
 *		   cs_biz
 *		   cs_biz_attr
 */
service BizConfigService {
	/**
	 * 根据业务key获取业务配置对象
	 *
	 * @param bizKey    业务key
	 * @param configKey 配置key
	 * @return 业务配置对象
	 *
	 * @tables cs_biz, cs_biz_attr
	 */
	BizConfig getBizConfig(1: string bizKey, 2: string configKey) throws (1: Type.AnyException ex),

	/**
	 * 根据业务id获取业务配置对象
	 *
	 * @param bizId     业务id
	 * @param configKey 配置key
	 * @return 业务配置对象
	 *
	 * @tables cs_biz, cs_biz_attr
	 */
	BizConfig getBizConfigById(1: i32 bizId, 2: string configKey) throws (1: Type.AnyException ex),

	/**
	 * 保存一个业务配置
	 * 1. 如果config.getValue()值为__del__, 则会移除这个属性
	 *
	 * @param bizConfig 业务配置对象
	 *
	 * @tables cs_biz, cs_biz_attr
	 */
	void saveBizConfig(1: BizConfig bizConfig) throws (1: Type.AnyException ex),

	/**
	 * 获取已配置的所有业务配置对象列表
	 *
	 * @param configKey 配置key
	 * @return 业务配置对象列表
	 *
	 * @tables cs_biz, cs_biz_attr
	 */
	list<BizConfig> getBizConfigs(1: string configKey) throws (1: Type.AnyException ex)

	i64 getBizId(1:string bizKey) throws (1: Type.AnyException ex)
}