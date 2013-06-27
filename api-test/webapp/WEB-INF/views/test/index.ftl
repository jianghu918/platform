<html>
<head>
    <title>服务列表</title>
    <meta name="tab" content="test"/>
</head>
<body>
<div class="row">
    <div class="span3 bs-docs-sidebar">
        <ul class="nav nav-list bs-docs-sidenav">
        <#list services as service>
            <li><a href="#${service.name}"><i class="icon-chevron-right"></i> ${service.name}(${service.label!})</a></li>
        </#list>
        </ul>
    </div>
    <div class="span9">

    <#list services as service>
        <section id="${service.name}">
            <div class="page-header">
                <h4>${service.name}(${service.label!})</h4>
            </div>
            <p style="white-space: pre-wrap;">${service.desc!}</p>
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
                        <td><span class="t-type" ns="${service.parent.id}">${method.returntype?xml!}</span></td>
                    </tr>
                </#list>
            </table>
        </section>
    </#list>
    </div>
</div>
</body>
</html>
