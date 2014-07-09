<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="assets" value="${ctx}/static/assets" />

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

    <link rel="shortcut icon" href="${ctx}/static/img/favicon.png">

    <script src="${ctx}/static/assets/modernizr/modernizr-2.6.2.min.js"></script>
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>-->
    <script>window.jQuery || document.write('<script src="${ctx}/static/assets/jquery/jquery-1.10.1.min.js"><\/script>')</script>

    <script src="${ctx}/static/js/comm.js" ></script>

    <script>
        var param = {};
        param.ctx = '<c:url value="/" />';
    </script>

    <sitemesh:head />
</head>

<body>

    <div id="overlay">
        <ul>
            <li class="li1"></li>
            <li class="li2"></li>
            <li class="li3"></li>
            <li class="li4"></li>
            <li class="li5"></li>
            <li class="li6"></li>
        </ul>
    </div>

    <%@ include file="/WEB-INF/layouts/admin/header.jsp"%>
    <!-- 中间内容开始 -->
    <div class="container-fluid" id="main-container">
        <!-- 左边导航  -->
	    <%@ include file="/WEB-INF/layouts/admin/left.jsp"%>

        <!-- 右边 主体内容 -->
        <div id="main-content">
            <div class="page-title">
                <div>
                    <h1><i class="icon-file-alt"></i>Info</h1>
                    <h4>Information</h4>
                </div>
            </div>

            <sitemesh:body />
        </div>
    </div>
    <!-- 中间内容结束 -->

    <%@ include file="/WEB-INF/layouts/admin/footer.jsp"%>


    <script type="text/javascript">
        $(document).ready(function() {
            $("#overlay").delay(100).fadeOut(500);

            var modal_div = '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
                    + '<div class="modal-body"></div>'
                    + '<div class="modal-footer"><a href="#" class="btn" data-dismiss="modal" aria-hidden="true">Close</a>'
                    + '</div></div>';
            $(modal_div).appendTo('body');
            $("#myModal").on('hide', function(){
               $(this).removeData('modal');
            });


            //view
            if('${param.op}' == 'view'){
                $('input').attr('readonly','readonly');
                $('select').attr('disabled','disabled');
                $('textarea').attr('readonly','readonly');
                $(".form-actions").hide();
            }
        });
    </script>
</body>
</html>