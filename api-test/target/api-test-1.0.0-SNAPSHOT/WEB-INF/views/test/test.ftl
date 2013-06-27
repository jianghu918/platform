<html>
<head>
    <title>服务测试</title>
    <meta name="tab" content="test"/>
    <link href="${ctx}/static/thirdparty/prettify/prettify.css" rel="stylesheet"/>
    <script src="${ctx}/static/js/thrift.js" type="text/javascript"></script>
    <script src="${ctx}/static/thirdparty/prettify/prettify.js" type="text/javascript"></script>
    <script src="${ctx}/static/thirdparty/beautify/beautify.js" type="text/javascript"></script>
    <script src="${ctx}/static/thirdparty/jquery/jquery.json.js" type="text/javascript"></script>
    <script src="${ctx}/static/api/Type_types.js" type="text/javascript"></script>
    <#list services as service><@thriftjs service=service/></#list>
</head>
<body>
<div class="row t-test-form">
    <ul class="nav nav-pills service-nav">
        <li class="dropdown">
            <a class="dropdown-toggle" role="button" data-toggle="dropdown" href="#">${service.name}<b class="caret"></b></a>
            <ul class="dropdown-menu" role="menu">
            <#list services as service>
                <#if service.methods?has_content>
                    <li><a tabindex="-1" href="${service.methods[0].id}">${service.name}</a></li>
                </#if>
            </#list>
            </ul>
        </li>
        <li>
            <div class="divider">/</div>
        </li>
        <li class="dropdown">
            <a class="dropdown-toggle" role="button" data-toggle="dropdown" href="#">${method.name}<b class="caret"></b></a>
            <ul class="dropdown-menu" role="menu">
            <#list service.methods as method>
                <li><a tabindex="-1" href="${method.id}">${method.name}</a></li>
            </#list>
            </ul>
        </li>
    </ul>
    <h3>${method.name}(${method.label!})</h3>
    <fieldset class="t-info">
        <legend>说明</legend>
        <div style="white-space: pre-wrap;">${method.desc!}</div>
    </fieldset>
    <fieldset class="t-info">
        <legend>地址</legend>
        <a href="${service.url!}" target="_blank">${service.url!}</a>
    </fieldset>
    <#if method.tables??>
        <fieldset class="t-info">
            <legend>相关表</legend>
        ${method.tables}
        </fieldset>
    <#elseif service.tables??>
        <fieldset class="t-info">
            <legend>相关表</legend>
        ${service.tables}
        </fieldset>
    </#if>
	<#--    
	<fieldset class="t-info">
        <legend>需要登录</legend>
        <button type="button" class="btn btn-${method.needLogin???string("danger","primary")}">${method.needLogin???string("是","否")}</button>
    </fieldset>
    -->
    <fieldset class="t-info">
        <legend>返回类型</legend>
        <span class="t-type" ns="${pk.id}">${method.returntype?xml!}</span>
        <p style="padding-top: 3px;">${method.return!}</p>
    </fieldset>
    <#if method.exs?has_content>
        <fieldset class="t-info">
            <legend>异常代码类型</legend>
            <ol>
                <#list method.exs as ex>
                    <#list ex.doc.tags?keys as key>
                        <li><code>${key}</code> ${ex.doc.tags[key]}</li>
                    </#list>
                </#list>
            </ol>
        </fieldset>
    </#if>
    <form>
        <fieldset class="t-info">
            <legend>参数列表</legend>
            <table class="table table-bordered table-striped table-hover">
                <tr>
                    <th style="width: 50px;">名称</th>
                    <th style="width: 150px;">说明</th>
                    <th style="width: 150px;">类型</th>
                    <th>值</th>
                </tr>
            <#list method.args as arg>
                <tr>
                    <td>${arg.name}</td>
                    <td>${arg.desc!}</td>
                    <td><span class="t-type" ns="${pk.id}">${arg.type?xml!}</span></td>
                    <td>
                        <#if vhs[arg.id]??>
                            <div class="dropdown pull-right" style="margin-right: 5px;">
                                <a class="dropdown-toggle" role="button" data-toggle="dropdown" href="#"><b class="caret"></b></a>
                                <ul class="dropdown-menu" role="menu">
                                    <#list vhs[arg.id] as v>
                                        <li><a tabindex="-1" href="javascript:void(0)" class="t-va" tid="a-${arg.name}"><#if v?length gt 60>${v?substring(0,60)}...<#else>${v}</#if></a><textarea class="hide">${v}</textarea></li>
                                    </#list>
                                        <li><a tabindex="-1" href="javascript:void(0)" class="t-va" tid="a-${arg.name}"><#if arg.value?? && arg.value?length gt 60>默认 ${arg.value?substring(0,60)}...<#else>默认 ${arg.value!}</#if></a><textarea class="hide">${arg.value!}</textarea></li>
                                </ul>
                            </div>
                        </#if>
                        <textarea id="a-${arg.name}" name="${arg.name}" rows="${arg.primitiveType?string("1","2")}" placeholder="${arg.desc!}" class="t-value"><#if vhs[arg.id]??>${vhs[arg.id][0]}<#else>${arg.value!}</#if></textarea>
                    </td>
                </tr>
            </#list>
            </table>
        </fieldset>
        <p style="text-align: right;">
            <button class="btn btn-large" type="button" onclick="this.form.reset();">&nbsp;重置&nbsp;</button>
            <button class="btn btn-large btn-primary" type="button" onclick="doTest(this.form);">&nbsp;&nbsp;&nbsp;&nbsp;执行&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </p>
        <pre class="prettyprint linenums lang-js" id="t-result" style="display: none;"></pre>
    </form>
</div>
<script type="text/javascript">
    var typesMap={<#list method.args as arg>${(arg_index>0)?string(", ","")}${arg.name}:'${arg.type}'</#list>};
    function doTest(form) {
        var client = new ${service.id}Client(new Thrift.Protocol(new Thrift.Transport("${service.url}?_json=true")));
        var args = [];
        var ret, ok = true;
        try {
            for (var name in typesMap) {
                args.push(convertValue(name, form[name].value, typesMap[name], '${pk.id}'));
            }
            ret = client.${method.name}.apply(client, args);
        } catch (e) {
            ret = e;
            if (typeof(e) == 'string' && ret.lastIndexOf('unknown result') == ret.length - 14) {
                ret = 'null';
            }else{
                ok = false;
            }
        }
        $('#t-result').show();
        if (ok) {
            $('#t-result').removeClass('t-error');
            $('#t-result').addClass('t-ok');
            $.post('${ctx}/test/save?id=${method.id}',$(form).serialize());
        } else {
            $('#t-result').removeClass('t-ok');
            $('#t-result').addClass('t-error');
        }
        $('#t-result').html(js_beautify(typeof(ret) == 'undefined' ? 'ok' : jQuery.toJSON(ret)));
        prettyPrint();
    }
    function convertValue(name, value, type, ns) {
        switch (type) {
            case 'bool':
                return value.toLowerCase() == 'true';
            case 'Boolean':
            case 'byte':
            case 'i16':
            case 'i32':
            case 'i64':
            case 'Type.Timestamp':
                return parseInt(value);
            case  'double':
                return parseFloat(value);
            case  'string':
                return value;
        }
        if (!value) {
            throw '参数 ' + name + ' 不能为空';
        }
        try {
            return eval('(' + value + ')');
        } catch (e) {
            throw '参数 ' + name + '不是有效的json字符串,'+ e.message;
        }
    }
</script>
</body>
</html>
