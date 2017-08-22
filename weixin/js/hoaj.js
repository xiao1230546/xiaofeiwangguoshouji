﻿// 初始化Web Uploader***上传图片
var HOST = "http://api.xiaofeiwangguo.com/api/";    //接口地址


she("#filePicker", 1, "#fileList", "imgIds", true);
she("#fileList_3", 1, "#fileList_3", "logoimgIds", false);
//点击元素   上传数量   放在哪里    传入那个
she("#filePicker_1", 5, "#fileList_1", "simgIds", false);
she("#filePicker_2", 5, "#fileList_2", "sjimgIds", false);
she("#filePicker_4", 1, "#fileList_4", "tsjyimgIds", true);
she("#filePicker_5", 10, "#fileList_5", "mtzimgIds", false);
she("#filePicker_6", 5, "#fileList_6", "njimgIds", false);
she("#filePicker_7", 5, "#fileList_7", "cpimgIds", false);

function she(pic, fileNumLimit, pics, Ids, noe) {
    var uploader = WebUploader.create({
        method: 'POST',
        sendAsBinary: true,
        auto: true,
        // 文件接收服务端地址，自动生成缩略图需要后端完成。
        server: HOST + 'Picture/Upload/',
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: pic,
        fileNumLimit: fileNumLimit,
        //allowMagnify: false,
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/png,image/jpeg,image/bmp'
        }
    });


    uploader.on('fileQueued', function (file) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item webuploader-pick">' +
                '<img class="addimg"><span id="filea_span" class="file_gb">X</span>' +
                '</div>'
            ),
            $img = $li.find('img');

        // $list为容器jQuery实例
        $(pics).append($li);


        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr('src', src);
        }, 200, 200);
    });


    uploader.on('uploadProgress', function (file, percentage) {
        util.showBusy("图片上传中");
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class=""><span></span></p>')
                .appendTo($li)
                .find('span');
        }
        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
        util.closeBusy();
        $(".file_gb").on('click', function () {
            uploader.removeFile(file);
            removeImg(this);
        })
        $("#fileList_3").find("img").on('click', function () {
            uploader.removeFile(file);
            removeImg(this);
        })

        if (response.Code != 100) {
            layer.open({
                content: response.Desc
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });
            return;
        }

        //var imgid=response.Data.PictureId;


        var imgHidHtml = "<input type='hidden' id=" + Ids + file.id + " name='" + Ids + "' value='" + response.Data.PictureId + "'>";
        $("#" + file.id).append(imgHidHtml);
        if (noe) {
            $(pic).hide()
            util.showToast("上传成功");
        } else {
            util.showToast("上传成功");
        }

        //var imgIds= $(Ids).val();

        /*
         if (imgIds=="")
         {
         $(Ids).val(imgid);
         }
         else
         {
         $(Ids).val(imgIds+","+imgid);
         }
         */
        //alert(imgurl);
        $('#' + file.id).addClass('upload-state-done');


    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
        util.closeBusy();
        var $li = $('#' + file.id),
            $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        util.closeBusy();
        $('#' + file.id).find('.progress').remove();
    });
}


