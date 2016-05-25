/**
 * Created by Administrator on 2016/4/26.
 */

var lele = (function(my) {
        'use strict';
        var vehicle = {
            id: '',
            owner: '',
            sex: '',
            birthday: '',
            phone: '',
            license_head: '',
            license_code: '',
            city_id: '',
            city_name: '',
            chassis: '',
            engine: '',
            insurance_id: '',
            insurance_name: '',
            insurance_endtime: ''
        };
        my.bindHeaderEvent = function ($page) {

        }
        return my;
    }(lele || {}))

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
            case 'service-point-index':
                var $picker = $("#picker-city");
                $picker.serviceCityPicker({
                    value: ['广东', '深圳'],
                    formatValue: function (picker, value, displayValue){
                        $picker.find('[name="province"]').html(value[0]);
                        $picker.find('[name="city"]').html(value[1]);
                        return null;
                    }
                });
                break;
            case 'service-check-index':
                $page.on('click', '#help', function () {
                    $.confirm('如需其他帮助，请致电客服0755-545455', function () {
                        window.location = 'tel:0755-545455';
                    });
                });

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


