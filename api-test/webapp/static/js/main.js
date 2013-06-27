var primitives = {
    "bool":'布尔类型',
    "byte":'byte类型',
    "i16":'整数',
    "i32":'整数',
    "i64":'整数',
    "double":'浮点数',
    "string":'字符串',
    "Type.Timestamp":'时间戳',
    "Boolean":'布尔类型',
    "void":'无返回',
    "list":'数组',
    "map":'map',
    "set":'set',
    "binary":'binary'
};
$(function () {
    $('.t-type').each(function () {
        var a = $(this);
        var ns = a.attr('ns');
        a.html(a.html().replace(/([\w.]+)/g, function (word) {
            if (primitives[word]) {
                return '<a href="javascript:void(0)" ns="' + ns + '">' + word + '</a>';
            } else if (word != 'gt' && word != 'lt') {
                return '<a href="' + _ctx + '/doc#' + ns + '.' + word + '" ns="' + ns + '">' + word + '</a>';
            } else {
                return word;
            }
        }));
    });
    $('.t-type a').hover(function () {
        var a = $(this);
        var type = a.html();
        a.attr('data-title', type);
        var text = primitives[type];
        if (text) {
            a.attr('data-content', text);
            a.popover('show');
        } else {
            if (a.attr('data-content')) {
                a.popover('show');
            } else {
                $.get(_ctx + '/test/type', {id:(type.indexOf('.') == -1 ? (a.attr('ns') + '.') : '') + type}, function (text) {
                    a.attr('data-content', text);
                    a.popover('show');
                });
            }
        }
    }, function () {
        $(this).popover('hide');
    });
    var grow = function (textarea) {
        var count = textarea.value.split('\n').length;
        if (count > 0) {
            textarea.rows = count;
        }
    };
    $('.t-value').each(function () {
        var t = $(this);
        var text = t.val();
        if (text) {
            t.val(js_beautify(text));
            grow(this);
        }
    }).keyup(function () {
            grow(this);
        });
    $('.t-va').click(function () {
        var tid = $(this).attr('tid');
        $('#' + tid).val($(this).next().val());
    });
});