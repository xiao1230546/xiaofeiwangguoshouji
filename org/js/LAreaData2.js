
chengsd()
function chengsd() {
    var url = util.GetNewUrl(HOST + "Region/GetAllBaiduRegionList");
    $.ajax({
        // 获取行业类别
        url: url,
        data: {
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.Code == 100) {
                var LAreaData = GetAreaData(result.Data, 1, 0);
                var area = new LArea();
                area.init({
                    'trigger': '#demo1',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                    'valueTo': '#value1',//选择完毕后id属性输出到该位置
                    'keys': { id: 'id', name: 'name' },//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                    'data': LAreaData//数据源
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

//递归循环
function GetAreaData(areas, level, parentId) {
    var areaData = new Array();
    for (var i = 0; i < areas.length; i++) {
        if (areas[i].Level == level && areas[i].ParentId == parentId) {
            var jsn = {
                id: areas[i].RegionId,
                name: areas[i].Name,
                child: []
            };
            if (level < 3) {
                jsn.child = GetAreaData(areas, level + 1, jsn.id);
            }
            areaData.push(jsn);
        }
    }
    return areaData;
}




