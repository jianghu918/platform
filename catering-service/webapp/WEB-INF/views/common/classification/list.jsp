<%--
  Created by IntelliJ IDEA.
  User: 虎
  Date: 13-8-3
  Time: 下午1:25
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>






<div class="row-fluid">
    <div class="span12">
        <div class="box">
            <div class="box-title">
                <h3><i class="icon-table"></i> Classification Panel</h3>

                <div class="box-tool">
                    <a data-action="collapse" href="#"><i class="icon-chevron-up"></i></a>
                    <a data-action="close" href="#"><i class="icon-remove"></i></a>
                </div>
            </div>


            <div class="box-content">


                <jsp:include page="/common/classification/add/${companyId}?ajax=1"></jsp:include>


            </div>
        </div>
    </div>
</div>

