"use strict";
//按钮绑定事件,先请求接口保存数据再跳转

var off= true;
function BindSave() {
    $("#four").on('click', function () {
        // 获取字符串
        var penBank = $("#value1").val().split(',');
        var BankCode = penBank[1];       // 开户行
        var BankName= $("#legalOpenBank").val()
        //    法人/委托人 

        var text = { //获取input的val
            LegalName: $("#legalName").val(),   //姓名
            LegalIdNo: $("#legalIdentityNum").val(),  //身份证
            CardType:$("#qyone").attr("mer"),      //   法人/委托人
            BankNo: $("#legalBankNum").val(),   //银行卡号      
            BankSubName: $("#legalBankChild").val(),  //支行
            CardId:$("#CardId").val(),        //银行卡编号
            AttorneyName:$("#wtr_name").val()           //委托人姓名
	        
			      
	
        };

        //获取图片
        var handIdentity = $("[name=handIdentity]");     //手持
        var legalIdentityFront = $("[name=legalIdentityFront]");   //正面
        var legalIdentityReverse = $("[name=legalIdentityReverse]");  //背面
        var legalBank = $("[name=legalBank]");      //银行卡
        var AttorneyPicId_z = $("[name=AttorneyPicId_z]");      //授权委托书
        var OrgCode = $("#data_OrgCode").val();

        //手持身份证
        var LegalIdPicId = "";
        for (var i = 0; i < handIdentity.length; i++) {
            LegalIdPicId = $(handIdentity[i]).val();
        };
       
        //法人身份证正面照
        var LegalIdFrontPicId = "";
        for (var i = 0; i < legalIdentityFront.length; i++) {
            LegalIdFrontPicId  = $(legalIdentityFront[i]).val();
        };
        //法人身份证背面照
        var LegalIdBackPicId = "";
        for (var i = 0; i < legalIdentityReverse.length; i++) {
            LegalIdBackPicId=($(legalIdentityReverse[i]).val());
        };
        //法人银行卡照片
        var LegalBankPicId = "";
        for (var i = 0; i < legalBank.length; i++) {
            LegalBankPicId=($(legalBank[i]).val());
        };

        //法人委托书
        var AttorneyPicIds = "";
        for (var i = 0; i < AttorneyPicId_z.length; i++) {
            AttorneyPicIds=($(AttorneyPicId_z[i]).val());
        };


        var url = HOST + "/WxPublic/SaveOrg4";
        var OrgCode = $("#data_OrgCode").val();
        $.post(util.GetNewUrl(url), {
            OrgCode:OrgCode,
            LegalName: text.LegalName,    // 姓名
            LegalIdNo: text.LegalIdNo,   // 身份证
            BankNo: text.BankNo,       //银行卡
            CardType:text.CardType,     // 类型
            BankName: BankName,     //开户行
            BankSubName: text.BankSubName,    ///  支行
            AttorneyName: text.AttorneyName,    ///  委托人姓名
            CardId:text.CardId,       // 银行卡编号
	        BankCode:BankCode,       // 银行编号
	
	        AttorneyPicId: AttorneyPicIds,   //委托书
	        IdPicId: LegalIdPicId,              //身份证
	        IdFrontPicId: LegalIdFrontPicId,    //手持正面
	        IdBackPicId: LegalIdBackPicId,     //手持背面
            BankPicId: LegalBankPicId       //银行卡

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
//选择法人还是委托人
$("#qyone").attr("mer",1)

$(".esec").on("click", function () {
    if(off){
        if ($(this).html() == "法人") {
            $("#qyone").attr("mer",1)     
            qigt("#frs","#wts",1)  
            tab(1)
        } else {
            $("#qyone").attr("mer",2)
            qigt("#frs","#wts",2)
            tab(2)
        }
    }
    return
    
})


function tab(ifnu){
    var htm = "法人身份证";
    var htm_2 = "委托人身份证";
    var htm3 = "法人银行卡";
    var htm_3 = "委托人银行卡";

    if(ifnu == 1){
        $("#frsfz").html(htm);
        $("#frsfz_z").html(htm);
        $("#fryinh").html(htm3);
        $("#yinhangkh").html(htm3);
        $(".wtr").hide();

    }else{
        $("#frsfz").html(htm_2);
        $("#frsfz_z").html(htm_2);
        $("#fryinh").html(htm_3);
        $("#yinhangkh").html(htm_3);
        $(".wtr").show();    
    }
}





//选择法人还是委托人
function qigt(obj,nbj,ifnu) {
    if(ifnu == 1){
	    $(obj).addClass("dsyuxe");
	    $(obj).removeClass("dsyuxe_no");
	    $(nbj).removeClass("dsyuxe");
	    $(nbj).addClass("dsyuxe_no");
    }else {
	    $(obj).removeClass("dsyuxe");
	    $(obj).addClass("dsyuxe_no");
	    $(nbj).addClass("dsyuxe");
	    $(nbj).removeClass("dsyuxe_no");
    }
    
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
                    var bank= JSON.parse(bankList[i].ContentText);
                    var jsn1 = {
                        id: bank.Code,
                        name: bank.Name,
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
        var nune = $("#legalBankNum").val()
        if(nune !== ""){
            luhmCheck(nune)
            
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
            if (result.Code == 100 ) {
                if(result.Data.CardId){
                    $("#CardId").val(result.Data.CardId)
                } 

                if(result.Data.CardType == 2){
                    $("#qyone").attr("mer",2)
                    qigt("#frs","#wts",2)
                    tab(2)
                }
                console.log(result.Data.CardType)
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
                    off = false
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
    if (data.BankNo){
        $("#legalBankNum").val(data.BankNo);  //法人银行卡号
    }
    if (data.BankName){
        $("#legalOpenBank").val(data.BankName);  //法人开户行
    }
    

    if (data.BankSubName){
        $("#legalBankChild").val(data.BankSubName);  //法人开户地址支行
    }
	
	if (data.AttorneyName){
		$("#wtr_name").val(data.AttorneyName);  //委托人姓名
	}

    $("#data_OrgCode").val(data.OrgCode);
    $("#CardId").val(data.CardId);


    $("body").show();
    if (data.IdPic != null) {    //法人身分证手持
        var html =
            "<div  class='file-item webuploader-pick'>" +
            "<img class='addimg' src='" + data.IdPic.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='handIdentity' value='" + data.IdPic.PictureId + "'>" +
            "</div>";
        $("#handIdentity_1").append(html);
        $("#handIdentity_2").hide();
    }
    if (data.IdFrontPic != null) {  //法人身份证正面
        var html =
            "<div  class='file-item webuploader-pick'>" +
            "<img class='addimg' src='" + data.IdFrontPic.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='legalIdentityFront' value='" + data.IdFrontPic.PictureId + "'>" +
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
    if (data.IdBackPic != null) {  //法人身份证背面
        var html =
            "<div  class='file-item webuploader-pick'>" +
            "<img class='addimg' src='" + data.IdBackPic.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='legalIdentityReverse' value='" + data.IdBackPic.PictureId + "'>" +
            "</div>";

        $("#legalIdentityReverse_1").append(html);
        $("#legalIdentityReverse_2").hide();
    }









    if (data.BankPic != null) {  //法人银行卡
        var html =
            "<div  class='file-item webuploader-pick'>" +
            "<img class='addimg' src='" + data.BankPic.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
            "<input type='hidden' name='legalBank' value='" + data.BankPic.PictureId + "'>" +
            "</div>";
        $("#legalBank_1").append(html);
       $("#legalBank_2").hide();
    }
	
	
	// if (data.AttorneyPic != null) {  //法人委托书
	// 	var html =
	// 			"<div  class='file-item webuploader-pick'>" +
	// 			"<img class='addimg' src='" + data.AttorneyPic.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
	// 			"<input type='hidden' name='legalBank' value='" + data.AttorneyPic.PictureId + "'>" +
	// 			"</div>";
	// 	$("#legalBank_1_c").append(html);
	// 	$("#legalBank_2_c").hide();
	// }
	
	if (data.AttorneyPic != null) {    //法人委托书
		var html =
				"<div  class='file-item webuploader-pick'>" +
				"<img class='addimg' src='" + data.AttorneyPic.PictureUrl + "'><span class='filea_span' style='text-align: center;width:1em;herght:1em;position: absolute;'  onclick='removeImg(this)'>X</span>" +
				"<input type='hidden' name='AttorneyPicId_z' value='" + data.AttorneyPic.PictureId + "'>" +
				"</div>";
		$("#legalBank_1_c").append(html);
		$("#legalBank_2_c").hide();
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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




}











