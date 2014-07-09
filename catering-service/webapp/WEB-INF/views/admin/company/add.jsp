<%--
  Created by IDEA.
  User: 虎
  Date: 13-8-3
  Time: 下午1:25
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<link rel="stylesheet" href="${ctx }/static/assets/kindeditor/themes/default/default.css" />
<script charset="utf-8" src="${ctx }/static/assets/kindeditor/kindeditor.js"></script>
<script charset="utf-8" src="${ctx }/static/assets/kindeditor/zh_CN.js"></script>

<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/jquery.validate.extend.js"></script>
<script type="text/javascript" src="${ctx}/static/assets/jquery-validation/dist/messages_bs_zh.js"></script>

<link rel="stylesheet" href="${ctx}/static/assets/jquery-validation/dist/validate.css" >

<script type="text/javascript">
KindEditor.ready(function(K) {
    var editor = K.editor({
        allowFileManager:true,
        afterCreate : function() {
            this.sync();
            this.loadPlugin('autoheight');
        }
    });
	K.create('#c_summary', {
        themeType : 'simple',
        allowFileManager:true,
        autoHeightMode : true,
        <c:if test="${param.op == 'view'}">readonlyMode : true,</c:if>
        afterBlur:function(){
            this.sync();
            this.loadPlugin('autoheight');
        },
		width: '60%',
		items : [
			'bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','link'
		]
	});

    K.create('#c_introduce', {
        themeType : 'simple',
        allowFileManager:true,
        autoHeightMode : true,
        <c:if test="${param.op == 'view'}">readonlyMode : true,</c:if>
        afterBlur:function(){
            this.sync();
            this.loadPlugin('autoheight');
        },
        width: '60%',
        items : [
            'bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','link'
        ]
    });

    K.create('#c_notice', {
        themeType : 'simple',
        allowFileManager:true,
        autoHeightMode : true,
        <c:if test="${param.op == 'view'}">readonlyMode : true,</c:if>
        afterBlur:function(){
            this.sync();
            this.loadPlugin('autoheight');
        },
        width: '60%',
        items : [
            'bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent',
            'insertorderedlist', 'insertunorderedlist','link'
        ]
    });
	
	K.create('#c_remark', {
        themeType : 'simple',
        allowFileManager:true,
        uploadJson:'<c:url value="/common/editor" />',
        fileManagerJson:'<c:url value="/common/editor/fileManager" />',
        autoHeightMode : true,
        <c:if test="${param.op == 'view'}">readonlyMode : true,</c:if>
        afterBlur:function(){
            this.sync();
            this.loadPlugin('autoheight');
        },
		width: '90%',
		items : ['fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
					'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
					'insertunorderedlist', '|', 'emoticons', 'image', 'link', '|', 'baidumap']
	});

    <c:if test="${param.op == null}">
    K("#c_showImg_btn").click(function(){
        editor.loadPlugin('image', function(){
            editor.plugin.imageDialog({
                imageUrl: K("#c_showImg").val(),
                clickFn:function(url, title, width, height, border, align){
                    K("#c_showImg").val(url);
                    $("#c_showImg_img").attr('src', url);
                    $("#c_showImg_img").fadeIn(600);
                    editor.hideDialog();
                }
            });
        });
    });
    </c:if>
});	
</script>


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
                <h3><i class="icon-reorder"></i> Company Information Form</h3>

                <div class="box-tool">
                    <a data-action="collapse" href="#"><i class="icon-chevron-up"></i></a>
                    <a data-action="close" href="#"><i class="icon-remove"></i></a>
                </div>
            </div>


            <div class="box-content">
                <div style="height: 45px;">
                    <div class="btn-toolbar pull-right">
                        <div class="btn-group">
                            <a class="btn btn-circle show-tooltip" title="" href="/ctr/admin/board/add" data-original-title="Add new record"><i class="icon-plus"></i></a>
                            <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Edit selected"><i class="icon-edit"></i></a>
                            <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Delete selected"><i class="icon-trash"></i></a>
                        </div>
                        <div class="btn-group">
                            <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Print"><i class="icon-print"></i></a>
                            <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Export to PDF"><i class="icon-file-text-alt"></i></a>
                            <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Export to Exel"><i class="icon-table"></i></a>
                        </div>
                        <div class="btn-group">
                            <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Refresh"><i class="icon-repeat"></i></a>
                        </div>
                    </div>
                </div>

                <form id="objForm" class="form-horizontal" action="<c:url value="/admin/company/add" />" method="post">
                    <input type="hidden" name="id" value="<c:choose><c:when test="${null == obj}" >0</c:when><c:when test="${null != obj}" >${obj.id}</c:when></c:choose>" />
                    <div class="control-group info">
                        <label class="control-label" for="c_name">company name:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_name" type="text" name="name" value="${obj.name}" class="span6"
                                       data-rule-required="true" data-rule-minlength="3" data-rule-maxlength="255"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_entreeType">菜系:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_entreeType" type="hidden" name="entreeType.id" value="${obj.entreeType.id}"/>
                                <span class="label label-xlarge <c:if test="${!empty obj}">label-success</c:if>" id="_entreeType">
                                    <c:if test="${empty obj}">未选择</c:if>
                                    <c:if test="${!empty obj}">${obj.entreeType.name}</c:if>
                                </span>
                                <jsp:include page="/common/classification/add/0" >
                                    <jsp:param name="show" value="select" />
                                    <jsp:param name="id" value="_entreeType" />
                                </jsp:include>
                            </div>
                        </div>
                    </div>

                    <!-- 富文本 展示更多信息 -->
                    <div class="control-group">
                        <label class="control-label" for="c_introduce">餐厅简介:</label>

                        <div class="controls">
                            <div class="span12">
                                <textarea id="c_introduce" name="introduce" rows="5" class="span6"
                                          data-rule-required="true" data-rule-minlength="3" data-rule-maxlength="2000">${obj.introduce}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_summary">餐厅摘要:</label>

                        <div class="controls">
                            <div class="span12">
                                <textarea id="c_summary" name="summary" rows="5" class="span6"
                                          data-rule-required="true" data-rule-minlength="3" data-rule-maxlength="2000">${obj.summary}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="c_notice">餐厅公告:</label>

                        <div class="controls">
                            <div class="span12">
                                <textarea id="c_notice" name="notice" rows="5" class="span6"
                                          data-rule-required="true" data-rule-minlength="3" data-rule-maxlength="2000">${obj.notice}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_tag">company tag:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_tag" type="text" name="tag" value="${obj.tag}" class="span6" placeholder="多个关键字之间空格隔开"
                                       data-rule-required="true" data-rule-minlength="0" data-rule-maxlength="255"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_area">company area:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="area_value" name="area.id" type="hidden" value="${obj.area.id}" />
                                <select id="c_area" class="span2" data-placeholder="Choose a Category" tabindex="1"
                                        onchange="getAreaByPid(this)">
                                    <option value="-1">Select...</option>
                                    <c:forEach var="area" items="${areas}">
                                        <option value="${area.id}">${area.name}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" >人均消费:</label>

                        <div class="controls">
                            <div class="span12">
                                <input  type="text" name="axfMin" value="${obj.axfMin}" class="span1"
                                       data-rule-required="true" data-rule-range="1, 1000" />
                                <input  type="text" name="axfMax" value="${obj.axfMax}" class="span1"
                                        data-rule-required="true" data-rule-range="1, 1000" />
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" >营业时间:</label>

                        <div class="controls">
                            <div class="span12">
                                <select name="bhBegin" class="span2">
                                <c:forEach begin="0" end="12" varStatus="i">
                                    <option value="${i.index}" <c:if test="${obj.bhBegin == i.index}">selected="selected"</c:if> >AM ${i.index}</option>
                                </c:forEach>
                                </select>

                                <select name="bhEnd" class="span2">
                                    <c:forEach begin="13" end="24" varStatus="i">
                                        <option value="${i.index}" <c:if test="${obj.bhEnd == i.index}">selected="selected"</c:if> >PM ${i.index}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_address">company address:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_address" type="text" name="address" value="${obj.address}"
                                       class="span6"
                                       data-rule-required="true" data-rule-minlength="3" data-rule-maxlength="255"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_contact">company contact:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_contact" type="text" name="contact" value="${obj.contact}"
                                       class="span6"
                                       data-rule-required="true" data-rule-minlength="2" data-rule-maxlength="255"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_phone">company phone:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_phone" type="text" name="phone" value="${obj.phone}" class="span6"
                                       data-rule-required="true" data-rule-mobile="true" />
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="c_qq">company qq:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_qq" type="text" name="qq" value="${obj.qq}" class="span6"
                                       data-rule-minlength="11" data-rule-maxlength="11"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="c_msn">company msn:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_msn" type="text" name="msn" value="${obj.msn}" class="span6"
                                       data-rule-minlength="3" data-rule-maxlength="20"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="c_weixin">company weixin:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_weixin" type="text" name="weixin" value="${obj.weixin}" class="span6"
                                       data-rule-minlength="3" data-rule-maxlength="255"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="c_weibo">company weibo:</label>

                        <div class="controls">
                            <div class="span12">
                                <input id="c_weibo" type="text" name="weibo" value="${obj.weibo}" class="span6"
                                       data-rule-minlength="3" data-rule-maxlength="255"/>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="c_remark">company remark:</label>

                        <div class="controls">
                            <div class="span12">
                                <textarea id="c_remark" name="remark" rows="5" class="span6"
                                          data-rule-minlength="3" data-rule-maxlength="2000">${obj.remark}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_logo">company logo:</label>

                        <div class="controls">
                            <div class="span12">
                                <%--<input id="c_logo" type="hidden" name="showImg" value="${obj.logo}" readonly="readonly" />
                                <img style="display: none; width: 120px; height: 120px; " id="c_showImg_img" class="img-rounded">
                                <button type="button" class="btn btn-primary show-tooltip" id="c_showImg_btn" > <i class="icon-cloud-upload"></i> Upload</button>
                                --%>
                                <jsp:include page="/common/component/editor/upload" >
                                    <jsp:param name="_name" value="logo" />
                                    <jsp:param name="_value" value="${obj.logo}" />
                                </jsp:include>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" for="c_show_img">company showImg:</label>

                        <div class="controls">
                            <div class="span12">

                                <jsp:include page="/common/component/editor/upload" >
                                    <jsp:param name="_name" value="showImgs" />
                                    <jsp:param name="_value" value="${obj.showImgs}" />
                                    <jsp:param name="_isMulti" value="true" />
                                </jsp:include>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="c_remark">是否外送:</label>

                        <div class="controls">
                            <div class="span12">
                                <input type="radio" name="outSide" value="0" id="outSide_1" <c:if test="${obj.outSide == 0}">checked="checked"</c:if>  /> <label for="outSide_1">支持外送</label>
                                <input type="radio" name="outSide" value="1" id="outSide_2" <c:if test="${obj.outSide == 1}">checked="checked"</c:if>  /> <label for="outSide_2">不支持外送</label>
                            </div>
                        </div>
                    </div>

                    <div class="control-group info">
                        <label class="control-label" >地图测试</label>

                        <div class="controls">
                            <div class="span12">
                                <span class="ke-outline" data-name="baidumap" title="百度地图" unselectable="on">
                                    <span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-baidumap" unselectable="on"></span>
                                </span>
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




    function getAreaByPid(obj){  
        $(obj).nextAll().remove();
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: '<c:url value="/common/area/findByPid" />',
            data:{'pid':$(obj).val()},
            complete: function () {
            },
            success: function (data) {
                if(null != data && data.length > 0){
                    var html = '&nbsp;<select id="c_area" class="span2" data-placeholder="Choose a Category" tabindex="1"'
                            + 'onchange="getAreaByPid(this)">'
                            + '<option value="-1">Select...</option>';

                    for(var i=0; i<data.length; i++)
                    {
                        html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                    }
                    html += ' </select>';
                    $(obj).after(html);
                    $("#area_value").val(data[0].id);
                }
            }
        });
        $("#area_value").val($(obj).val());
    }

    
    function form_submit()
    {
        var errMsg = '<span class="error" style="">必选字段</span>';

        if($("#_entreeType").text() == '未选择')
        {
            $("#_entreeType").after(errMsg);
            return false;
        }

        if($("#c_summary").val() == '')
        {
            $("#c_summary").after(errMsg);
            return false;
        }

        if($("#area_value").val() == '' || $("#area_value").val() == '-1')
        {
            $("#area_value").nextAll('span').remove();
            $("#area_value").nextAll().after(errMsg);
            return false;
        }

        if($("#objForm").valid())
        {
            <c:if test="${param.op == null}">
            $("#objForm").submit();
            </c:if>
        }
    }

    $('body').keypress(function(e){
        if(e.ctrlKey && e.which == 13 || e.which == 10) {
            form_submit();
        }
    });


    $(document).ready(function(){
        $("#objForm").validate({
            //debug : true,
            rules:{
            },
            //将错误信息添加当前元素的父结点后面
            errorPlacement: function (error, element){
                if(element.is(':checkbox'))
                    error.appendTo(element.parent().parent());
                else
                    error.insertAfter(element);
            }
        });


        if($("#c_showImg").val() != '')
        {
            var img = $("#c_showImg_img");
            img.show(600);
            img.attr('src', $("#c_showImg").val());
        }



    });




    
</script>
