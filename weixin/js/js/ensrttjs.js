"use strict";
$("#preservation_a").removeAttr("disabled");
$("#preservation_a").on('click', function () {
    $("#preservation_a").attr("disabled", "disabled");
    var orgCode = $("#OrgCode").val();
    var logoimgIds = $("[name=logoimgIds]");
    var org = $("#qymc").val();  //企业名称
    var uni = $("#xydm").val();  //企业代码
    var imgIds = $("[name=imgIds]");            //图片
    var simgIds = $("[name=simgIds]");
    var sjimgIds = $("[name=sjimgIds]");

    var LogoPicId = "";
    for (var i = 0; i < logoimgIds.length; i++) {
        LogoPicId = $(logoimgIds[i]).val();
    }
    var LicensePicId = "";
    for (var i = 0; i < imgIds.length; i++) {
        LicensePicId = $(imgIds[i]).val();
    }
    //商家承诺书
    var PromisePiclds = new Array();
    for (var i = 0; i < sjimgIds.length; i++) {
        PromisePiclds.push($(sjimgIds[i]).val());
    }
    var PlacePicIds = new Array();
    for (var i = 0; i < simgIds.length; i++) {
        PlacePicIds.push($(simgIds[i]).val());
    }
    if (org.length == 0 || LicensePicId.length == 0 || PlacePicIds.length == 0 || uni.length == 0 || PromisePiclds.length == 0) {
        util.showToast("信息不全，请重新输入");
        $("#preservation_a").removeAttr("disabled");
        return;
    }

    var url = HOST + "/WxPublic/AddOrg";
    $.post(util.GetNewUrl(url), {
        OrgCode:orgCode,
        OrgName: org,
        UnionCode: uni,
        LicensePicId: LicensePicId,
        PlacePicIds: PlacePicIds,
        PromisePicIds: PromisePiclds,
        LogoPicId: LogoPicId
    }, function (result) {
        if (result.Code == 100) {
            window.location.href = "audit.html?token=" + util.getToken();
        }
        else {

            util.showToast(result.Desc);
        }
        $("#preservation_a").removeAttr("disabled");
    })
});




function settler() {
    var url = HOST + "WxPublic/GetOrgInfo";
    $.get(util.GetNewUrl(url), function (result) {
        if (result.Code == 100) {
            $("#OrgCode").val(result.Data.OrgCode);
           
            $("#qymc").val(result.Data.OrgName);
            $("#xydm").val(result.Data.UnionCode);
            var shsbyy = result.Data.AuditMessages;

             console.log(shsbyy)
            // for (var i = 0; i < shsbyy.length; i++) {
            //         var promise = shsbyy[i];
            //         var html = "<p>"+promise+"<p>";
            //         $(".shsb").append(html);
            // }
            if (result.Data.Logo != null) {
                var html =
                    "<div style='margin: 1em 0' class='file-item webuploader-pick'>" +
                    "<img class='addimg' src='" + result.Data.Logo.PictureUrl + "'><span id='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
                    "<input type='hidden' name='logoimgIds' value='" + result.Data.Logo.PictureId + "'>" +
                    "</div>";

                $("#fileList_3").append(html);
                $("#filePicker_3").hide();

            }
            if (result.Data.License != null) {
                var html =
                    "<div style='margin: 1em 0' class='file-item webuploader-pick'>" +
                    "<img class='addimg' src='" + result.Data.License.PictureUrl + "'><span id='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
                    "<input type='hidden' name='imgIds' value='" + result.Data.License.PictureId + "'>" +
                    "</div>";

                $("#fileList").append(html);

                $("#filePicker").hide();
            }
            if (result.Data.Promises != null && result.Data.Promises.length > 0) {
                for (var i = 0; i < result.Data.Promises.length; i++) {
                    var promise = result.Data.Promises[i];
                    var html =
                        "<div style='margin: 1em 0' class='file-item webuploader-pick'>" +
                        "<img class='addimg' src='" + promise.PictureUrl + "'><span id='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
                        "<input type='hidden' name='sjimgIds' value='" + promise.PictureId + "'>" +
                        "</div>";

                    $("#fileList_2").append(html);
                }
            }
            if (result.Data.Places != null && result.Data.Places.length > 0) {
                for (var i = 0; i < result.Data.Places.length; i++) {
                    var places = result.Data.Places[i];
                    var html =
                        "<div style='margin: 1em 0' class='file-item webuploader-pick'>" +
                        "<img class='addimg' src='" + places.PictureUrl + "'><span id='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
                        "<input type='hidden' name='simgIds' value='" + places.PictureId + "'>" +
                        "</div>";

                    $("#fileList_1").append(html);
                }
            }
        }
    });
}

function removeImg(obj) {
    $(obj).parent().remove();
    $("#filePicker").show();
}
