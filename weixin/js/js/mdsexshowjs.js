function settler() {
    var url = HOST + "WxPublic/GetOrgInfo3";
    $.get(util.GetNewUrl(url), function (result) {
        if (result.Code == 100) {

    });
}

function removeImg(obj) {
    $(obj).parent().remove();
    $("#filePicker").show();
}




