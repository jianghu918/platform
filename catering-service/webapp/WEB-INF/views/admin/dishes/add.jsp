<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-8-23
  Time: 下午2:04
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.extend.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/messages_bs_zh.js"></script>
<link rel="stylesheet" href="${ctx}/static/assets/jquery-validation/dist/validate.css" >



<div class="row-fluid">
    <div class="span12">
        <div class="box">
            <div class="box-title">
                <h3><i class="icon-reorder"></i> Dishes Information Form</h3>

                <div class="box-tool">
                    <a data-action="collapse" href="#"><i class="icon-chevron-up"></i></a>
                    <a data-action="close" href="#"><i class="icon-remove"></i></a>
                </div>
            </div>

                <form id="objForm" class="form-horizontal" action="<c:url value="/admin/dishes/add" />" method="post">
                    <input type="hidden" name="id" value="<c:choose><c:when test="${null == obj}" >0</c:when><c:when test="${null != obj}" >${obj.id}</c:when></c:choose>" />
                    <input type="hidden" name="company.id" value="${companyId}"/>
                    <br/>
                    <div class="control-group info">
                        <label class="control-label" for="classificationId">dishes classification:</label>

                        <div class="controls">
                            <div class="span12">
                                <span class="label label-large label-info"><i class="icon-tag" id="_classificationId">请选择分类</i></span>
                                <input id="classificationId" type="hidden" name="classificationId" class="span4" value="${obj.classificationId}" />
                                <a class="btn btn-circle show-tooltip" title="" href="<c:url value="/common/classification/add/"/>${companyId}?ajax=1&op=view&s=classificationId"
                                   data-toggle="modal" data-target="#myModal" ><i class="icon-plus"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="o_unitId">dishes unit:</label>

                        <div class="controls">
                            <div class="span12">
                                 <select id="o_unitId" name="unitId">
                                     <option value="-1">select</option>
                                     <c:forEach items="${units.content}" var="u">
                                         <option value="${u.id}" <c:if test="${u.id == obj.unitId}" >selected="selected"</c:if>>${u.name}</option>
                                     </c:forEach>
                                 </select>
                            </div>
                        </div>
                    </div>



                    <div class="control-group info">
                        <label class="control-label" for="o_name">dishes name:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="o_name" type="text" name="name" value="${obj.name}" class="span6"
                                       data-rule-required="true" data-rule-minlength="3" data-rule-maxlength="255"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="o_summary">dishes summary:</label>

                        <div class="controls">
                            <div class="span12">
                                <textarea id="o_summary" name="summary" rows="5" class="span6">${obj.summary}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="o_price">dishes price:</label>

                        <div class="controls">
                            <div class="span12 input-prepend">
                                <span class="add-on">$</span>
                                <input id="o_price" type="text" name="price" value="${obj.price}" class="span2"
                                       data-rule-required="true"  data-rule-range="1,1000" />
                            </div>
                        </div>
                    </div>


                    <div class="control-group info">
                        <label class="control-label" >dishes thumbnail:</label>

                        <div class="controls">
                            <div class="span12">
                                <jsp:include page="/common/component/editor/upload" >
                                    <jsp:param name="_name" value="thumbnail" />
                                    <jsp:param name="_value" value="${obj.thumbnail}" />
                                </jsp:include>
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

    function form_submit()
    {
        <c:if test="${param.op == null}">
        if($("#objForm").valid())
        {
            UTL.save('objForm',{
                url:'<c:url value="/admin/dishes/add" />',
                method:'post',
                callbackUrl:'<c:url value="/admin/dishes/" />${companyId}'
            });
        }
        </c:if>
    }


    $(document).ready(function(){
        $("#objForm").validate({
            debug : true,
            rules:{
                classificationId:{
                    required:true

                }
            },
            //将错误信息添加当前元素的父结点后面
            errorPlacement: function (error, element){
                if(element.is(':checkbox'))
                    error.appendTo(element.parent().parent());
                else
                    error.insertAfter(element);
            }
        });









        if('${param.op}' == 'view'){
            $("#_classificationId").text(' ${classification.name}');
        }

    });

</script>
