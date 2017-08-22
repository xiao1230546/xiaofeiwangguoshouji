"use strict";



//判断是法人还是委托人
$("#qyone").attr("mer",1)
$(".qylxds").on("click", function () {
    console.log($(this).val())
    if ($(this).val() == "法人") {
        $("#qyone").attr("mer",1)
        if_s()
    } else {
        $("#qyone").attr("mer",2)
        if_s()
    }
    .
})
//按钮绑定事件,先请求接口保存数据再跳转
function BindSave() {
    $("#four").on('click', function () {
        // 获取字符串
        var penBank = $("#value1").val().split(',');
        var legalOpenBank = penBank[1];       //银行卡
        var text = { //获取input的val
            legalName: $("#legalName").val(),
            legalIdentityNum: $("#legalIdentityNum").val(),
            legalBankNum: $("#legalBankNum").val(),
            legalBankChild: $("#legalBankChild").val()
        }

        //获取图片
        var handIdentity = $("[name=handIdentity]");     //手持
        var legalIdentityFront = $("[name=legalIdentityFront]");   //正面
        var legalIdentityReverse = $("[name=legalIdentityReverse]");  //背面
        var legalBank = $("[name=legalBank]");
        var OrgCode = $("#data_OrgCode").val()

        //手持身份证
        var LegalIdPicId = "";
        for (var i = 0; i < handIdentity.length; i++) {
            LegalIdPicId = $(handIdentity[i]).val();
        }
        console.log(LegalIdPicId)
        //法人身份证正面照
        var LegalIdFrontPicId = "";
        for (var i = 0; i < legalIdentityFront.length; i++) {
            LegalIdFrontPicId  = $(legalIdentityFront[i]).val();
        }
        //法人身份证背面照
        var LegalIdBackPicId = "";
        for (var i = 0; i < legalIdentityReverse.length; i++) {
            LegalIdBackPicId=($(legalIdentityReverse[i]).val());
        }
        //法人银行卡照片
        var LegalBankPicId = "";
        for (var i = 0; i < legalBank.length; i++) {
            LegalBankPicId=($(legalBank[i]).val());
        }

        var url = HOST + "/WxPublic/SaveOrg4";
        var OrgCode = $("#data_OrgCode").val();
        $.post(util.GetNewUrl(url), {
            OrgCode:OrgCode,
            LegalName: text.legalName,
            LegalIdNo: text.legalIdentityNum,
            LegalBankNo: text.legalBankNum,
            LegalBankName: legalOpenBank,
            LegalBankSubName: text.legalBankChild,

            LegalIdPicId: LegalIdPicId,
            LegalIdFrontPicId: LegalIdFrontPicId,
            LegalIdBackPicId: LegalIdBackPicId,
            LegalBankPicId: LegalBankPicId,

        }, function (result) {
            if (result.Code == 100) {
                window.location.href = "audit.html?token=" + util.getToken();
            }
            else {
                util.showToast(result.Desc);
            }

        })
    });

}
//绑定按钮事件,直接跳转
function BindRedirect() {
    $("#four").on("click",function () {
        $("#four").attr("disabled","disabled");
        window.location.href = "org1.html?token=" + util.getToken();
    })
}


