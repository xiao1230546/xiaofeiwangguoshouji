$(function () {
    $("#next").on("click",function () {
        window.location.href = "orginfo2.html?token=" + util.getToken();
    })
    $("#main ").find("input").attr("disabled","disabled");
    $("#error").hide();

    init();
})

function init() {
    var url = util.GetNewUrl(HOST + "WxPublic/GetOrgInfo1");

    // 获取商家信息
    $.ajax({
        url: url,
        data: {},
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.Code == 100) {
                if(result.Data){
                    $("#qymc").val(result.Data.OrgName)
                    $("#tuijianren").val(result.Data.Referrer)
                    $("#qysj").val(result.Data.Phone)
                    if (result.Data.Status == 0) {
                        $("#main ").find("input").removeAttr("disabled");
                    }
                    if (result.Data.Status == 4) {
                        $("#main ").find("input").removeAttr("disabled");
                        $("#error").show();
                    }
                    //如果有手机号,隐藏验证码
                    if(result.Data.Phone !=""){
                        $("#yzm").hide();
                    }
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

}