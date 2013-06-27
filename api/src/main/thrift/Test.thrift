namespace csharp Com.le07.Api.Test
namespace java com.le07.api.test
namespace php Test
namespace js Test

include "Type.thrift"

struct TestEntity
{
    /**
     * ID
     *
     * @readonly
     */
	1: optional i64 id,

	/**
     * 名字
     *
     */
    2: optional string name
}

/**
 * 这是一个测试服务
 *
 * 测试服务简要描述
 */
service TestService
{

     /**
      * 具体方法简要描述说明
      */
     list<TestEntity> lists(
        /**
         * 偏移量
         */
        1: i64 offset,

        /**
         * 抓取数量
         */
        2: i64 size
     	
     )throws (1: Type.AnyException ex)
     
     
}