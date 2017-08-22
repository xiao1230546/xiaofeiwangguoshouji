"use strict";
// 公共函数类
var HOST;

HOST = "http://api.xiaofeiwangguo.com/api/";    //接口地址

var token;
var tel;


var bool = false;
setTimeout(function () {
    bool = true;
}, 1500);
window.addEventListener("popstate", function (e) {
    if (bool) {
        self.location = document.referrer;
    }
    util.pushHistory();
}, false);

var util = {

    // 获取token
    getToken: function () {
        var token = this.GetQueryString("token");
        if (token == null || token.length == 0) {
            token = this.getcookie('token');
        }
        if (token == null || token.length == 0) {
            return "";
        }
        return token;
    },
    pushHistory: function () {
        var state = {
            title: "消费王国",
            url: window.location.href
        };
        window.history.pushState(state, "消费王国", window.location.href);
    },
    Djs: function (obj) {  //短信发送
        $(obj).attr("disabled", "disabled");
        var num = 60;
        var cont = setInterval(function () {
            num--;
            $(obj).val(num + '秒后重发');
            if (num == 0) {
                $(obj).val('重新获取');
                clearInterval(cont);
                $(obj).removeAttr("disabled");
            }
        }, 1000)
    },
    addcookie: function (name, value, expireHours) {
        var cookieString = name + "=" + escape(value) + "; path=/";
        //判断是否设置过期时间
        if (expireHours > 0) {
            var date = new Date();
            date.setTime(date.getTime + expireHours * 3600 * 1000);
            cookieString = cookieString + "; expire=" + date.toGMTString();
        }
        document.cookie = cookieString;
    },
    getcookie: function (name) {
        var oCookie = document.cookie.split('; ');
        for (var i = 0, len = oCookie.length; i < len; i++) {
            var oCookies = oCookie[i].split('=');
            if (oCookies[0] == name) {
                return oCookies[1];
            }
        }
        return '';
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getcookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
    },
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    },
    getParamFromURL: function () {
        var _url = window.location.href;
        var paramArr = _url.substring(_url.lastIndexOf('?') + 1, _url.length).split('&');
        var oJson = {};
        for (var i = 0; i < paramArr.length; i++) {
            var name = paramArr[i].split('=')[0];
            var laue = paramArr[i].split('=')[1];
            oJson[name] = laue;
        }
        return oJson;
    },
    PostAjax: function (obj) {
        var ions = {};  //接受外面参数
        ions = $.extend(ions, obj);     //容错处理。
        var $this = $(this);
        var sce = "?__h=token=";
        var url = HOST + ions.ide + sce + token;
        // util.showBusy('请求中');
        $.ajax({
            url: url,
            type: ions.type,
            data: ions.data,
            dataType: 'json',
            success: function (data, result) {
                // util.closeBusy();
                if (data) {
                    if (data.status != 100) {
                        util.showToast(data.Desc);
                    }
                }
                ions.fn(data)
            },
            error: function (data, result) {
                // util.closeBusy();
                if (data) {
                    if (data.status == 401) {
                        util.showToast("无权限，请重新登录");
                    }
                } else {
                    util.showToast("服务器连接失败，请稍后再试");
                }

            }
        })
    },
    GetNewUrl: function (url) {
        if (url.indexOf("?") > -1) {
            return url + "&__h=token=" + util.getToken();
        }
        else {
            return url + "?__h=token=" + util.getToken();
        }
    },
    showToast: function (msg) {
        layer.open({
            content: msg
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    },
    showModule: function (content, btn) {
        layer.open({
            content: content
            , btn: btn
        });
    },
    showBusy: function (msg) {
        layer.closeAll();
        //loading带文字
        if (msg) {
            layer.open({
                type: 2
                , content: msg
            });
        } else {////loading层
            layer.open({type: 2});
        }
    },
    closeBusy: function () {
        layer.closeAll()
    }
}
function error(data) {

    for (var i = 0; i < data.AuditMessages.length; i++) {
        var $p = "<p class='reeors'>" + data.AuditMessages[i] + "</p>"
        $("#errerr_b").append($p)
    }
}


function removeImg(obj) {
    //var uploader = $(".disla");
    $(obj).parent().parent().next().show();
    $(obj).parent().remove();

    //console.log(uploader.length);

}


function Disabl() {
    off = false;
    $("#main").find("input").attr("disabled", "disabled");
    $("#one").val("下一页")


}


token = util.getToken();          //获取微信令牌
tel = util.GetQueryString("tel");   //获取
util.pushHistory();



function checkPhone(obj){
    var phone = $(obj).val();
    if(!(/^1[34578]\d{9}$/.test(phone))){
        util.showToast("手机号码有误，请重填")
        return false;
    }
}

function checkTel(obj){
    var tel = $(obj).val();
    if(!/^0(\(\d{2,3}\)|\d{2,3}-|\s)?\d{6,14}$/.test(tel)){
        util.showToast("固定电话有误，请重填")
        return false;
    }
}

function Identity(obj) {
    var tel = $(obj).val();
    if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(tel) && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(tel)) {
        util.showToast("身份证号码错误，请重填")
        return false;
    }
}


function luhmCheck(bankno) {
    
    var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {//前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;
    var my = false;
    if (lastNum == luhm) {//Luhm验证通过
        my = true;
        util.showToast("正确.");
    }
    else {//银行卡号必须符合Luhm校验
        my = false;
        util.showToast("银行卡错误.请重新输入");
        return;
    }
    return my;
}
