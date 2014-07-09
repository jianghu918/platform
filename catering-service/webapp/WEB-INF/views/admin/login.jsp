<%--
  Created by IntelliJ IDEA.
  User: 虎
  Date: 13-8-3
  Time: 下午1:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<%@ page import="org.apache.shiro.authc.ExcessiveAttemptsException"%>
<%@ page import="org.apache.shiro.authc.IncorrectCredentialsException"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />


<!DOCTYPE html>
<!--[if lt IE 7]>  <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Login - Catering Admin</title>
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

    <link rel="shortcut icon" href="${ctx}/static/img/favicon.png">

    <script src="${ctx}/static/assets/modernizr/modernizr-2.6.2.min.js"></script>
</head>
<body class="login-page">
<!--[if lt IE 7]>
<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="../../browsehappy.com/default.htm">upgrade your browser</a> or <a href="../../www.google.com/chromeframe/@redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
<![endif]-->


<div class="login-wrapper">

    <form id="form" action="<c:url value="/login"/>" method="post">
    <%
	String error = (String) request.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
	if(error != null){
	%>
		<div class="alert alert-error input-medium controls">
			<button class="close"  data-dismiss="alert">×</button>登录失败，请重试.
		</div>
	<%
	}
	%>
    
        <h3>Login</h3>
        <hr/>
        <div class="control-group">
            <div class="controls">
                <input type="text" name="username" placeholder="Username" class="input-block-level"
                       data-rule-required="true" data-rule-minlength="5"/>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <input type="password" name="password" placeholder="Password" class="input-block-level"
                       data-rule-required="true" data-rule-minlength="5"/>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <label class="checkbox">
                    <input type="checkbox" name="remember" value="true" /> Remember me
                </label>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <button type="submit" class="btn btn-primary input-block-level">Sign In</button>
            </div>
        </div>
        <hr/>
        <p class="clearfix">
            <a href="#" class="goto-forgot pull-left">Forgot Password?</a>
            <a href="#" class="goto-register pull-right">Sign up now</a>
        </p>
    </form>



    <form id="form-forgot" action="index.html" method="get" class="hide">
        <h3>Get back your password</h3>
        <hr/>
        <div class="control-group">
            <div class="controls">
                <input type="text" placeholder="Email" class="input-block-level" />
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <button type="submit" class="btn btn-primary input-block-level">Recover</button>
            </div>
        </div>
        <hr/>
        <p class="clearfix">
            <a href="#" class="goto-login pull-left">← Back to login form</a>
        </p>
    </form>



    <form id="form-register" action="index.html" method="get" class="hide">
        <h3>Sign up</h3>
        <hr/>
        <div class="control-group">
            <div class="controls">
                <input type="text" placeholder="Email" class="input-block-level" />
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <input type="text" placeholder="Username" class="input-block-level" />
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <input type="password" placeholder="Password" class="input-block-level" />
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <input type="password" placeholder="Repeat Password" class="input-block-level" />
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <label class="checkbox">
                    <input type="checkbox" value="remember" /> I accept the <a href="#">user aggrement</a>
                </label>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <button type="submit" class="btn btn-primary input-block-level">Sign up</button>
            </div>
        </div>
        <hr/>
        <p class="clearfix">
            <a href="#" class="goto-login pull-left">← Back to login form</a>
        </p>
    </form>

</div>


<!--basic scripts-->
<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>-->
<script>window.jQuery || document.write('<script src="${ctx}/static/assets/jquery/jquery-1.10.1.min.js"><\/script>')</script>
<script src="${ctx}/static/assets/bootstrap/bootstrap.min.js"></script>


<script src="${ctx}/static/assets/nicescroll/jquery.nicescroll.min.js"></script>

<!--page specific plugin scripts-->
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/additional-methods.min.js"></script>

<!--flaty scripts-->
<script src="${ctx}/static/js/flaty.js"></script>

<script type="text/javascript">
    function goToForm(form)
    {
        $('.login-wrapper > form:visible').fadeOut(500, function(){
            $('#form-' + form).fadeIn(500);
        });
    }
    $(function() {
        $('.goto-login').click(function(){
            goToForm('login');
        });
        $('.goto-forgot').click(function(){
            goToForm('forgot');
        });
        $('.goto-register').click(function(){
            goToForm('register');
        });
    });
</script>
</body>
</html>

