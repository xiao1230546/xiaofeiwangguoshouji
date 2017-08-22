
function myinfo() {

    $.ajax({
        // 个人信息
        url: util.GetNewUrl(HOST + "WxPublic/GetUserInfo"),
        data: {},
        type: 'get',
        dataType: 'json',
        success: function (result) {

            if (result.Code == 100) {
                if (result.Data.Status == 0) {
                    window.location.href = "register.html?" + util.getToken();
                } else if (result.Data.Status == 1) {
                    $("#name").html(result.Data.UserName);
                    $("#pho").html(result.Data.Phone);
                    $("#imgtx").attr("src", result.Data.Avatar);
                    // phos = Phone;
                    // window.location.href = "myinformation.html";
                } else {
                    layer.open({
                        content: "未知错误请联系管理员"
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                }
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