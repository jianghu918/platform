<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Api Tester - ${_title!}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="${ctx}/static/thirdparty/bootstrap/css/bootstrap.css" rel="stylesheet"/>
    <link href="${ctx}/static/thirdparty/bootstrap/css/bootstrap-responsive.css" rel="stylesheet"/>
    <link href="${ctx}/static/css/main.css" rel="stylesheet"/>
    <script src="${ctx}/static/thirdparty/jquery/jquery.js" type="text/javascript"></script>
    <script src="${ctx}/static/thirdparty/bootstrap/js/bootstrap.js" type="text/javascript"></script>
    <!--[if lt IE 9]>
    <script src="${ctx}/static/thirdparty/bootstrap/js/html5shiv.js" type="text/javascript"></script>
    <![endif]-->
    ${_head}
    <script type="text/javascript">
        var _ctx='${ctx}';
    </script>
</head>

<body data-spy="scroll" data-target=".bs-docs-sidebar">
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <a class="brand" href="${ctx}">Api Tester</a>
            <div class="nav-collapse collapse">
                <ul class="nav">
                    <li${(_meta.tab=='test')?string(' class="active"','')}><a href="${ctx}/test">Api工具</a></li>
                    <li${(_meta.tab=='doc')?string(' class="active"','')}><a href="${ctx}/doc">api文档</a></li>
                    <li><a href="#">单元测试</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="container">
    ${_body}
</div>
<footer class="footer">
    <div class="container">
        <p class="pull-right"><a href="#">Top</a></p>
        <p>&copy; le07</p>
    </div>
</footer>
<script src="${ctx}/static/js/main.js" type="text/javascript"></script>
</body>
</html>
