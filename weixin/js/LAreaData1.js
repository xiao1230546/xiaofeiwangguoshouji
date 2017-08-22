var getLocation = function() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayPosition, locationError);
    } else {
        alert('浏览器不支持地理定位。');
    }
}
var displayPosition = function(pos) {
    alert('维度：'+ pos.coords.latitude+',经度：'+ pos.coords.longitude);
    document.getElementById("label").innerHTML = '维度：'+ pos.coords.latitude+',经度：'+ pos.coords.longitude;
    var properties = ['longitude', 'latitude', 'altitude', 'accuracy', 'altitudeAccuracy', 'heading', 'speed'];
    for (var i = 0, len = properties.length; i < len; i++) {
        var value = pos.coords[properties[i]];
        document.getElementById(properties[i]).innerHTML = value;
    }
    document.getElementById('timestamp').innerHTML = pos.timestamp;
}
var locationError = function(error){
    switch(error.code) {
        case error.TIMEOUT:
            showError('A timeout occured! Please try again!');
            break;
        case error.POSITION_UNAVAILABLE:
            showError('We can\'t detect your location. Sorry!');
            break;
        case error.PERMISSION_DENIED:
            showError('Please allow geolocation access for this to work.');
            break;
        case error.UNKNOWN_ERROR:
            showError('An unknown error occured!');
            break;
    }
}
var showError = function(error){
    alert(error);
}
