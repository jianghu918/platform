<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="assets" value="${ctx}/static/assets" />
<%response.setStatus(200);%>




<!DOCTYPE html>
<!--[if lt IE 7]>  <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Catering Admin</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <!--base css styles-->
    <link rel="stylesheet" href="${ctx}/static/assets/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="${ctx}/static/assets/bootstrap/bootstrap-responsive.min.css">
    <link rel="stylesheet" href="${ctx}/static/assets/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="${ctx}/static/assets/normalize/normalize.css">
    <!--page specific css styles-->

    <!--flaty css styles-->
    <link rel="stylesheet" href="${ctx}/static/css/flaty.css">
    <link rel="stylesheet" href="${ctx}/static/css/flaty-responsive.css">





</head>

<body class="error-page">
<div class="error-wrapper">
    <h4>Page Not Found<span>404</span></h4>
    <p>Oops! Sorry, that page couldn't be found.<br/>Is there a typo in the url? Or try the search bar below.</p>
    <br/>
    <form action="index.html" method="post">
        <div class="control-group">
            <div class="input-append">
                <input type="text" placeholder="Search a site ..." class="input-block-level" />
                <button class="btn btn-primary" type="submit"><i class="icon-search"></i></button>
            </div>
        </div>
    </form>
    <hr/>
    <p class="clearfix">
        <a href="javascript:history.back()" class="pull-left">← Back to previous page</a>
        <a href="<c:url value="/"/>" class="pull-right">Go to dashboard</a>
    </p>
</div>
</body>
</html>