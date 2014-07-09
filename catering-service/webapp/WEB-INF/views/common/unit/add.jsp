<%--
  Created by IDEA.
  User: 虎
  Date: 13-8-19
  Time: 下午1:25
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>


<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.extend.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/messages_bs_zh.js"></script>

<link rel="stylesheet" href="${ctx}/static/assets/jquery-validation/dist/validate.css" >



<div class="row-fluid">
    <div class="span12">
        <div class="box">
            <div class="box-title">
                <h3><i class="icon-reorder"></i> Unit Information Form</h3>

                <%--<div class="box-tool">
                    <a data-action="collapse" href="#"><i class="icon-chevron-up"></i></a>
                    <a data-action="close" href="#"><i class="icon-remove"></i></a>
                </div>--%>
            </div>

            <div class="box-content">

                <form id="objForm" class="form-horizontal" >
                    <input type="hidden" name="id" value="<c:choose><c:when test="${null == obj}" >0</c:when><c:when test="${null != obj}" >${obj.id}</c:when></c:choose>" />

                    <div class="control-group info">
                        <label class="control-label" for="b_name">unit name:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="b_name" type="text" name="name" value="${obj.name}" class="span6"
                                       data-rule-required="true" data-rule-minlength="1" data-rule-maxlength="10"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" >status:</label>

                        <div class="controls">
                            <div class="span12">
                                    <c:forEach var="d" items="${status}">
                                        <label class="radio inline" for="status_${d.value}">${d}</label>
                                        <input id="status_${d.value}" type="radio" name="status" value="${d.value}"
                                               <c:if test="${empty obj and d.value eq 0}">checked</c:if>
                                               <c:if test="${!empty obj and d.value eq obj.status}">checked</c:if>
                                                />
                                    </c:forEach>
                            </div>
                        </div>
                    </div>


                    <div class="control-group info">
                        <label class="control-label" for="b_remark">remark:</label>

                        <div class="controls">
                            <div class="span12">
                                <textarea id="b_remark" name="remark"  class="span6">${obj.remark}</textarea>
                            </div>
                        </div>
                    </div>

                    

                    <div class="form-actions">
                        <input id="form_submit_btn" type="button" class="btn btn-primary" value="Submit" onclick="form_submit()" />
                        <button type="button" data-dismiss="modal" aria-hidden="true" class="btn">Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    </div>

</div>



<script>

    function form_submit(){
        if($("#objForm").valid()){
           UTL.save('objForm',{
               url:'<c:url value="/common/unit/add" />',
               method:'post'
           });
        }
    }

</script>