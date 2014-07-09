var UTL = {};

function getInfoMsg(msg) {
    var time = new Date().getTime();
    var id = "_msg_box"+time;
    var div = '<div id='+ id + ' class="alert alert-success fade in" style="position: fixed; top:50px; right: 40px; width:400px;"><button class="close" data-dismiss="alert">×</button><h4>Success!</h4>'
        + '<p>' + (msg != '' && undefined != msg  ? msg : 'operation successfully completed') + '</p> </div>';
    //$(div).appendTo("body").fadeOut(3000);
    $(div).appendTo("body")/*.animate({ height: 'hide', opacity: 'hide' }, 5000)*/;
    setTimeout(function(){
       $("#"+id).animate({ height: 'hide', opacity: 'hide' },300);
    }, 3000);
}

function getErrorMsg(msg) {
    var time = new Date().getTime();
    var div = '<div id="_msg_box"' + time + ' class="alert alert-error fade in" style="position: fixed; top:50px; right: 40px; width:400px;"><button class="close" data-dismiss="alert">×</button><h4>Error!</h4>'
        + '<p>' + msg + '</p> </div>';
    $(div).appendTo("body")/*.animate({ height: 'hide', opacity: 'hide' }, 10000)*/;
}




UTL.del = function (url, id) {
    if (confirm('确定此操作吗?')) {
        $.ajax({
            url: url,
            data: {ids: id},
            method: 'post',
            success: function (data) {
                if (data.code == 0) {
                    getInfoMsg();
                    $("#tr_" + id).fadeOut('fast').remove();
                }
                else {
                    $('body').append(getErrorMsg(data.message));
                }

            }
        });
    }
}



UTL.save = function (formId, option) {
    if (option.url == null)
        return getErrorMsg('target url is null');

    $.ajax({
        url: option.url,
        method: 'post',
        data: $("#" + formId).serialize(),
        success: function (data) {
            if (data.code == 0) {
                option.callbackUrl != null ? window.location.href = option.callbackUrl : window.location.reload();
            } else {
                getErrorMsg(data.message);
            }
        }
    });

}


// Tree
UTL.saveClassification = function (treeNode, companyId, isEdit) {
    var id = isNaN(treeNode.id) ? 0 : treeNode.id;

    var data = {id: id, pid: treeNode.pId, name: treeNode.name, isParent: treeNode.isParent};
    if(isEdit){
        data.id = treeNode.id;
    }
    $.ajax({
        url: param.ctx + 'common/classification/add/' + companyId + '?ajax=1',
        data: data,
        method: 'post',
        success: function (data) {
            //console.log(data);
            if (data.code == 0) {
                //data.callbackUrl != null ? window.location.href = data.callbackUrl : window.location.reload();
                treeNode.id = data.id;
                getInfoMsg();
            } else {
                getErrorMsg(data.message);
            }
        }
    });
}

UTL.dropClassification = function (id, targetId) {
    $.ajax({
        url: param.ctx + 'common/classification/drop?ajax=1',
        data: {id: id, pid: targetId},
        method: 'post',
        success: function (data) {
            if (data.code == 0) {
                //data.callbackUrl != null ? window.location.href = data.callbackUrl : window.location.reload();
                getInfoMsg();
            } else {
                getErrorMsg(data.message);
            }
        }
    });
}

UTL.delClassification = function (id) {
    $.ajax({
        url: param.ctx + 'common/classification/del/' + id + '?ajax=1',
        data: {id: id},
        method: 'post',
        success: function (data) {
            if (data.code == 0) {
                //data.callbackUrl != null ? window.location.href = data.callbackUrl : window.location.reload();
                getInfoMsg();
            } else {
                getErrorMsg(data.message);
            }
        }
    });
}



