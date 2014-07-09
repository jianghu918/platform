<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory" %>
<%response.setStatus(200);%>

<%
	Throwable ex = null;
	if (exception != null)
		ex = exception;
	if (request.getAttribute("javax.servlet.error.exception") != null)
		ex = (Throwable) request.getAttribute("javax.servlet.error.exception");

	//记录日志
	Logger logger = LoggerFactory.getLogger("500.jsp");
	logger.error(ex.getMessage(), ex);
%>

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
        <h5>Something Went Wrong<span>500</span></h5>
        <p>But we are working  on it!<br/>Please come back in a while.</p>

        <hr/>
        <div>
            <%= ex.getMessage() %>
            <h4></h4>
            <% ex.printStackTrace(); %>

        </div>
        <hr/>
        <p class="clearfix">
            <a href="javascript:history.back()" class="pull-left">← Back to previous page</a>
            <a href="<c:url value="/"/>" class="pull-right">Go to dashboard</a>
        </p>
    </div>
</body>
</html>