//获取银行信息
var banks = [];
function getBanks() {
    var url = util.GetNewUrl(HOST + "Operator/GetContentListByCategoryCode?CategoryCode=819d6429fb76a39164bda0264f7f8c55");
    $.ajax({
        // 获取行业类别
        url: url,
        data: {
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.Code == 100) {
                // 循环当前数据
                var bankList = result.Data.PageData;
                var jsn = {
                    id: "",
                    name: "",
                    child: []
                };

                for (var i = 0; i < bankList.length; i++) {
                    var jsn1 = {
                        id: bankList[i].ContentName,
                        name: bankList[i].ContentName,
                        child: []
                    };
                    jsn.child.push(jsn1);
                };
                banks.push(jsn);
                var area = new LArea();
                area.init({
                    'trigger': '#legalOpenBank',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                    'valueTo': '#value1',//选择完毕后id属性输出到该位置
                    'keys': { id: 'id', name: 'name' },//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                    'data': banks//数据源
                });
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



$(function () {
    $("#legalIdentityNum").blur(function () {
        Identity(this)
    })

    $("#legalBankNum").blur(function () {
        var nune = $("#legalBankNum").val();
        var nune_this = $("#legalBankNum");
        if(nune != ""){
            luhmCheck(nune,nune_this)
        }

    })



    $("#legalIdentitys").find("input").attr("disabled","disabled");
    var url = util.GetNewUrl(HOST + "WxPublic/GetOrgInfo4");
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
                    $("#legalIdentitys").find("input").removeAttr("disabled");
                    $(".error_a").show();
                    BindSave();
                    return
                }else if(result.Data.Status == 0){   //未提交审核
                    $("#legalIdentitys").find("input").removeAttr("disabled");
                    //商家未注册,先保存再跳转
                    BindSave();
                    return
                }else{
                    $("#legalIdentitys").find("input").attr("disabled","disabled");
                    $(".filea_span").hide()
                    $("#four").val("保存")
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

    getBanks();
})

//绑定页面数据

function bindData(data) {
//展示信息
    if (data.LegalName){
        $("#legalName").val(data.LegalName);    //法人姓名
    }
    if (data.LegalIdNo){
        $("#legalIdentityNum").val(data.LegalIdNo);  //法人身份证号
    }
    if (data.LegalBankNo){
        $("#legalBankNum").val(data.LegalBankNo);  //法人银行卡号
    }
    if (data.LegalBankName){
        $("#legalOpenBank").val(data.LegalBankName);  //法人开户行
    }
    console.log(data.LegalBankName)

    if (data.LegalBankSubName){
        $("#legalBankChild").val(data.LegalBankSubName);  //法人开户地址支行
    }

    $("#data_OrgCode").val(data.OrgCode);
    $("body").show();
    if (data.LegalId != null) {    //法人身分证手持
        var html =
            "<div  class='file-item webuploader-pick'>" +
            "<img class='addimg' src='" + data.LegalId.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='handIdentity' value='" + data.LegalId.PictureId + "'>" +
            "</div>";
        $("#handIdentity_1").append(html);
        $("#handIdentity_2").hide();
    }
    if (data.LegalIdFront != null) {  //法人身份证正面
        var html =
            "<div  class='file-item webuploader-pick'>" +
            "<img class='addimg' src='" + data.LegalIdFront.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='legalIdentityFront' value='" + data.LegalIdFront.PictureId + "'>" +
            "</div>";

        $("#legalIdentityFront_1").append(html);
        $("#legalIdentityFront_2").hide();
    }
    // if (data.LegalIdBack != null && data.LegalIdBack.length > 0) {  //法人身份证背面
    //     for (var i = 0; i < data.LegalIdBack.length; i++) {
    //         var promise = data.LegalIdBack[i];
    //         var html =
    //             "<div  class='file-item webuploader-pick'>" +
    //             "<img class='addimg' src='" + promise.PictureUrl + "'><span id='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
    //             "<input type='hidden' name='sjimgIds' value='" + promise.PictureId + "'>" +
    //             "</div>";
    //         $("#legalIdentityReverse_1").append(html);
    //     }
    // }
    if (data.LegalIdBack != null) {  //法人身份证背面
        var html =
            "<div  class='file-item webuploader-pick'>" +
            "<img class='addimg' src='" + data.LegalIdBack.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='legalIdentityReverse' value='" + data.LegalIdBack.PictureId + "'>" +
            "</div>";

        $("#legalIdentityReverse_1").append(html);
        $("#legalIdentityReverse_2").hide();
    }









    if (data.LegalBank != null) {  //法人银行卡
        var html =
            "<div  class='file-item webuploader-pick'>" +
            "<img class='addimg' src='" + data.LegalBank.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='legalBank' value='" + data.LegalBank.PictureId + "'>" +
            "</div>";
        $("#legalBank_1").append(html);
       $("#legalBank_2").hide();
    }
    console.log(data.LegalIdBack)
    // if (data.LegalBank != null && data.LegalBank.length >= 0) { //银行卡
    //     for (var i = 0; i < data.LegalBank.length; i++) {
    //         var ReferrerPromise = data.LegalBank[i];
    //         var html =
    //             "<div  class='file-item webuploader-pick'>" +
    //             "<img class='addimg' src='" + ReferrerPromise.PictureUrl + "'><span id='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
    //             "<input type='hidden' name='simgIds' value='" + ReferrerPromise.PictureId + "'>" +
    //             "</div>";
    //
    //         $("#legalBank_1").append(html);
    //     }
    // }





    function if_s() {
        if($("#qyone").attr("mer") == 1){
            $("#legal_id").html("法人身份证")
            $("#legal_id_1").html("法人身份证")
            $("#legal_id_2").html("法人银行卡")
            $("#legal_id_3").html("法人银行卡")
            $("#legal_id_6").hide()
            $("#frsq").hide()
        }else {
            $("#legal_id").html("委托人身份证")
            $("#legal_id_1").html("委托人身份证")
            $("#legal_id_2").html("委托人银行卡")
            $("#legal_id_3").html("委托人银行卡")
            $("#legalBankNum").attr("placeholder","请填写委托人银行卡卡号")
            $("#legal_id_6").show()
            $("#frsq").show()
        }
    }


}











