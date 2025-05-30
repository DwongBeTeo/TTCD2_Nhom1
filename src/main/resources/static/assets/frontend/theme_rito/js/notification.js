function setCookie(name,value,minute) {
    var expires = "";
    if (minute) {
        var date = new Date();
        date.setTime(date.getTime() + (minute*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

$(document).ready(function(){
    let cookies_noti = getCookie('sys_noti_popup');

    if (!cookies_noti) {
        $('#noticeModal').modal('show');
    }

    $('body').on('click', '.openModalNoti',function(e){

        setCookie('sys_noti_popup',"noty",60);
    })
})

document.addEventListener('DOMContentLoaded', function() {
    let cookies_noti = getCookie('sys_noti_popup');

    if (cookies_noti){
        $('#noticeModal').modal('hide');

    }else{

        $('#noticeModal').modal('show');
    }
});