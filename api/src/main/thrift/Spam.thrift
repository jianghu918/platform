include "Type.thrift"

namespace csharp Com.Le07.Api.Spam
namespace java com.le07.api.spam
namespace php Spam
namespace js Spam

/**
 * 敏感词过滤服务
 */
service SpamService {
    /**
     * 判断字符串中是否包含敏感词
     *
     * @param content 待处理的字符串
     *
     * @return 是否包含敏感词
     */
    bool contains(1: string content) throws (1: Type.AnyException ex),

    /**
     * 判断多个字符串中是否包含敏感词
     *
     * @param contents 待处理的字符串列表
     *
     * @return 是否包含敏感词
     */
    bool containsAny(1: list<string> contents) throws (1: Type.AnyException ex),

    /**
     * 替换字符串中的敏感词为*号
     *
     * @param content 待处理的字符串
     *
     * @return 替换后的字符串
     */
    string replace(1: string content) throws (1: Type.AnyException ex),

    /**
     * 替换字符串中的敏感词为mask字符串
     *
     * @param content 待处理的字符串
     *
     * @param mask 替换成的字符,注意只能有一个字符
     *
     * @return 替换后的字符串
     */
    string replaceWith(1: string content, 2: string mask) throws (
        /**
         * @error 2 非法参数
         */
        1: Type.AnyException ex
    ),

    /**
     * 替换目标contents map中value中的敏感词为*号
     *
     * @param contents 待处理的字符串map
     *
     * @return 返回map, key为输入map的key, value为替换后的value
     */
    map<string, string> batchReplace(1: map<string, string> contents) throws (1: Type.AnyException ex),

    /**
     * 替换目标contents map中value中的敏感词为mask字符串
     *
     * @param contents 待处理的字符串map
     *
     * @param mask 替换成的字符,注意只能有一个字符
     *
     * @return 返回map, key为输入map的key, value为替换后的value
     */
    map<string, string> batchReplaceWith(1: map<string, string> contents, 2: string mask) throws (
        /**
         * @error 2 非法参数
         */
        1: Type.AnyException ex
    )
}