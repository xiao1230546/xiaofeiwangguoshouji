"use strict";
//按钮绑定事件,先请求接口保存数据再跳转
function BindSave() {
    $("#three").on('click', function () {
        var logoimgIds = $("[name=logoimgIds]"); //logo

        var imgIds = $("[name=imgIds]");            //营业执照
        //var simgIds = $("[name=simgIds]");       //推荐人
        var sjimgIds = $("[name=sjimgIds]");      //商家
        var tsjyimgIds = $("[name=tsjyimgIds]");   //特殊行业
        var mtzimgIds = $("[name=mtzimgIds]");     //门头
        var njimgIds = $("[name=njimgIds]");    //内景
        var cpimgIds = $("[name=cpimgIds]");     //产品
        //logo
        var LogoPicId = "";
        for (var i = 0; i < logoimgIds.length; i++) {
            LogoPicId = $(logoimgIds[i]).val();

        }
        console.log(LogoPicId)
        //营业执照
        var LicensePicId = "";
        for (var i = 0; i < imgIds.length; i++) {
            LicensePicId = $(imgIds[i]).val();

        }
        //商家承诺书
        
        var OrgPromisePicIds = new Array();
        for (var i = 0; i < sjimgIds.length; i++) {
            OrgPromisePicIds.push($(sjimgIds[i]).val());
        }
        //门头
        var StorefrontPicIds = new Array();
        for (var i = 0; i <mtzimgIds.length; i++) {
            StorefrontPicIds.push($(mtzimgIds[i]).val());
        }

//推荐人
//         var ReferrerPromisePicIds = new Array();
//         for (var i = 0; i < simgIds.length; i++) {
//             ReferrerPromisePicIds.push($(simgIds[i]).val());
//         }
        //特殊行业
        var SpecialPicIds = "";
        for (var i = 0; i < tsjyimgIds.length; i++) {
            SpecialPicIds=($(tsjyimgIds[i]).val());
        }

        //内景图片
        var PlacePicIds = new Array();
        for (var i = 0; i < njimgIds.length; i++) {
            PlacePicIds.push($(njimgIds[i]).val());
        }

        //产品图片
        var ProductPicIds = new Array();
        for (var i = 0; i < cpimgIds.length; i++) {
            ProductPicIds.push($(cpimgIds[i]).val());
        }
        if (LicensePicId.length == 0 || OrgPromisePicIds.length == 0  || StorefrontPicIds.length == 0 || PlacePicIds.length == 0 || ProductPicIds.length == 0) {
            util.showToast("信息不全，请重新输入");
            return;
        }

        var url = HOST + "/WxPublic/SaveOrg3";

        var OrgCode = $("#data_OrgCode").val()
        util.showBusy("请求中");
        $.post(util.GetNewUrl(url), {
            OrgCode:OrgCode,     //商家编号
            LogoPicId: LogoPicId,   //商家logo
            LicensePicId: LicensePicId,    //营业执照
            OrgPromisePicIds: OrgPromisePicIds,   //  商家承诺
           // ReferrerPromisePicIds: ReferrerPromisePicIds,   //推荐人承诺
            SpecialPicIds: SpecialPicIds,                    //特殊行业
            StorefrontPicIds: StorefrontPicIds,     //   门头照
            PlacePicIds: PlacePicIds, //tel,        // 内景
            ProductPicIds: ProductPicIds    // 产品
        }, function (result) {
            util.closeBusy();

            if (result.Code == 100) {
                window.location.href = "org4.html?token=" + util.getToken();
            }
            else {
                util.showToast(result.Desc);
            }

        })
    });
}
//绑定按钮事件,直接跳转
function BindRedirect() {
    $("#three").on("click",function () {
        $("#three").attr("disabled","disabled");
        window.location.href = "org4.html?token=" + util.getToken();
    })
}














