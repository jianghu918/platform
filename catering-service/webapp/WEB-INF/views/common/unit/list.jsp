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
                <h3><i class="icon-table"></i> Unit Panel</h3>

                <div class="box-tool">
                    <a data-action="collapse" href="#"><i class="icon-chevron-up"></i></a>
                    <a data-action="close" href="#"><i class="icon-remove"></i></a>
                </div>
            </div>


            <div class="box-content">
                <div class="btn-toolbar pull-right">
                    <div class="btn-group">
                        <a class="btn btn-circle show-tooltip" title="" href="<c:url value="/common/unit/add"/>?ajax=1"
                           data-toggle="modal" data-target="#myModal" ><i class="icon-plus"></i></a>
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Edit selected">
                            <i class="icon-edit"></i></a>
                        <a class="btn btn-circle show-tooltip" title="" href="#"
                           data-original-title="Delete selected">
                            <i class="icon-trash"></i></a>
                    </div>
                    <div class="btn-group">
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Print">
                            <i class="icon-print"></i></a>
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Export to PDF">
                            <i class="icon-file-text-alt"></i></a>
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Export to Exel">
                            <i class="icon-table"></i></a>
                    </div>
                    <div class="btn-group">
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Refresh">
                            <i class="icon-repeat"></i></a>
                    </div>
                </div>


                <table class="table table-advance">
                    <thead>
                    <tr>
                        <th style="width:18px"><input type="checkbox"></th>
                        <th>name</th>
                        <th>status</th>
                        <th style="width:100px">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    <c:forEach items="${pages.content}" var="d" varStatus="s">
                        <tr class="table-flag-blue" id="tr_${d.id}">
                            <td><input type="checkbox" value="${d.id}"></td>
                            <td>${d.name}</td>
                            <td>
                            <span class="label <c:choose><c:when test="${status[0].value == d.status}">label-success</c:when>
                            <c:when test="${status[2].value == d.status}">label-important</c:when></c:choose>">
                            ${status[d.status]}
                            </span>
                            </td>
                            <td>
                                <div class="btn-group">
                                    <a class="btn btn-primary show-tooltip" title="" data-toggle="modal" data-target="#myModal"
                                       href="<c:url value="/common/unit/get/"/>${d.id}?ajax=1" data-original-title="Edit">
                                        <i class="icon-edit"></i></a>
                                    <a class="btn btn-danger show-tooltip" msg="Delete OK!" title=""
                                       href="javascript:UTL.del('<c:url value="/common/unit/del/${d.id}" />' ,'${d.id}')"
                                       data-original-title="Delete"><i class="icon-trash"></i></a>
                                </div>
                            </td>
                        </tr>
                    </c:forEach>

                    <c:if test="${pages.totalElements eq 0}">
                        <tr class="table-flag ">
                            <td colspan="6" class="text-center" style="color: indianred">无记录</td>
                        </tr>
                    </c:if>
                    </tbody>
                </table>

                <tags:pagination page="${pages}" paginationSize="10"/>

            </div>
        </div>
    </div>
</div>

