function reloadCaptcha() {
    $.ajax({
        url: '/reload-captcha',
        method: 'GET',
        dataType: 'json',
        beforeSend: function(){
            $('.capchaImage').html('');
        },
        success: function (response) {
            $('.capchaImage').html(response.captcha);
        },
        error: function (error) {
            console.error(error);
        }
    });
}
$(document).ready(function () {
    function setDelayedFunction() {
        if(window.location.pathname == '/nap-the'){
            setTimeout(function () {
                reloadCaptcha();
                setDelayedFunction();
            }, 60 * 60 * 1000);
        }
    }
    reloadCaptcha();
    setDelayedFunction();
});