$(function () {
    $("#main").find("input").attr("disabled","disabled");
    var url = util.GetNewUrl(HOST + "WxPublic/GetOrgInfo3");
    $.ajax({
        url: url,
        data: {},
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.Code == 100) {
                //绑定数据
                bindData(result.Data);
                if (result.Data.Status == 4 ) { //审核失败
                    error(result.Data)
                    $("#main").find("input").removeAttr("disabled");
                    $(".error_a").show();
                    BindSave();
                    return
                }else if(result.Data.Status == 0){   //未提交审核
                    $("#main ").find("input").removeAttr("disabled");
                    //商家未注册,先保存再跳转
                    BindSave();
                    return
                }else{
                    $(".filea_span").hide()
                    $(".org_3img_a").hide()
                    $("#main").find("input").attr("disabled","disabled");
                    $("#three").val("下一页")
                    BindRedirect();
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

//绑定页面数据

function bindData(data) {
//展示信息
    $("#data_OrgCode").val(data.OrgCode);
    $("body").show();
    if (data.Logo != null) {    //企业LOGO图片
        var html =
            "<div  class='file-item webuploader-pick '>" +
            "<img onclick='removeImg(this)' class='addimg' src='" + data.Logo.PictureUrl + "'><span class='filea_span' style='text-align: center;width:100%;herght:100%;position: absolute;left: 0;top: 0;'  >X</span>" +
            "<input type='hidden' name='logoimgIds' value='" + data.Logo.PictureId + "'>" +
            "</div>";
        $("#fileList_3").append(html);
        //$("#filePicker").hide();
    }
    if (data.License != null) {  //企业营业执照
        var html =
            "<div  class='file-item webuploader-pick org_3img'>" +
            "<img class='addimg' src='" + data.License.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='imgIds' value='" + data.License.PictureId + "'>" +
            "</div>";

        $("#fileList").append(html);
        $("#filePicker").hide();
    }
    if (data.OrgPromise != null && data.OrgPromise.length > 0) {  //商家承诺书
        for (var i = 0; i < data.OrgPromise.length; i++) {
            var promise = data.OrgPromise[i];
            var html =
                "<div  class='file-item webuploader-pick org_3img'>" +
                "<img class='addimg' src='" + promise.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
                "<input type='hidden' name='sjimgIds' value='" + promise.PictureId + "'>" +
                "</div>";

            $("#fileList_2").append(html);
            $("#filePicker_2").hide();
        }
    }
    // if (data.ReferrerPromise != null && data.ReferrerPromise.length > 0) { //推荐人承诺书
    //     for (var i = 0; i < data.ReferrerPromise.length; i++) {
    //         var ReferrerPromise = data.ReferrerPromise[i];
    //         var html =
    //             "<div  class='file-item webuploader-pick org_3img'>" +
    //             "<img class='addimg' src='" + ReferrerPromise.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
    //             "<input type='hidden' name='simgIds' value='" + ReferrerPromise.PictureId + "'>" +
    //             "</div>";
    //
    //         $("#fileList_1").append(html);
    //         $("#filePicker_1").hide();
    //     }
    // }
    if (data.Special != null && data.Special.length > 0) { //特殊行业经营许可证
        for (var i = 0; i < data.Special.length; i++) {
            var Special = data.Special[i];
            var html =
                "<div  class='file-item webuploader-pick org_3img'>" +
                "<img class='addimg' src='" + Special.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
                "<input type='hidden' name='tsjyimgIds' value='" + Special.PictureId + "'>" +
                "</div>";

            $("#fileList_4").append(html);
            $("#filePicker_4").hide();
        }

    }
    console.log(data.OrgCode)
    if (data.Product != null && data.Product.length > 0) { //产品图片
        for (var i = 0; i < data.Product.length; i++) {
            var Product = data.Product[i];
            var html =
                "<div  class='file-item webuploader-pick org_3img'>" +
                "<img class='addimg' src='" + Product.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
                "<input type='hidden' name='cpimgIds' value='" + Product.PictureId + "'>" +
                "</div>";

            $("#fileList_7").append(html);
            $("#filePicker_7").hide();
        }
    }
    if (data.Storefront != null && data.Storefront.length > 0) { //门头图片
        for (var i = 0; i < data.Storefront.length; i++) {
            var Storefront = data.Storefront[i];
            var html =
                "<div  class='file-item webuploader-pick org_3img'>" +
                "<img class='addimg' src='" + Storefront.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
                "<input type='hidden' name='mtzimgIds' value='" + Storefront.PictureId + "'>" +
                "</div>";

            $("#fileList_5").append(html);
            $("#filePicker_5").hide();
        }
    }
    if (data.Place != null && data.Place.length > 0) { //内景图片
        for (var i = 0; i < data.Place.length; i++) {
            var Place = data.Place[i];
            var html =
                "<div  class='file-item webuploader-pick org_3img'>" +
            "<img class='addimg' src='" + Place.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='njimgIds' value='" + Place.PictureId + "'>" +
            "</div>";
            $("#fileList_6").append(html);
            $("#filePicker_6").hide();

        }
    }



}










