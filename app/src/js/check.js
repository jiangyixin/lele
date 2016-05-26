/**
 * Created by Administrator on 2016/5/25.
 */

var lele = (function(my) {
    'use strict';

    my.checkIn = function ($form) {
        var obj = null;
        var check = '';
        $form.find('[name]').each(function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            if (name && val) {
                obj[name] = val;
            } else {
                check = $(this).attr('placeholder');
                return false;
            }
        });
        if (check) {
            $.alert(check);
            return check;
        } else {
            return obj;
        }
    };

    return my;
}(lele || {}));


;(function ($) {
    'use strict';

    var infiniteLoad = function(element, options) {
        var instance = this;
        console.log(element);
        this.options = $.extend({}, $.fn.infiniteLoad.defaults, options);
        console.log(this.options);
        var options = this.options;
        this.init();
        infiniteLoad = function() {
            return instance;
        }
    };
    infiniteLoad.prototype = {
        constructor: this,
        init: function () {

        },
        getPointHtml: function (list) {
            var html = '';
            for (var i=0; i<list.length; i++) {
                html += '<li>' +
                    '<a href="#" class="point-link">' +
                    '<h4>'+ list[i].name +'</h4>' +
                    '<p>'+ list[i].company +'</p>' +
                    '<p>门店地址：'+ list[i].address +'</p>' +
                    '<p>电话：'+ list[i].phone +'</p>' +
                    '</a>' +
                    '</li>';
            }
            return html;
        },
        ajaxLoad: function (url, data, callback) {
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType: 'json',
                timeout: 300,
                success: function(data){
                    return callback(data.list);
                },
                error: function(xhr, type){
                    $.alert('加载失败！');
                }
            });
        },
        addItems: function (url, data, callback) {
            var html = this.ajaxLoad(url, data, this.getPointHtml);
            callback(html);
        }
    };
    $.fn.infiniteLoad = function(options) {
        return new infiniteLoad(this, options);
    };
    $.fn.infiniteLoad.defaults = {
        loading: false,
        itemsPerLoad: 10,
        maxItems: 100,
        lastIndex: 0
    };
})(Zepto);