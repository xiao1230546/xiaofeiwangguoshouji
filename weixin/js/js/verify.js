"use strict";

$(function () {
    $("#tuijianren").blur(function () {
        checkPhone(this)
    })
    $("#qysj").blur(function () {
        checkPhone(this)
    })

//按钮绑定事件,先请求接口保存数据再跳转

    $("#one").on("click",function () {
        $("#one").attr("disabled","disabled");
       
        var Phone= $("#qysj").val();
        var Code= $("#qyyzm").val();
    
        if (Phone == "" || Code == "") {
            util.showToast("请输入完整的信息");
            $("#one").removeAttr("disabled");
            return;
        }
        var url = HOST + "OrgAuth/LoginByCode";
        
        util.showBusy("请求中");
        $.ajax({
            url: url,
            type: "get",
            data: {
                Phone:Phone,
                Code:Code
            },
            dataType: 'json',
            success: function (result) {
                util.closeBusy();
                var token = result.Data;
                console.log(11);
                window.location.href = "org1.html?token=" + token;
                
                util.showToast(result.Desc)
                
            },
            error: function (result) {
                $("#one").removeAttr("disabled");
                util.closeBusy();
                

            }
        })

    });


    $("#obtaino").on({  //手机验证码
        click: function () {
            $("#obtaino").attr("disabled","disabled");
            var url = HOST + "/Common/GetSmsCode";
            var Nemae = { //获取input的val
                OrgName: $("#qymc").val(),
                Referrer: $("#tuijianren").val(),
                Phone: $("#qysj").val(),
                Code: $("#qyyzm").val()
            };
            if (Nemae.Phone.length != 11) {
                util.showToast("请输入正确的手机号码");
                $("#obtaino").removeAttr("disabled");
                return;
            }
            $("#obtaino").attr("disabled", "disabled");

            $.get(util.GetNewUrl(url), {
                Phone: Nemae. Phone,
                Type:11
            }, function (result) {
                util.showToast(result.Desc);
                util.Djs("#obtaino")
            });
        },
        touchstart: function () {
            $(this).css("backgroundColor", "#fff4f4")
        },
        touchend: function () {
            $(this).css("backgroundColor", "#fff")
        }
    });
})