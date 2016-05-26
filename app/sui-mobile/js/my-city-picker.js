/*!
 * =====================================================
 * SUI Mobile - http://m.sui.taobao.org/
 *
 * =====================================================
 */
// jshint ignore: start
+function($){

$.smConfig.rawCitiesData = [
    {
        "code": '01',
        "name": "湖南",
        "sub": [
            {
                "code": '0001',
                "name": "长沙"
            },
            {
                "code": '0002',
                "name": "湘潭"
            }
        ]
    },
    {
        "code": '02',
        "name": "广东",
        "sub": [
            {
                "code": '0003',
                "name": "广州"
            },
            {
                "code": '0004',
                "name": "深圳"
            }
        ]
    },
    {
        "code": '03',
        "name": "湖北",
        "sub": [
            {
                "code": '0005',
                "name": "武汉"
            },
            {
                "code": '0006',
                "name": "武昌"
            }
        ]
    }
];

}(Zepto);
// jshint ignore: end

/* jshint unused:false*/
+ function ($) {
    "use strict";
    var format = function (data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d.name === "请选择") continue;
            result.push(d.name);
        }
        return result;
    };
    var formatCode = function (data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d.name === "请选择") continue;
            result.push(d.code);
        }
        return result;
    }

    var subCity = function (data) {
        if (!data.sub) return [""];
        return format(data.sub);
    };
    var subCode = function (data) {
        if (!data.sub) return [""];
        return formatCode(data.sub);
    };

    var getCities = function (d) {
        for (var i = 0; i < raw.length; i++) {
            if (raw[i].name === d) return subCity(raw[i]);
        }
        return [""];
    };
    var getCodes = function (d) {
        for (var i = 0; i < raw.length; i++) {
            if (raw[i].name === d) return subCode(raw[i]);
        }
    }

    var raw = $.smConfig.rawCitiesData;
    // 省份 code
    var pCodes = raw.map(function (d) {
        return d.code;
    });
    // 省份 name
    var provinces = raw.map(function (d) {
        return d.name;
    });
    // 城市
    // 城市code
    var cCodes = subCode(raw[0]);
    // 城市 name
    var initCities = subCity(raw[0]);
    // 默认省份
    var currentProvince = provinces[0];
    // 默认城市
    var currentCity = initCities[0];

    var t;
    var defaults = {

        cssClass: "city-picker",
        rotateEffect: false,  //为了性能

        onChange: function (picker, values, displayValues) {
            var newProvince = picker.cols[0].displayValue;
            var newCity;
            var newCode;
            if (newProvince !== currentProvince) {
                // 如果Province变化，节流以提高reRender性能
                clearTimeout(t);
                t = setTimeout(function () {
                    var newCities = getCities(newProvince);
                    var newCodes = getCodes(newProvince);
                    newCity = newCities[0];
                    newCode = newCodes[0];
                    picker.cols[1].replaceValues(newCodes, newCities);
                    currentProvince = newProvince;
                    currentCity = newCity;
                    picker.updateValue();
                }, 200);
                return;
            }
            newCity = picker.cols[1].displayValue;
            newCode = picker.cols[1].value;
            if (newCity !== currentCity) {
                currentCity = newCity;
                picker.updateValue();
            }

            // 外部回调
            if (picker.params.onSelect) {
                picker.params.onSelect(currentProvince, currentCity);
            }
        },
        cols: [
            {
                textAlign: 'center',
                values: pCodes,
                displayValues: provinces,
                cssClass: "col-province"
            },
            {
                textAlign: 'center',
                values: cCodes,
                displayValues: initCities,
                cssClass: "col-city"
            }
        ]
    };

    $.fn.serviceCityPicker = function (params) {
        return this.each(function () {
            if (!this) return;
            var p = $.extend(defaults, params);
            //计算value 和 displayValue
            if (p.displayValue && p.value) {
                $(this).find('[name="province"]').html(p.displayValue[0]);
                $(this).find('[name="province"]').attr('data-code', p.value[0]);
                $(this).find('[name="city"]').html(p.displayValue[1]);
                $(this).find('[name="city"]').attr('data-code', p.value[0]);
            } else {
                var province = $(this).find('[name="province"]').html();
                var city = $(this).find('[name="city"]').html();
                var pCode = $(this).find('[name="province"]').attr('data-code');
                var cCode = $(this).find('[name="city"]').attr('data-code');
                province && city && (p.displayValue = [province, city]);
                pCode && cCode && (p.value = [pCode, cCode]);
            }
            if (p.displayValue) {
                if (p.displayValue[0]) {
                    currentProvince = p.displayValue[0];
                    p.cols[1].displayValues = getCities(p.displayValue[0]);
                    p.cols[1].values = getCodes(p.displayValue[0]);
                }
                if (p.displayValue[1]) {
                    currentCity = p.displayValue[1];
                }
            }
            $(this).picker(p);
        });
    };
}(Zepto);

