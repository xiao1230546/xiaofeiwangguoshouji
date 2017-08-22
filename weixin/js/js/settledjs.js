"use strict";







// 获取元素   发送验证码
var bat_id = $("#obtaino");
var bat_phone = $("#qysj");
var phone = bat_phone.val();

var bat_id = $("#obtaino");
// 请求数据参数
var qyob = {
    ide: "/Common/GetSmsCode",     //类型
    type: "get",                 //数据方式
    data: {                     //需要传输的数据
    },
    fn: function (data, result) {
        //数据传递成功需要执行的函数
        layer.open({
            content: data.Desc
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        if (data.Code == 100) {
            util.Djs(bat_id);
        }
    }
};

var bat_phone = $("#qysj");
var phone = bat_phone.val();
// 事件及倒计时
bat_id.on({
    click: function () {
        if (bat_phone.val().length == 11) {
            qyob.data = {
                Phone: bat_phone.val(),
                Type: 11
            };

            util.PostAjax(qyob)
        } else {
            util.showToast('请输入正确的手机号码')
            return false;
        }
    },
    touchstart: function () {
        $(this).css("backgroundColor", "#fff4f4")
    },
    touchend: function () {
        $(this).css("backgroundColor", "#fff")
    }
});





function settler() {

    if (tel == null || tel == "") {
        $("#tuijianren").removeAttr("disabled");
    } else {
        $("#tuijianren").val(tel);
        $("#tuijianren").attr("disabled", "disabled");
    }

    var url = HOST + "WxPublic/GetOrgInfo";
    $.ajax({
        // 个人信息
        url: util.GetNewUrl(url),
        data: {},
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.Code == 100) {
                if (result.Data.Status == 0) {
                    // 未入住
                    //..location.href = "settled.html";

                } else {
                    // 审核成功
                    // window.location.href = "enterpriseinform.html?token=" + util.getToken();

                };
            } else {
                util.showToast(result.Desc);
                return false;
            }
        },
        error: function () {
            layer.open({
                content: '服务器连接失败，请稍后再试'
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });

        }

    })


}


