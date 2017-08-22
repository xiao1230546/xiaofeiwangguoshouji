$(document).on('touchend', '[data-toggle=grzc]', function () {
    // 个人注册跳转
    //var $this = $(this);
    window.location.href = "http://mp.xiaofeiwangguo.com/WxBase/Entry?type=1&userType=1&tel=" + tel
});
$(document).on('touchend', '[data-toggle=shzc]', function () {
    // 商户跳转
    //var $this = $(this);
    window.location.href = "http://mp.xiaofeiwangguo.com/WxBase/Entry?type=2&userType=2&tel=" + tel
});
