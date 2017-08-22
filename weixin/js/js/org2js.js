"use strict";

var off = true;

    function cszs() {
        $("#main").find("input").attr("disabled", "disabled");
        var url = util.GetNewUrl(HOST + "WxPublic/GetOrgInfo2");
        $.ajax({
            url: url,
            data: {},
            type: 'get',
            dataType: 'json',
            success: function (result) {
                if (result.Code == 100) {
                    //绑定数据
                    bindData(result.Data);
                    if (result.Data.Status == 4) { //审核失败
                        
                        error(result.Data)
                        $("#main").find("input").removeAttr("disabled");
                        $(".error_a").show();
                        BindSave();
                        return

                    } else if (result.Data.Status == 0) {   //未提交审核
                        $("#main").find("input").removeAttr("disabled");
                        //商家未注册,先保存再跳转
                        BindSave();
                        return
                    } else {
                        off = false;
                        Disabl();
                        BindRedirect();
                        
	                    

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



$("#qyone").attr("mer",1)

$(".esec").on("click", function () {
    if(off){
        if ($(this).html() == "企业") {
            $("#qyone").attr("mer",1)     
            qigt("#qi","#gt",1)  
        } else {
            $("#qyone").attr("mer",2)
            qigt("#qi","#gt",2)
        }
    }
    return
    
})

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



//按钮绑定事件,先请求接口保存数据再跳转
function BindSave() {
    $("#one").on("click", function () {
        var OrgCode = $("#OrgCode").val();       //商家编号
        var OrgName = $("#orgname").val();         //企业名称
        var UnionCode = $("#UnionCode").val();  //统一代码
        var MerctType = $("#qyone").attr("mer")
        var IndustryIds = $("#value2").val();       //行业类别

        //让利率
        var Lir = $("#rll").attr("name")
        var Tel = $("#lxdh").val();      //联系电话
        var Address = $("#xxdz").val();     //详细地址

        //经纬度
        var arr = $("#value3").val().split('-');
        var Lat = arr[1];   //纬度
        var Lng = arr[0];   //经度

        //城市区域
        var lis = $("#value1").val().split(',');
        var ProvinceId = lis[0];    //省
        var CityId = lis[1];       //城
        var DistrictId = lis[2];   //区

        var url = util.GetNewUrl(HOST + "WxPublic/SaveOrg2");
        util.showBusy("请求中");
        $.ajax({
            url: url,
            data: {
                OrgCode: OrgCode,
                OrgName: OrgName,
                UnionCode: UnionCode,
                MerchantType: MerctType,
                IndustryIds: IndustryIds,
                Lir: Lir,
                Tel: Tel,
                Address: Address,
                Lat: Lat,
                Lng: Lng,
                ProvinceId: ProvinceId,
                CityId: CityId,
                DistrictId: DistrictId
            },
            type: 'POST',
            dataType: 'json',
            success: function (result) {
                util.closeBusy();
                if (result.Code == 100) {
                    window.location.href = "org3.html?token=" + util.getToken();
                } else {
                    util.showToast(result.Desc);
                }
            },
            error: function () {
                util.closeBusy();
                util.showToast("服务器连接失败,请稍后再试")
            }
        })
    })
}

//绑定按钮事件,直接跳转
function BindRedirect() {
    $("#one").on("click", function () {
        $("#one").attr("disabled", "disabled");
        window.location.href = "org3.html?token=" + util.getToken();
    })
}

//绑定页面数据
var posh;
function bindData(data) {
    //展示信息
    $("#orgname").val(data.OrgName);   //企业名称
    if (data.UnionCode) {
        $("#UnionCode").val(data.UnionCode);
    }

    $("#OrgCode").val(data.OrgCode);

    // 商家类型
    if(data.MerchantType){
        
        if (data.MerchantType == 1) {
	        qigt("#qi","#gt",1);
         
        } else {
	        qigt("#qi","#gt",2);
        }
    }


    //行业类别
    if (data.Industry){

        var industryId = data.Industry;
        var indust = "";
        console.log(industry)
        var industryName = "";
        var naser = "";
        for (var j = 0; j < industry.length; j++) {
            if (industry[j].IndustryId== industryId) {
                industryName = industry[j].Name;
                indust = industry[j].ParentId;
            }
        }
        for(var i = 0 ; i<industry.length;i++){
            if (industry[i].IndustryId == indust) {
                naser = industry[i].Name;
            }
        }
        if (naser != "" || industryName != "") {
            $("#demo2").val(naser + "-" + industryName);
            $("#value2").val(industryId);
        }
    }



    //让利率
    if (data.Lir == 0.05) {
        $("#rll").val("5%");
        $("#rll").attr("name", 0.05);
    } if (data.Lir == 0.08) {
        $("#rll").val("8%");
        $("#rll").attr("name", 0.08);
    } if (data.Lir == 0.1) {
        $("#rll").val("10%");
        $("#rll").attr("name", 0.1);
    } if (data.Lir == 0.2) {
        $("#rll").val("20%");
        $("#rll").attr("name", 0.2);
    }

    // 联系电话
    $("#lxdh").val(data.Tel);


    // 行政区域
    if(data.ProvinceId){
        $("#value1").val(data.ProvinceId + "," + data.CityId + "," + data.DistrictId);
        $("#demo1").val(data.Province + data.City + data.District);
    }

    // 详细地址
    $("#xxdz").val(data.Address);

    //地图定位
    if(data.Lat > 0 && data.Lng > 0){
        var point = new BMap.Point(data.Lng,data.Lat);
        var geoc = new BMap.Geocoder();
        var pt = point;
        geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;
            $("#demo3").val(addComp.province  + addComp.city  + addComp.district   + addComp.street + addComp.streetNumber);
            console.log(data.Lat)
        });
    }else {
        $("#demo3").val("未定位");
    }






}

//选择让利率





function in_data(lis, dat, dat_t, lids) {
    // 循环当前数据
    for (var i = 0; i < dat.length; i++) {
        if (dat[i].ParentId == dat_t) {
            lis.push(dat[i]);
            lids.push(dat[i].IndustryId);
        }
    };
}

function in_dcr(lis, obj, className, lids) {

    // 展示当前数据
    for (var j = 0; j < lis.length; j++) {
        var $div_bt = "<div eventId='" + lids[j] + "' class='" + className + "'>" + lis[j].Name + "</div>"
        $(obj).append($div_bt);
    }

}


isnde()

var industry = [];



function isnde() {
    var url = util.GetNewUrl(HOST + "Industry/GetAllIndustryCategoryList");
    $.ajax({
        // 获取行业类别
        url: url,
        data: {
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.Code == 100) {
                $("#Parent").html("");
                $("#Parent_a").html("");
                var list = [];
                var lid = [];
                in_data(list, result.Data, 0, lid);
                in_dcr(list, "#Parent", "tooth_c", lid);
                list = [];
                lid = [];
                in_data(list, result.Data, 1, lid);
                in_dcr(list, "#Parent_a", "tooth_1", lid);
                var $Parent = $("#Parent").find(".tooth_c");
                $Parent.eq(0).addClass("idbj");
                var $Pat = $("#Parent_a").find(".tooth_1");
                var nesa = $Parent.eq(0).html();
                $Pat.on("click", function () {
                    $(this).addClass("idbjOption").siblings().removeClass("idbjOption");
                    $("#dasde_a").animate({ left: "-500px" }, "slow");
                    $("#demo2").val(nesa + "-" + $(this).html());
                    var evid = $(this).attr("eventid");
                    $("#value2").val(evid);
                    console.log(evid);
                })
                $Parent.on("click", function () {
                    $(this).addClass("idbj").siblings().removeClass("idbj");
                    var list = [];
                    var lid = [];
                    $("#Parent_a").html("")
                    in_data(list, result.Data, $(this).attr("eventid"), lid);
                    in_dcr(list, "#Parent_a", "tooth_1", lid);

                    var nesa = $(this).html();

                    var $Pat = $("#Parent_a").find(".tooth_1");
                    $Pat.on("click", function () {
                        $(this).addClass("idbjOption").siblings().removeClass("idbjOption");
                        $("#dasde_a").animate({ left: "-500px" }, "slow");
                        $("#demo2").val(nesa + "-" + $(this).html());
                        var evid = $(this).attr("eventid");
                        $("#value2").val(evid);
                        console.log(evid);
                    })
                })
                industry = result.Data;
                cszs()
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

    $("#ranglilv").on("click", function () {
        if (off == false) {
            return
        }
        layer.open({
            title: [
                '选择让利率',
                'background-color: #FF4351; color:#fff;height:3em;'
            ]
            , content: '<div class="drlv"><div name="0.05" class="rlv">5%</div ><div name="0.08" class="rlv">8%</div><div name="0.1" class="rlv">10%</div><div name="0.2" class="rlv">20%</div></div>'
        });
        $(".rlv").on("click", function () {
            $("#rll").val($(this).html())
            $("#rll").attr("name", $(this).attr("name"))
            $(".layui-m-layerchild").hide();
            $(".layui-m-layershade").hide();
        })

    })

    var ling;
    var lats;

    // 行业选择层展示
    $("#hylb").click(function () {
        if (off == false) {
            return
        }
        $("#dasde_a").animate({ left: "0px" }, "slow")

    })
    var fla;
    // 地图定位
    getLocation()
    $("#mapd").on("click", function () {
        if (off == false) {
            return
        }
        $("#mayep").animate({ left: "0px" }, "slow");

    })

    $("#esstId").on("click", function () {
        $("#mayep").animate({ left: "-500px" }, "slow");
        if ($("#value3").val() == "") {
            $("#value3").val(ling + "-" + lats)

        }
    })


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(myFun);
        } else {
            alert("浏览器不支持地理定位。");
        }
    }

    function myFun(result) {
        var lag = result.center.lng; //经度
        var lat = result.center.lat; //纬度
        ling = lag
        lats = lat
        if (marker != null) {
            map.removeOverlay(marker); //如果marker已经存在，删除标记
        }
        point = new BMap.Point(lag, lat);
        map.centerAndZoom(point, 15);
        mar(point);
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);

    var marker;
    var map = new BMap.Map("allmap");    //创建地图实例
    var point;   // 创建坐标点

    var geoc = new BMap.Geocoder();  //详细地址




    function mar(obg) {
        marker = new BMap.Marker(obg);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        marker.enableDragging();
        marker.addEventListener("dragend", function (e) {
            console.log("当前位置：" + e.point.lng + ", " + e.point.lat);
            var pointlng = e.point.lng;
            var pointlat = e.point.lat;
            $("#value3").val(pointlng + "-" + pointlat)

            var s = e;
            b_inp(pointlng, pointlat, s)

        });
    }
    function checkMaker() {
        if (marker != null) {
            map.removeOverlay(marker); //如果marker已经存在，删除标记
        }
    };
    function b_inp(poin_t, poin_l, s) {    //信息展示

        var pt = s.point;
        geoc.getLocation(pt, function (rs) {
            var addComp = rs.addressComponents;
            var dz = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
            console.log(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            $("#demo3").val(dz)






            var opts = { width: 250, height: 100, title: "当前位置" }; //信息窗口
            var infoWindow = new BMap.InfoWindow("<div style='color:red;'>" + dz +"</div>", opts);
            var pointClick = new BMap.Point(poin_t, poin_l);
            map.openInfoWindow(infoWindow, pointClick);
            $("#value3").val(poin_t + "-" + poin_l)
        });


    }
    function showInfo(e) {
        var s = e;
        checkMaker();
        var pointlng = e.point.lng;
        var pointlat = e.point.lat;
        $("#value3").val(pointlng + "-" + pointlat)
        b_inp(pointlng, pointlat, s)
        console.log(e.point.lng + ", " + e.point.lat); // 点击地图出现的经纬度
        point = new BMap.Point(e.point.lng, e.point.lat);//捕捉点击的坐标值
        mar(point)
    }
    map.addEventListener("click", showInfo);
    //////////////////////////////////////////
    // 百度地图API功能
    function G(id) {
        return document.getElementById(id);
    }
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "suggestId"
            , "location": map
        });

    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;

        $("#demo3").val(value)
    });

    var myValue;
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        setPlace();


    });

    function setPlace(e) {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(e) {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            point = new BMap.Point(pp.lng, pp.lat);//捕捉点击的坐标值
            mar(point);
            var lng = pp.lng;  //经度
            var lat = pp.lat;  //纬度
            $("#value3").val(lng + "-" + lat)

        }
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }


});