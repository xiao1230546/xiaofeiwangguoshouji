"use strict";
// 获取元素

function tales() {
    var url = HOST + "/WxPublic/GetUserInfo";
    $.get(util.GetNewUrl(url), function (result) {
        var ce_se = true;
        if (result.Code == 100) {
            if (result.Data.Phone.length == 0) {
                $("body").show();
            } else {
                window.location.href = "myinformation.html?token=" + util.getToken();
            }
        }
        else {
            $("body").show();
            util.showToast(result.Desc);
        }
    });
    if (tel == null || tel == "") {
        $("#tuijianren").removeAttr("disabled");
    } else {
        $("#tuijianren").val(tel);
        $("#tuijianren").attr("disabled", "disabled");
    }
}

// 提交数据


var sumi = {
    ide: "WxPublic/UpdateUser",     //类型
    type: "post",                 //数据方式
    data: {                   //需要传输的数据
    },
    dataType: 'json',
    fn: function (result) {               //数据传递成功需要执行的函数
        layer.open({
            content: result.Desc
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        if (result.Code == 100) {
            window.location.href = "success.html";
        } else {
            unit.showToast(result.Desc);
            return;
        }
    }
};
$("#preservation").on('click', function () {
    var $this = $(this);
    var namez = $("#fullname").val();
    var pho = $("#phone").val();
    var vera = $("#verification").val();
    var referrer = $("#tuijianren").val();
    if (namez == "" || pho == "" || vera == "" || referrer == "") {
        layer.open({
            content: '信息不完整请重新输入'
            , btn: '我知道了'
        });
    } else {
        sumi.data = {
            UserName: namez,
            Phone: pho,
            Code: vera,
            Referrer: referrer
        };
        util.PostAjax(sumi)
    }
});


var bat_id = $("#obtaino");
bat_id.on("touchstart", function () {
    $(this).css("backgroundColor", "#fff4f4")
});
bat_id.on("touchend", function () {
    $(this).css("backgroundColor", "#fff")
})
function sjyzm() {
    var url = HOST + "Common/GetSmsCode";
    var namez = $("#fullname").val();
    var pho = $("#phone").val();
    var vera = $("#verification").val();
    var referrer = $("#tuijianren").val();
    var bat_id = $("#obtaino");
    if (pho.length !== 11) {
        layer.open({
            content: "手机号码不正确"
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    $.ajax({
        // 个人信息
        url: util.GetNewUrl(url),
        data: {
            Phone: pho,
            Type: 11
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.Code == 100) {
                util.Djs(bat_id);
            } else {
                layer.open({
                    content: result.Desc
                    , skin: 'msg'
                    , time: 2 //2秒后自动关闭
                });
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

