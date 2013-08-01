namespace csharp Com.le07.Api.Identity
namespace java com.le07.api.identity
namespace php Identity
namespace js Identity

include "Type.thrift"



/**
 * 用户
 */
struct User{
    /**
     * ID
     *
     * @readonly
     */
	1: optional i64 id,

    /**
     * name
     */
	2: optional string name,

	/**
     * password
     */
    3: optional string password,

	/**
     * user type
     */
    4: optional Type.UserType type,

	/**
     * phone
     */
    5: optional string phone,

	/**
     * age
     */
    6: optional i64 age,

	/**
     * sex
     */
    7: optional i64 sex,

	/**
     * city
     */
    8: optional string city,

	/**
     * qq
     */
    10: optional string qq,

    /**
     * msn
     */
    11: optional string msn,

    /**
     * weixin
     */
    12: optional string weixin,

    /**
     * blog
     */
    13: optional string blog,

    /**
     * createTime
     *
     * @readonly
     */
    14: optional Type.Timestamp createAt,

    /**
     * UpdateTime
     */
    15: optional Type.Timestamp updateAt,

    /**
     * remark
     */
    16: optional string remark,

    /**
     * status
     */
    17: optional Type.Status status
}


/**
 * 用户分页信息
 */
struct PageUser{

    /**
     * 总数
     */
    1: i64 total,

    /**
     * 用户信息 items
     */
    2: list<User> items
}



/**
 * 用户查询对象
 */
struct Query{

    1: string name,

    2: string phone,

    3: string city


}

/**
 * 角色权限
 */
struct Role{
    /**
     * ID
     *
     * @readonly
     */
    1: optional i64 id,

    /**
     * 权限
     */
    2: optional i64 userId,

    /**
     * 权限
     */
    3: optional string authority
}



#####################SERVICE###################################################################################################
/**
 * 用户身份服务
 */
service IdentityService{


    /**
     * 创建一个用户
     */
    User createUser(
         /**
          * 用户
          */
         1: User user
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 根据用户名密码来创建一个用户
     */
    User createUserByNameAndPwd(
         /**
          * 用户名
          */
         1: string name,

         /**
          * 密码
          */
         2: string password
    )throws (
         1: Type.AnyException ex
    ),




    /**
     * 修改用户附加信息（除用户名密码外）
     */
    void updateUserAttr(
         /**
          * 用户
          */
         1: User user
    )throws (
         1: Type.AnyException ex
    ),




    /**
     * 修改用户密码
     */
    void updateUserPassword(
         /**
          * 用户名
          */
         1: string name,

         /**
          * 原始密码
          */
         2: string oldPassword,

         /**
          * 新密码
          */
         3: string newPassword,
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 修改用户状态
     */
    void updateUserStatus(
         /**
          * userId
          */
         1: i64 userId,

         /**
          * 状态
          */
         2: Type.Status status,
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 批量修改用户状态
     */
    void batchUpdateUserStatus(
         /**
          * userIds
          */
         1: set<i64> userIds,

         /**
          * 状态
          */
         2: Type.Status status,
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 删除一个用户,这里是物理删除
     * 如不需要物理删除，请调用updateStatus方法，修改状态为DELETE
     */
    void removeUser(
         /**
          * userId
          */
         1: i64 userId
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 删除一个用户,这里是物理删除
     * 如不需要物理删除，请调用updateStatus方法，修改状态为DELETE
     */
    void batchRemoveUser(
         /**
          * userIds
          */
         1: set<i64> userIds
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 根据用户名，密码查找用户对象，成功返回用户对象, 失败返回为空
     */
    User getUserByNameAndPwd(
         /**
          * name
          */
         1: string name,

         /**
          * 密码
          */
         2: string password
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 根据id获取用户
     */
    User getUserById(
         /**
          * userId
          */
         1: i64 userId
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 根据ids获取用户
     */
    map<i64,User> batchGetUserByIds(
         /**
          * userIds
          */
         1: set<i64> userIds
    )throws (
         1: Type.AnyException ex
    ),


    /**
     * 批量获取用户
     */
    PageUser listUsers(
        /**
         * 用户查询对象
         */
        1: Query query,

        /**
         * 偏移量
         */
        2: i64 offset,

        /**
         * size
         */
        3: i64 size
    )throws (
        1: Type.AnyException ex
    ),



    ###########################   ROLE ##########################################

    /**
     * 给用户添加权限, 不重复添加
     */
    Role createUserRole(
         /**
          * 用户Id
          */
         1: i64 userId,

         /**
          * 权限
          */
         2: string authority
    )throws (
         1: Type.AnyException ex
    ),



    /**
     * 修改用户角色
     */
    void updateUserRole(
         /**
          * 角色ID
          */
         1: i64 roleId,

         /**
          * 权限
          */
         2: string authority
    )throws (
         1: Type.AnyException ex
    ),


    list<Role> getUserRoles(
        /**
         * 用户Id
         */
        1: i64 userId
    )throws (
         1: Type.AnyException ex
    ),

}