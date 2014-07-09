<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-8-23
  Time: 下午2:04
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>




<div class="row-fluid">
    <div class="span12">
        <div class="box">
            <div class="box-title">
                <h3><i class="icon-table"></i> Company Panel</h3>

                <div class="box-tool">
                    <a data-action="collapse" href="#"><i class="icon-chevron-up"></i></a>
                    <a data-action="close" href="#"><i class="icon-remove"></i></a>
                </div>
            </div>
            <div class="box-content">
                <div class="btn-toolbar pull-right">
                    <div class="btn-group">
                        <a class="btn btn-circle show-tooltip" title="" href="<c:url value="/admin/dishes/add/" />${companyId}" data-original-title="Add new record"><i
                                class="icon-plus"></i></a>
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Edit selected"><i
                                class="icon-edit"></i></a>
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Delete selected"><i
                                class="icon-trash"></i></a>
                    </div>
                    <div class="btn-group">
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Print"><i class="icon-print"></i></a>
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Export to PDF"><i
                                class="icon-file-text-alt"></i></a>
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Export to Exel"><i
                                class="icon-table"></i></a>
                    </div>
                    <div class="btn-group">
                        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Refresh"><i
                                class="icon-repeat"></i></a>
                    </div>
                </div>
                <table class="table table-advance">
                    <thead>
                    <tr>
                        <th style="width:18px"><input type="checkbox"></th>
                        <th>name</th>
                        <th>展示</th>
                        <th>summary</th>
                        <th>价格</th>
                        <th style="width:100px">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    <c:forEach items="${pages.content}" var="d" varStatus="s">
                        <tr class="table-flag-blue" id="tr_${d.id}">
                            <td><input type="checkbox" value="${d.id}"></td>
                            <td>${d.name}</td>
                            <td>
                                <a rel=sexylightbox[group0] title="${d.name}" href="<c:if test="${!empty d.thumbnail}">${d.thumbnail}</c:if><c:if test="${empty d.thumbnail}">/ctr/attached/default/default.jpg</c:if>" >
                                    <img class="img-polaroid" alt="${d.name}"  src="<c:if test="${!empty d.thumbnail}">${d.thumbnail}</c:if><c:if test="${empty d.thumbnail}">/ctr/attached/default/default.jpg</c:if>"  style="width: 100px; height: 60px;" onerror="/ctr/attached/default/default.jpg" />
                                </a>
                            </td>
                            <td>${d.summary}</td>
                            <td><span class="label label-success">${d.price}</span></td>
                            <td>
                                <div class="btn-group">
                                    <a class="btn btn-lime  show-tooltip" title="" href="<c:url value="/admin/dishes/get/" />${companyId}/${d.id}?op=view" data-original-title="View"><i
                                            class="icon-zoom-in"></i></a>
                                    <a class="btn btn-primary show-tooltip" title="" href="<c:url value="/admin/dishes/get/" />${companyId}/${d.id}" data-original-title="Edit"><i
                                            class="icon-edit"></i></a>
                                    <a class="btn btn-danger show-tooltip" msg="Delete OK!" title="" href="javascript:UTL.del('<c:url value="/admin/dishes/del/" />' ,'${d.id}')" data-original-title="Delete"><i
                                            class="icon-trash"></i></a>
                                </div>
                            </td>
                        </tr>
                    </c:forEach>

                    </tbody>
                </table>

                <tags:pagination page="${pages}" paginationSize="10"/>

            </div>
        </div>
    </div>
</div>

<jsp:include page="/common/component/lightBox"></jsp:include>