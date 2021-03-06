/**
 * Created by Administrator on 2016/4/26.
 */

var lele = (function(my) {
    'use strict';

    // 获取表单数据 并进行不为空验证
    my.checkIn = function ($form) {
        var obj = new Object();
        var check = '';
        $form.find('[name]').each(function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            var required = $(this).attr('required');
            if (!val && required) {
                check = required || $(this).attr('placeholder');
                return false;
            }
            if (val) {
                obj[name] = val;
            }
        });
        if (check) {
            $.alert(check);
            return check;
        } else {
            return obj;
        }
    };

    my.ajaxLoad = function (url, data, callback) {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            timeout: 300,
            success: function(data){
                callback(data);
            },
            error: function(xhr, type){
                $.alert('加载失败！');
            }
        });
    };
    my.getPointItem = function (list) {
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
    };
    my.getReserveItem = function (list, type) {
        var html = '';
        for (var i=0; i<list.length; i++) {
            html += '<a href="#" class="owner-item">';
            html += '<div class="row">\
                        <div class="col-30 item-left">预约时间：</div>\
                        <div class="col-70 item-right">'+ list[i].time +'</div>\
                    </div>\
                    <div class="row">\
                        <div class="col-30 item-left">联系人：</div>\
                    <div class="col-70 item-right">'+ list[i].name +'</div>\
                        </div>\
                        <div class="row">\
                        <div class="col-30 item-left">联系电话：</div>\
                    <div class="col-70 item-right">'+ list[i].phone +'</div>\
                        </div>\
                    <div class="row">\
                        <div class="col-30 item-left">车型：</div>\
                        <div class="col-70 item-right">'+ list[i].car +'</div>\
                    </div>';
            html += '</a>';
        }
        return html;
    };
    my.getCompleteItem = function (list, type) {
        var html = '';
        for (var i=0; i<list.length; i++) {
            html += '<div class="owner-item">';
            html += '<div class="row">\
                        <div class="col-30 item-left">预约时间：</div>\
                        <div class="col-70 item-right">'+ list[i].time +'</div>\
                    </div>\
                    <div class="row">\
                        <div class="col-30 item-left">联系人：</div>\
                    <div class="col-70 item-right">'+ list[i].name +'</div>\
                        </div>\
                        <div class="row">\
                        <div class="col-30 item-left">联系电话：</div>\
                    <div class="col-70 item-right">'+ list[i].phone +'</div>\
                        </div>\
                    <div class="row">\
                        <div class="col-30 item-left">车型：</div>\
                        <div class="col-70 item-right">'+ list[i].car +'</div>\
                    </div>';
            html += '</div>';
        }
        return html;
    };

    return my;
}(lele || {}));

