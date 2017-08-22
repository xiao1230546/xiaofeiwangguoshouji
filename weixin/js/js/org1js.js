"use strict";
$(function () {
    $("#tuijianren").blur(function () {
        checkPhone(this)
    })
    $("#qysj").blur(function () {

        checkPhone(this)
    })



    $("#main").find("input").attr("disabled","disabled");

    var url = util.GetNewUrl(HOST + "WxPublic/GetOrgInfo1");
    $.ajax({
        url: url,
        data: {},
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.Code == 100) {

                if (result.Data.OrgCode > 0) { //如果已注册
                    BindRedirect();
                    //展示信息
                    $("#qymc").val(result.Data.OrgName);
                    $("#tuijianren").val(result.Data.Referrer);
                    $("#qysj").val(result.Data.Phone);
                    $("#verification").hide();    //隐藏手机验证码
                    $("#follow").show();    //显示关注公众号
                    $("#state").show();    //显示状态
                    $("#next").css("position","relative");
                    if(result.Data.Status==4){
                        $("#aim").html("审核失败");
                        return
                    } else if(result.Data.Status==1||result.Data.Status==2){
                        $("#aim").html("审核中");
                        return
                    }else if(result.Data.Status==0){
                        $("#aim").html("未提交审核");
                        return
                    }else{
                        $("#aim").html("审核成功");
                        $("#one").val("下一页")
                        return
                    }
                }else{
                    $("#main ").find("input").removeAttr("disabled");
                    if (tel == null || tel == "") {
                        $("#tuijianren").removeAttr("disabled");
                    } else {
                        $("#tuijianren").val(tel);
                        $("#tuijianren").attr("disabled", "disabled");
                    }
                    //商家未注册,先保存再跳转
                    BindSave();
                    return
                }


            }
            else {
                util.showToast(result.Desc);
            }

        },
        error: function () {
            util.showToast("服务器连接失败,请稍后再试")
        }
    })
})


//按钮绑定事件,先请求接口保存数据再跳转
function BindSave() {
    $("#one").on("click",function () {
        $("#one").attr("disabled","disabled");
        var Nemae = { //获取input的val
            OrgName: $("#qymc").val(),
            Referrer: $("#tuijianren").val(),
            Phone: $("#qysj").val(),
            Code: $("#qyyzm").val()
        }
        if (Nemae.OrgName == "" || Nemae.Referrer == "" || Nemae.Phone == "" || Nemae.Code == "") {
            util.showToast("请输入完整的信息");
            $("#one").removeAttr("disabled");
            return;
        }

        var url = HOST + "/WxPublic/SaveOrg1";

        util.showBusy("请求中");
        $.post(util.GetNewUrl(url),{
            OrgName:Nemae.OrgName,
            Referrer:Nemae.Referrer,
            Phone:Nemae.Phone,
            Code:Nemae.Code
        },function(result){
            util.closeBusy();
            if(result.Code == 100){
                window.location.href = "org2.html?token=" + util.getToken();
            }else {
                util.showToast(result.Desc);
            }
            $("#one").removeAttr("disabled");
        })
    })
}

//绑定按钮事件,直接跳转
function BindRedirect() {
    $("#one").on("click",function () {
        $("#one").attr("disabled","disabled");
        window.location.href = "org2.html?token=" + util.getToken();
    })
}






    $("#obtaino").on({  //手机验证码
        click: function () {
            $("#obtaino").attr("disabled","disabled");
            var url = HOST + "/Common/GetSmsCode";
            var Nemae = { //获取input的val
                OrgName: $("#qymc").val(),
                Referrer: $("#tuijianren").val(),
                Phone: $("#qysj").val(),
                Code: $("#qyyzm").val()
            }
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
    })
