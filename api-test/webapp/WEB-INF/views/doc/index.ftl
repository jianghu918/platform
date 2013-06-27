<html>
<head>
    <title>Api文档</title>
    <meta name="tab" content="doc"/>
</head>
<body>
<div class="row">
    <div class="span3 bs-docs-sidebar">
        <ul class="nav nav-list bs-docs-sidenav">
        <#list pks as pk>
            <li><a href="#${pk.name}"><i class="icon-chevron-right"></i> ${pk.name}</a></li>
        </#list>
        </ul>
    </div>
    <div class="span9">

    <#list pks as pk>
        <section id="${pk.name}">
            <div class="page-header">
                <h3>${pk.name}</h3>
            </div>
            <#if pk.consts?has_content>
                <h4>常量</h4>
                <table class="table table-bordered table-striped">
                    <tr>
                        <th>名称</th>
                        <th>类型</th>
                        <th>值</th>
                        <th>说明</th>
                    </tr>
                    <#list pk.consts as f>
                        <tr>
                            <td>${f.name}</td>
                            <td><span class="t-type" ns="${pk.id}">${f.type?xml!}</span></td>
                            <td>${f.value}</td>
                            <td>${f.desc!}</td>
                        </tr>
                    </#list>
                </table>
            </#if>
            <#if pk.enums?has_content>
                <h4>枚举</h4>
                <ol>
                    <#list pk.enums as enum>
                        <li><h5 id="${enum.id}">${enum.name}</h5>
                            <p style="text-indent: 1em;">${enum.desc!}</p>
                            <table class="table table-bordered table-striped">
                                <tr>
                                    <th>名称</th>
                                    <th>索引号</th>
                                    <th>说明</th>
                                </tr>
                                <#list enum.fields as f>
                                    <tr>
                                        <td>${f.name}</td>
                                        <td>${f.index}</td>
                                        <td>${f.desc!}</td>
                                    </tr>
                                </#list>
                            </table></li>
                    </#list>
                </ol>
            </#if>
            <#if pk.objects?has_content>
                <h4>对象</h4>
                <ol>
                    <#list pk.objects as obj>
                        <li><h5 id="${obj.id}">${obj.name}</h5>
                            <p style="text-indent: 1em;white-space: pre-wrap;">${obj.desc!}</p>
                            <table class="table table-bordered table-striped">
                                <tr>
                                    <th>名称</th>
                                    <th>类型</th>
                                    <th>读写</th>
                                    <th>说明</th>
                                </tr>
                                <#list obj.fields as f>
                                    <tr>
                                        <td>${f.name}</td>
                                        <td><span class="t-type" ns="${pk.id}">${f.type?xml!}</span></td>
                                        <td><#if f.readonly??>只读<#else>--</#if></td>
                                        <td>${f.desc!}</td>
                                    </tr>
                                </#list>
                            </table></li>
                    </#list>
                </ol>
            </#if>
            <#if pk.services?has_content>
                <h4>服务</h4>
                <ol>
                    <#list pk.services as service>
                        <li><h5 id="${service.id}">${service.name}</h5>
                            <p style="text-indent: 1em;white-space: pre-wrap;">${service.desc!}</p>
                            <table class="table table-bordered table-striped table-hover">
                                <tr>
                                    <th>名称</th>
                                    <th>说明</th>
                                    <th style="min-width: 80px;">返回类型</th>
                                </tr>
                                <#list service.methods as method>
                                    <tr>
                                        <td><a href="test/${method.id}">${method.name}</a></td>
                                        <td>${method.desc!}</td>
                                        <td><span class="t-type" ns="${pk.id}">${method.returntype?xml!}</span></td>
                                    </tr>
                                </#list>
                            </table></li>
                    </#list>
                </ol>
            </#if>
        </section>
    </#list>
    </div>
</div>
</body>
</html>
