/**
 * Created by 84694 on 2017/4/8.
 */
//页面加载后设置根节点html的字体大小
document.addEventListener('DOMContentLoaded', function () {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 7.5 + 'px';


}, false);
//获取移动端横竖屏改变触发重置根节点html的字体大小
window.addEventListener("orientationchange", function() {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 7.5 + 'px';
}, false);








