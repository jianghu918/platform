include "Type.thrift"

namespace csharp Com.Le07.Api.Counter
namespace java com.le07.api.counter
namespace php Counter
namespace js Counter

/**
 * 访问统计服务
 *
 * @tables cs_count
 */
service CounterService {

    /**
     * 增加某个业务对象的访问次数
     * 1. bizKey必须存在
     * 2. 每次新增加一条记录
     *
     * @param bizKey 业务key
     *
     * @param type   访问类型
     *
     * @param owner  所有者
     *
     * @param count  次数
     *
     * @tables cs_count
     */
    oneway void increase(1: string bizKey, 2: i32 type, 3: string owner, 4: i32 count),

    /**
     * 重置某个业务对象的访问次数
     * 1. bizKey必须存在
     * 2. 清空符合条件的记录
     *
     * @param bizKey 业务key
     *
     * @param type   访问类型
     *
     * @param owner  所有者
     *
     * @tables cs_count
     */
    oneway void reset(1: string bizKey, 2: i32 type, 3: string owner),

    /**
     * 获取某个业务对象的访问次数
     *
     * @param bizKey 业务key
     *
     * @param type   访问类型
     *
     * @param owner  所有者
     *
     * @return 次数
     *
     * @tables cs_count
     */
    i32 getCount(1: string bizKey, 2: i32 type, 3: string owner) throws (1: Type.AnyException ex),

    /**
     * 批量获取业务对象的访问次数
     *
     * @param bizKey 业务key
     *
     * @param owners 所有者列表
     *
     * @param type   访问类型
     *
     * @return 次数map
     *
     * @tables cs_count
     */
    map<string, i32> getCountMap(1: string bizKey, 2: i32 type, 3: list<string> owners) throws (1: Type.AnyException ex),

    /**
     * 获取某个业务的热门访问对象
     *
     * @param bizKey    业务key
     *
     * @param type      访问类型
     *
     * @param size      个数
     *
     * @param algorithm 热度统计算法类型
     *
     * @return 热门访问对象
     *
     * @tables cs_count
     */
    list<string> getHotOwner(1: string bizKey, 2: i32 type, 3: i32 size, 4: i32 algorithm) throws (1: Type.AnyException ex),

    /**
     * 获取多个业务的访问趋势图(暂时没实现)
     *
     * @param bizKey    业务key
     *
     * @param type      访问类型
     *
     * @param owners    所有者列表
     *
     * @param startDate 开始时间
     *
     * @param endDate   结束时间
     *
     * @param interval  时间间隔,单位为秒
     *
     * @return 访问趋势图map
     *
     * @tables cs_count
     */
    map<string, list<i32>> getTrendsMap(1: string bizKey, 2: i32 type, 3: list<string> owners, 4: Type.Timestamp startDate, 5: Type.Timestamp endDate, 6: i32 interval) throws (1: Type.AnyException ex)
}