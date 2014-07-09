<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-8-29
  Time: 上午10:38
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>


<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.extend.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/messages_bs_zh.js"></script>

<link rel="stylesheet" href="${ctx}/static/assets/jquery-validation/dist/validate.css" >



<div id="breadcrumbs">
    <ul class="breadcrumb">
        <li>
            <i class="icon-home"></i>
            <a href="<c:url value="/admin"/>">Home</a>
            <span class="divider"><i class="icon-angle-right"></i></span>
        </li>
        <li>
            <a href="<c:url value="/admin/company"/>">Company Information</a>
            <span class="divider"><i class="icon-angle-right"></i></span>
        </li>
        <li>
            <a href="<c:url value="/admin/board/"/>">Board Information</a>
            <span class="divider"><i class="icon-angle-right"></i></span>
        </li>
        <li class="active">
            <c:choose>
                <c:when test="${param.op == null}">add or update</c:when>
                <c:when test="${param.op == 'view'}" >view</c:when>
            </c:choose>
        </li>
    </ul>
</div>


<div class="row-fluid">
    <div class="span12">
        <div class="box">
            <div class="box-title">
                <h3><i class="icon-reorder"></i> Board Information Form</h3>

                <div class="box-tool">
                    <a data-action="collapse" href="#"><i class="icon-chevron-up"></i></a>
                    <a data-action="close" href="#"><i class="icon-remove"></i></a>
                </div>
            </div>

            <div class="box-content">

                <form id="objForm" class="form-horizontal" action="<c:url value="/admin/board/add" />" method="post">
                    <input type="hidden" name="id" value="<c:choose><c:when test="${null == obj}" >0</c:when><c:when test="${null != obj}" >${obj.id}</c:when></c:choose>" />
                    <input type="hidden" name="company.id" value="${obj.company.id}" />

                    <div class="control-group info">
                        <label class="control-label" for="b_name">board name prefix:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="b_name" type="text" name="name" value="${obj.name}" class="span6"
                                       data-rule-required="true" data-rule-minlength="3" data-rule-maxlength="255"/>
                            </div>
                        </div>
                    </div>


                    <div class="control-group info">
                        <label class="control-label" for="b_summary">board summary:</label>

                        <div class="controls">
                            <div class="span12">
                                <textarea id="b_summary" name="summary"  class="span6">${obj.summary}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="b_galleryful">board galleryful:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="b_galleryful" type="text" name="galleryful" value="${obj.galleryful}" class="span6"
                                       data-rule-required="true"  data-rule-digits="true" data-rule-range="1,10" />
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" >board status:</label>

                        <div class="controls">
                            <div class="span12">
                                <c:forEach var="s" items="${status}" >
                                    <label class="radio inline" for="status_${s.value}">${s}</label>
                                    <input id="status_${s.value}"  type="radio" name="boardStatus1" value="${s.value}" <c:if test="${s.value eq 0}">checked</c:if>  />
                                </c:forEach>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <input id="form_submit_btn" type="button" class="btn btn-primary" value="Submit" onclick="form_submit()" />
                        <button type="button" class="btn">Cancel</button>
                    </div>
                </form>
            </div>


        </div>
    </div>

</div>



<script>

    function form_submit(){
        if($("#objForm").valid()){
            $("#objForm").submit();
        }
    }

    $('body').keypress(function(e){
        if(e.ctrlKey && e.which == 13 || e.which == 10) {
            form_submit();
        }
    });

</script>