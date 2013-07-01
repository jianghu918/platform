namespace csharp Com.le07.Api.Standard
namespace java com.le07.api.standard
namespace php Standard
namespace js Standard

include "Type.thrift"


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




