<%--
  Created by IDEA.
  User: 虎
  Date: 13-8-19
  Time: 下午1:25
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>


<link rel="stylesheet" type="text/css" href="${ctx}/static/assets/zTree/css/zTreeStyle/zTreeStyle.css" >

<script type="text/javascript" src="${ctx}/static/assets/zTree/js/jquery.ztree.all-3.5.js"></script>


<c:if test="${empty param.show}">
<script>
    var flg = ${!empty param.op and param.op eq "view"} ? false : true;
    console.log(flg);
    var setting = {
        async: {
            enable: true,
            url:"<c:url value="/common/classification/getTree/" />${empty companyId ? 0 : companyId}?ajax=1",
            autoParam:["id"],
            otherParam:{"otherParam":"zTreeAsyncTest"},
            dataFilter: filter
        },
        view: {
            expandSpeed:"",
            addHoverDom: flg ?  addHoverDom : function(){},
            removeHoverDom: removeHoverDom,
            selectedMulti: false
        },
        edit: {
            enable: flg
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeRemove: beforeRemove,
            beforeRename: beforeRename,
            onClick: onClick,
            onRename: onRename,
            onRemove: onRemove,
            onDrop : onDrop,
            onAsyncSuccess:onAsyncSuccess
            //onNodeCreated:onNodeCreated
        }
    };
    var firstAsyncSuccessFlag = 0;
    function onAsyncSuccess(event, treeId, treeNode, msg) {
        if (firstAsyncSuccessFlag == 0) {
            try {
                //调用默认展开第一个结点
                var zTree = $.fn.zTree.getZTreeObj("classificationTree");
                var selectedNode = zTree.getSelectedNodes();
                var nodes = zTree.getNodes();
                zTree.expandNode(nodes[0], true);

                var childNodes = zTree.transformToArray(nodes[0]);
                zTree.expandNode(childNodes[1], true);
                zTree.selectNode(childNodes[1]);
                var childNodes1 = zTree.transformToArray(childNodes[1]);
                zTree.checkNode(childNodes1[1], true, true);
                firstAsyncSuccessFlag = 1;
            } catch (err) {
            }
        }
    }

    function filter(treeId, parentNode, childNodes) {
        if (!childNodes) return null;
        for (var i=0, l=childNodes.length; i<l; i++) {
            childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
        }
        return childNodes;
    }
    function beforeRemove(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("classificationTree");
        zTree.selectNode(treeNode);
        return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    }

    function onRemove(event, treeId, treeNode){
        //同步DB
        UTL.delClassification(treeNode.id);
    }

    function onNodeCreated(event, treeId, treeNode){
        alert(treeNode.tId + ", " + treeNode.name);
    }

    function beforeRename(treeId, treeNode, newName) {
        if (newName.length == 0) {
            alert("节点名称不能为空.");
            return false;
        }
        return true;
    }

    function onRename(event, treeId, treeNode, isCancel){
        //同步DBDB
        UTL.saveClassification(treeNode, '${companyId}', false);
    }

    function onDrop(event, treeId, treeNodes, targetNode, moveType)
    {
        for(var i = 0 ; i< treeNodes.length; i++)
        {
            UTL.dropClassification(treeNodes[i].id, targetNode.id);
        }
    }

    function onClick(event, treeId, treeNode)
    {
        $('#_' + '${param.s}').text(' ' + treeNode.name);
        $('#' + '${param.s}').val(treeNode.id);
        $('#_' + '${param.s}').parent().removeClass('label-info').addClass('label-success');
    }

    var newCount = 1;
    function addHoverDom(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if ($("#addBtn_"+treeNode.id).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.id
                + "' title='add node' onfocus='this.blur();'></span>";
        sObj.append(addStr);
        var btn = $("#addBtn_"+treeNode.id);
        if (btn) btn.bind("click", function(){
            var zTree = $.fn.zTree.getZTreeObj("classificationTree");
            zTree.addNodes(treeNode, {id:('auto_' + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
        });
    };
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.id).unbind().remove();
    };

    $(document).ready(function(){
        $.fn.zTree.init($("#classificationTree"), setting);
    });

</script>


<div >
<ul id="classificationTree" class="ztree"></ul>
</div>

</c:if>













<c:if test="${param.show eq 'select'}">
<style>
    ul.ztree {margin-top: 10px;border: 1px solid #617775;background: #f0f6e4;width:226px;height:auto;}
</style>

<div id="menuContent" class="menuContent" style="display:none; position: absolute; z-index: 10000;">
    <ul id="treeDemo" class="ztree" style="margin-top:0; width:160px;"></ul>
</div>
<button type="button" class="btn btn-primary" id="menuBtn" href="#" onclick="showMenu('#${param.id}'); return false;">选择</button>
<SCRIPT type="text/javascript">
    <!--
    var setting = {
        async: {
            enable: true,
            url:"<c:url value="/common/classification/getTree/" />${empty companyId ? 0 : companyId}?ajax=1",
            autoParam:["id"]
        },
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick,
            onClick: onClick,
            onAsyncSuccess:onAsyncSuccess
        }
    };

    var firstAsyncSuccessFlag = 0;
    function onAsyncSuccess(event, treeId, treeNode, msg) {
        if (firstAsyncSuccessFlag == 0) {
            try {
                //调用默认展开第一个结点
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var selectedNode = zTree.getSelectedNodes();
                var nodes = zTree.getNodes();
                zTree.expandNode(nodes[0], true);

                var childNodes = zTree.transformToArray(nodes[0]);
                zTree.expandNode(childNodes[1], true);
                zTree.selectNode(childNodes[1]);
                var childNodes1 = zTree.transformToArray(childNodes[1]);
                zTree.checkNode(childNodes1[1], true, true);
                firstAsyncSuccessFlag = 1;
            } catch (err) {
            }
        }
    }

    function beforeClick(treeId, treeNode) {
        var check = (treeNode && !treeNode.isParent);
        if (!check) alert("只能选择城市...");
        return check;
    }

    function onClick(e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                nodes = zTree.getSelectedNodes(),
                v = "";
        nodes.sort(function compare(a,b){return a.id-b.id;});
        for (var i=0, l=nodes.length; i<l; i++) {
            v += nodes[i].name + ",";
        }
        if (v.length > 0 ) v = v.substring(0, v.length-1);
        var obj = $('#${param.id}');
        obj.text(v);
        obj.addClass('label-success');
        obj.prev('input').val(treeNode.id);
    }

    function showMenu(id) {
        var obj = $(id);
        var objOffset;
        var tmp = obj;
        if(obj.prev().is('input:visible'))
        {
            objOffset = obj.prev().offset();
            tmp = obj.prev();
        }else
        {
            objOffset = obj.offset();
        }
        $("#menuContent").css({left:objOffset.left + "px", top:objOffset.top + tmp.outerHeight() + "px"}).slideDown("fast");

        $("body").bind("mousedown", onBodyDown);
    }
    function hideMenu() {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }
    function onBodyDown(event) {
        if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
            hideMenu();
        }
    }

    $(document).ready(function(){
        $.fn.zTree.init($("#treeDemo"), setting);
    });
    //-->
</SCRIPT>
</c:if>
