function reconm(pageIndex) {

    if (pageIndex == 0) {
        $("#user_list").html("");
    }

    var url = HOST + "WxPublic/GetRecommandList";
    console.log(util.GetNewUrl(url));
    $.ajax({
        // 个人信息
        url: util.GetNewUrl(url),
        data: {
            type: 1,
            pageIndex: pageIndex,
            pageSize: 20
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {
            isUserLock = false;
            if (userPageIndex > pageIndex) {
                return;
            }

            if (result.Data.PageData.length == 0) {
                if ($("#user_list").html() == 0) {
                    $("#ckdiue").show();
                    $("#user_list").hide();
                }
            } else {
                // $("#ckdiue").hide();
                // $("#user_list").show();
                userPageIndex = pageIndex + 1;
                for (var i = 0; i < result.Data.PageData.length; i++) {
                    var data = result.Data.PageData[i];
                    var $div = $("<div class='my_users_div'><p class='col-xs-6 my_users'><img src='" + data.Avatar + "'></p><p class='col-xs-6 users'><span class='dsew'>" + data.Name + "</span><span>" + data.Phone + "</span></p></div>")

                    $div.appendTo($("#user_list"));
                }
            }
        },
        error: function () {
            // layer.open({ 
            //     content: '服务器连接失败，请稍后再试'
            //     , skin: 'msg'
            //     , time: 2 //2秒后自动关闭
            // });

        }
    })
}

function sjtj(pageIndex) {

    if (pageIndex == 0) {
        $("#org_list").html("");
    }
    var url = HOST + "WxPublic/GetRecommandList";
    console.log(util.GetNewUrl(url));
    $.ajax({
        // 个人信息
        url: util.GetNewUrl(url),
        data: {
            type: 2,
            pageIndex: pageIndex,
            pageSize: 20
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {
            isOrgLock = false;
            if (orgPageIndex > pageIndex) {
                return;
            }

            if (result.Data.PageData.length == 0) {
                if ($("#org_list").html() == 0) {
                    $("#ckdiue").show();
                    $("#org_list").hide();
                }
            } else {
                orgPageIndex = pageIndex + 1;
                // $("#ckdiue").hide();
                // $("#org_list").show();

                for (var i = 0; i < result.Data.PageData.length; i++) {
                    var data = result.Data.PageData[i];


                    var statusStr = "";
                    if (data.Status == 1 || data.Status == 2) {
                        statusStr = "审核中";
                    }
                    else if (data.Status == 4) {
                        statusStr = "审核失败";
                    }
                    else if(data.Status == 0) {
                        statusStr = "未提交审核";
                    }else {
                        statusStr = "审核成功";
                    }
                    var $div = $("<div class='my_users_div'><p class='col-xs-2 my_users'><img src='" + data.Avatar + "'></p><p class='col-xs-6 users'><span class='dsew'>" + data.Name + "</span><span>" + data.Phone + "</span></p><p class='col-xs-4 users'><span class='users_a' >" + statusStr + "</span></p></div>");

                    $div.appendTo($("#org_list"));
                }
            }

        },
        error: function () {
            // layer.open({
            //     content: '服务器连接失败，请稍后再试'
            //     , skin: 'msg'
            //     , time: 2 //2秒后自动关闭
            // });

        }
    })
}
$("#preservation_sw").click(function () {
    window.location.href = "invitation.html?token=" + util.getToken();
});

var isUserLock = false;
var isOrgLock = false;

var userPageIndex = 0;
var orgPageIndex = 0;
var _type = 1;

$("#grtj").click(function () {
    $("#profile").remove();
    _type = 1;
    $("#user_list").show();
    $("#org_list").hide();
    $("#ckdiue").hide();

    reconm(userPageIndex);

});
$("#sjtj").click(function () {
    $("#home").remove()

    _type = 2;
    $("#user_list").hide();
    $("#org_list").show();
    $("#ckdiue").hide();

    sjtj(orgPageIndex);

});

var isLock = false;
$(function () {
    reconm(userPageIndex);
    $(window).scroll(function () {
        if (isLock == false) {
            isLock = true;
            setTimeout(function () {
                isLock = false;
                if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
                    if (_type == 1) {
                        if (isUserLock == false) {
                            isUserLock = true;
                            reconm(userPageIndex);
                        }
                    }
                    else if (_type == 2) {
                        if (isOrgLock == false) {
                            isOrgLock = true;
                            sjtj(orgPageIndex);
                        }
                    }
                }
            }, 1000);
        }
    });

})