;(function ($) {
    'use strict';
    var bindHeaderEvent = function ($page) {
        var $view = $page || $(document);
        var dropDown = $('#dropDown');
        $view
            .on('click', '.nav-header a', changeHeaderNav)
            .on('click', '.nav-button', toggleDropDown)
        ;
        function hideDropDown() {
            dropDown.removeClass('in');
            setTimeout(function () {
                dropDown.removeClass('active');
            }, 150);
        }
        function showDropDown(e) {
            dropDown.addClass('active')
            setTimeout(function () {
                dropDown.addClass('in');
            }, 0);
            $view.one('click', function () {
                hideDropDown();
            });
            e.stopPropagation();
        }
        function toggleDropDown(e) {
            e.stopPropagation();
            var target = $($(this).attr('data-target'));
            if (target.hasClass('active')) {
                hideDropDown(e);
            } else {
                showDropDown(e);
            }
        }
        function changeHeaderNav() {
            $(this).parent('li').addClass('active').siblings('li').removeClass('active');
        }
    }
    $(document).on("pageInit", function(e, pageId, $page) {
        console.log(e);
        console.log(pageId);
        console.log($page);
        bindHeaderEvent();
        switch (pageId) {
            case 'vehicle':
                var abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                var abc123 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                var licenseList = ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼','渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新'];
                var insuranceList = ['保险公司1', '保险公司2', '保险公司3'];

                $("#picker-insurance").picker({
                    toolbarTemplate: '<header class="bar bar-nav">\
                              <button class="button button-link pull-right close-picker">确定</button>\
                              <h1 class="title">选择保险公司</h1>\
                          </header>',
                    cols: [
                        {
                            textAlign: 'center',
                            values: insuranceList
                        }
                    ]
                });

                $("#picker-license").picker({
                    toolbarTemplate: '<header class="bar bar-nav">\
                              <button class="button button-link pull-right close-picker">确定</button>\
                              <h1 class="title">请选择车牌号码</h1>\
                          </header>',
                    cols: [
                        {
                            textAlign: 'center',
                            values: licenseList
                            //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
                        },
                        {
                            textAlign: 'center',
                            values: abc
                        },
                        {
                            textAlign: 'center',
                            values: abc123
                        }
                        ,
                        {
                            textAlign: 'center',
                            values: abc123
                        }
                        ,
                        {
                            textAlign: 'center',
                            values:  abc123
                        }
                        ,
                        {
                            textAlign: 'center',
                            values: abc123
                        }
                        ,
                        {
                            textAlign: 'center',
                            values: abc123
                        }
                    ],
                    formatValue: function (picker, value, displayValue){
                        return value[0] + value[1] + ' - ' + value[2] + value[3] + value[4] + value[5] + value[6];
                    }
                });

                $("#picker-city").jsonCityPicker({

                });
                break;
            /* ------------------------------- 服务点选择 ------------------------------- */
            case 'service-point':
                var $form = $('#form-service-login');
                var $picker = $("#picker-city");
                // 初始化城市选择
                var codeList = [
                    $picker.find('[name="province"]').attr('data-code'),
                    $picker.find('[name="city"]').attr('data-code')
                ];
                var url = 'data.json';
                // 初始化数据
                lele.ajaxLoad(url, null, function (data) {
                    var html = lele.getPointItem(data.list);
                    $page.find('.point-list').html(html);
                });
                $page.on('click', '#login', function () {
                    var result =  lele.checkIn($form);
                    // var result = $form.serializeArray();
                    if (typeof result == 'object') {
                        $form.submit();
                    }
                });
                $picker.serviceCityPicker({
                    // displayValue: ['广东', '深圳'],
                    // value: ['02', '0004'],
                    formatValue: function (picker, value, displayValue){
                        $picker.find('[name="province"]').html(displayValue[0]);
                        $picker.find('[name="province"]').attr('data-code', value[0]);
                        $picker.find('[name="city"]').html(displayValue[1]);
                        $picker.find('[name="city"]').attr('data-code', value[1]);
                        return null;
                    },
                    onClose: function (picker) {
                        console.log(picker.cols[0].value);
                        console.log(picker.cols[1].value);
                        lele.ajaxLoad(url, null, function (data) {
                            var html = lele.getPointItem(data.list);
                            $page.find('.point-list').html(html);
                        });
                    }
                });

                // 底部无线滚动
                var loading = false;
                // 每次加载添加多少条目
                var itemsPerLoad = 10;
                // 最多可加载的条目
                var maxItems = 100;
                var lastIndex = $page.find('.point-list li').length;
                // 数据不足不进行无限加载
                if (lastIndex < itemsPerLoad) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                } else {
                    $page.on('infinite', function() {
                        // 如果正在加载，则退出
                        if (loading) return;
                        // 设置flag
                        loading = true;
                        lele.ajaxLoad(url, null, function (data) {
                            // 重置加载flag
                            loading = false;
                            var html = lele.getPointItem(data.list);
                            $page.find('.point-list').append(html);
                            // 更新最后加载的序号
                            lastIndex = $page.find('.point-list li').length;
                            $.refreshScroller();
                            if (lastIndex >= maxItems) {
                                // 加载完毕，则注销无限加载事件，以防不必要的加载
                                $.detachInfiniteScroll($('.infinite-scroll'));
                                // 删除加载提示符
                                $('.infinite-scroll-preloader').remove();
                                return;
                            }
                        });
                    });
                }

                break;
            /* ------------------------------- 服务点预约详情 ------------------------------- */
            case 'service-check':
                var $form = $('#form-service-edit');
                var $reserving = $('#reserving');
                var $complete = $('#complete');
                var reservingUrl = 'serviceList.json';
                var completeUrl = 'serviceList.json';
                
                $page.on('click', '#help', function () {
                    $.confirm('如需其他帮助，请致电客服0755-545455', function () {
                        window.location = 'tel:0755-545455';
                    });
                });
                $page.on('click', '#save', function () {
                    var result = lele.checkIn($form);
                    if (typeof result == 'object') {
                        $form.submit();
                    }
                });

                // 底部无线滚动
                var loading = false;
                // 每次加载添加多少条目
                var itemsPerLoad = 10;
                // 最多可加载的条目
                var maxItems = 100;
                var reservingLastIndex = $reserving.find('.owners-list .owner-item').length;
                var completeLastIndex = $complete.find('.owners-list .owner-item').length;

                // 数据不足不进行无限加载
                if (reservingLastIndex < itemsPerLoad) {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($reserving);
                    // 删除加载提示符
                    $reserving.find('.infinite-scroll-preloader').remove();
                } else {
                    $reserving.on('infinite', function () {
                        console.log('reserving-----infinite');
                        // 如果正在加载，则退出
                        if (loading) return;
                        // 设置flag
                        loading = true;
                        lele.ajaxLoad(url, null, function (data) {
                            // 重置加载flag
                            loading = false;
                            var html = lele.getReserveItem(data.list);
                            $reserving.find('.owners-list').append(html);
                            // 更新最后加载的序号
                            reservingLastIndex = $reserving.find('.owners-list .owner-item').length;
                            $.refreshScroller();
                            if (reservingLastIndex >= maxItems) {
                                // 加载完毕，则注销无限加载事件，以防不必要的加载
                                $.detachInfiniteScroll($reserving);
                                // 删除加载提示符
                                $reserving.find('.infinite-scroll-preloader').remove();
                                return;
                            }
                        });
                    });
                }
                // 数据不足不进行无限加载
                if (completeLastIndex < itemsPerLoad) {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($complete);
                    // 删除加载提示符
                    $complete.find('.infinite-scroll-preloader').remove();
                } else {
                    $complete.on('infinite', function () {
                        console.log('reserving-----infinite');
                        // 如果正在加载，则退出
                        if (loading) return;
                        // 设置flag
                        loading = true;
                        lele.ajaxLoad(url, null, function (data) {
                            // 重置加载flag
                            loading = false;
                            var html = lele.getCompleteItem(data.list);
                            $complete.find('.owners-list').append(html);
                            // 更新最后加载的序号
                            completeLastIndex = $complete.find('.owners-list .owner-item').length;
                            $.refreshScroller();
                            if (completeLastIndex >= maxItems) {
                                // 加载完毕，则注销无限加载事件，以防不必要的加载
                                $.detachInfiniteScroll($complete);
                                // 删除加载提示符
                                $complete.find('.infinite-scroll-preloader').remove();
                                return;
                            }
                        });
                    });
                }

                break;
            
            case 'owner-reserve-list':
                var $picker = $("#picker-service-city");
                $picker.serviceCityPicker({
                    value: ['广东', '深圳'],
                    formatValue: function (picker, value, displayValue){
                        $picker.find('[name="province"]').html(value[0]);
                        $picker.find('[name="city"]').html(value[1]);
                        return null;
                    }
                });
                break;
            case 'center-manage':
                $('#unbundling-card').on('click', function () {
                    $.confirm('是否解绑会员卡', function () {
                        
                    })
                });
                $('#get-pwd').on('click', function () {
                    $.confirm('会员密码将会重置，并以短信方式发送到您的手机', function () {
                        $.alert('已经发送新密码到你的手机');
                    });
                });
                break;
            case 'vehicle-add':
                $page.find('[data-show]').on('click', function (e) {
                    var show = $(this).attr('data-show');
                    if (show == 'engine' || show == 'chassis') {
                        var modal = $.modal({
                            title: '',
                            text: '怎么查找车架号和发动机尾号?',
                            afterText:  '<div class="swiper-container" style="width: auto; margin:5px -15px -15px">'+
                            '<div class="swiper-pagination"></div>'+
                            '<div class="swiper-wrapper">'+
                            '<div class="swiper-slide"><img src="/lele/app/images/0.jpg" height="150" style="display:block; width: 100%;"></div>' +
                            '</div>'+
                            '</div>',
                            buttons: [
                                {
                                    text: '确定'
                                }
                            ]
                        })
                    }
                });
                break;
            default:
                break;
        }
    });

    $.init();

})(Zepto);


