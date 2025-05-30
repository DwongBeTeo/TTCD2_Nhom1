//Show login modal and mobile login
function openLoginModal(){
    let width = $(window).width();
    if ( width > 992 ) {
        $('#loginModal').modal('show');
        setTimeout(() => {
            $('#loginModal #modal-login-container').removeClass('right-panel-active');
        }, 200);
    } else {
        $('.mobile-auth-form #formLoginMobile').css('display', 'flex');
        $('.mobile-auth-form #formRegisterMobile').css('display', 'none');
        $('.mobile-auth .head-mobile p').text('Đăng nhập');
        $('.mobile-auth').css('transform', 'translateX(0)');
    }
}
function openRegisterModal(){
    let width = $(window).width();
    if ( width > 992 ) {
        $('#loginModal').modal('show');
        setTimeout(() => {
            $('#loginModal #modal-login-container').addClass('right-panel-active');
        }, 200);
    } else {
        $('.mobile-auth-form #formLoginMobile').css('display', 'none');
        $('.mobile-auth-form #formRegisterMobile').css('display', 'flex');
        $('.mobile-auth .head-mobile p').text('Đăng ký');
        $('.mobile-auth').css('transform', 'translateX(0)');
    }
}

$(document).ready(function () {
    $('.mobile-auth .link-back').click(function(){
        $('.mobile-auth').css('transform', '');
    })
    $(".btn-go-regis").on("click", function () {
        setTimeout(function () {
            $(".btn-regist-modal").prop("disabled", false);

            let sys_random_register_mb = $(
                "#formRegisterMobile .sys_random_register_mb"
            ).val();
            if (
                sys_random_register_mb &&
                sys_random_register_mb == 1 &&
                usernameData &&
                stringRd
            ) {
                const randomNumberTopMb =
                    Math.floor(Math.random() * (100 - 10 + 1)) + 10;
                const randomNumberBottomMb =
                    Math.floor(Math.random() * (100 - 10 + 1)) + 10;
                let name_checkMb = "";

                let username_formMb = "";
                for (let i = 0; i <= randomNumberTopMb; i++) {
                    let randomStringTopMb = generateRandomString(64);
                    if (name_checkMb == "") {
                        name_checkMb = randomStringTopMb;
                    } else {
                        name_checkMb = name_checkMb + "," + randomStringTopMb;
                    }
                    username_formMb += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name=${randomStringTopMb}
                           placeholder="Nhập tên tài khoản" autocomplete="off">
                `;
                }
                if (name_checkMb == "") {
                    name_checkMb = usernameData;
                } else {
                    name_checkMb = name_checkMb + "," + usernameData;
                }
                username_formMb += `
                <input class="input-primary c-mt-12 hidden_class" type="text" name=${usernameData}
                       placeholder="Nhập tên tài khoản" autocomplete="off">
            `;
                for (let i = 0; i <= randomNumberBottomMb; i++) {
                    let randomStringBottomMb = generateRandomString(64);
                    if (name_checkMb == "") {
                        name_checkMb = randomStringBottomMb;
                    } else {
                        name_checkMb = name_checkMb + "," + randomStringBottomMb;
                    }
                    username_formMb += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name=${randomStringBottomMb}
                           placeholder="Nhập tên tài khoản" autocomplete="off">
                `;
                }

                if (name_checkMb == "") {
                    name_checkMb = stringRd;
                } else {
                    name_checkMb = name_checkMb + "," + stringRd;
                }

                username_formMb += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name="check_username"
                           placeholder="Nhập tên tài khoản" value=${name_checkMb} autocomplete="off">
                `;

                username_formMb += `<span class="text-error c-mt-4"></span>`;
                $("#formRegisterMobile .form_username_register_mb").html(
                    username_formMb
                );

                // Thêm phần tử <style> vào đầu body hoặc head
                const style = document.createElement("style");
                style.innerHTML = `
                input[name="${usernameData}"] {
                    display: block !important;
                }
            `;
                document.head.appendChild(style);
            }
        }, 2500);
    });
    //Button đăng nhập đăng ký để chuyển animation
    const signUpButton = $('#signUp');
    const signInButton = $('#signIn');
    const container = $('#modal-login-container');

// Hàm random chuỗi
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    //Click sigin signup button
    $(signUpButton).click(function (e) {
        container.addClass("right-panel-active");
        document.addEventListener("DOMContentLoaded", function () {
            document.querySelectorAll("input").forEach(input => {
                input.setAttribute("autocomplete", "off");
                input.value = ""; // Xóa mọi giá trị tự động điền
            });
        });

// Kiểm tra nếu tồn tại form và class
        let sys_random_register = $('#formRegister .sys_random_register').val();
        if (sys_random_register && sys_random_register == 1 && usernameData && stringRd){
            const randomNumberTop = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            const randomNumberBottom = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            let name_check = '';

            let username_form = '';
            for (let i = 0; i <= randomNumberTop; i++){
                let randomStringTop = generateRandomString(64);
                if (name_check == ""){
                    name_check = randomStringTop;
                }else{
                    name_check = name_check + "," + randomStringTop;
                }
                username_form += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name=${randomStringTop}
                           placeholder="Nhập tên tài khoản" autocomplete="off">
                `;
            }
            if (name_check == ""){
                name_check = usernameData;
            }else{
                name_check = name_check + "," + usernameData;
            }
            username_form += `
                <input class="input-primary c-mt-12 hidden_class" type="text" name=${usernameData}
                       placeholder="Nhập tên tài khoản" autocomplete="off">
            `;
            for (let i = 0; i <= randomNumberBottom; i++){
                let randomStringBottom = generateRandomString(64);
                if (name_check == ""){
                    name_check = randomStringBottom;
                }else{
                    name_check = name_check + "," + randomStringBottom;
                }
                username_form += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name=${randomStringBottom}
                           placeholder="Nhập tên tài khoản" autocomplete="off">
                `;
            }
            if (name_check == ""){
                name_check = stringRd;
            }else{
                name_check = name_check + "," + stringRd;
            }
            username_form += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name="check_username"
                           placeholder="Nhập tên tài khoản" value=${name_check} autocomplete="off">
                `;


            username_form += `<span class="text-error c-mt-4"></span>`;
            $('#formRegister .form_username_register').html(username_form);

            // Thêm phần tử <style> vào đầu body hoặc head
            const style = document.createElement('style');
            style.innerHTML = `
                input[name="${usernameData}"] {
                    display: block !important;
                }
            `;
            document.head.appendChild(style);

        }
    });

    $(signInButton).click(function (e) {
        container.removeClass("right-panel-active");
    });

    //Close login modal
    $('.close-login-modal').click(function (e) {
        e.preventDefault();
        $('#loginModal').modal('hide');
        $('.modal-login-error').text('');
    });

    //Hide and show password
    $('.password-input-show').click(function(e) {
        let inputPassword = $(this).parent().find('input');
        let eyeHide = $(this).parent().find('.password-input-hide');
        $(this).css('display','none');
        eyeHide.css('display','block');
        $(inputPassword).attr('type', 'text');
    });

    $('.password-input-hide').click(function(e) {
        let inputPassword = $(this).parent().find('input');
        let eyeShow = $(this).parent().find('.password-input-show');
        $(this).css('display','none');
        eyeShow.css('display','block');
        $(inputPassword).attr('type', 'password');
    });

    //End js hide show

    //Close login mobile
    $('.mobile-auth-header img').click(function(e) {
        $('.mobile-auth').removeClass('mobile-auth-show');
    });

    // $('.notification img').click( function() {
    //     $('.mobile-auth').removeClass('mobile-auth-show');
    // });
    // $('.nav-bar-info-search').click( function() {
    //     $('.mobile-auth').removeClass('mobile-auth-show');
    // });

    //Click in mobile auth nav action

    $('#handleLoginPopup').click(function (e) {
        e.preventDefault();
        $('.mobile-auth-form #formLoginMobile').css('display', 'flex');
        $('.mobile-auth-form #formRegisterMobile').css('display', 'none');
        $('.mobile-auth .head-mobile h1').text('Đăng nhập');
        $('.mobile-auth').css('transform', 'translateX(0)');
    });

    $('#handleRegisterPopup').click(function (e) {
        e.preventDefault();
        $('.mobile-auth-form #formLoginMobile').css('display', 'none');
        $('.mobile-auth-form #formRegisterMobile').css('display', 'flex');
        $('.mobile-auth .head-mobile h1').text('Đăng ký');
        $('.mobile-auth').css('transform', 'translateX(0)');

        let sys_random_register_mb = $('#formRegisterMobile .sys_random_register_mb').val();
        if (sys_random_register_mb && sys_random_register_mb == 1 && usernameData && stringRd){
            const randomNumberTopMb = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            const randomNumberBottomMb = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            let name_checkMb = '';

            let username_formMb = '';
            for (let i = 0; i <= randomNumberTopMb; i++){
                let randomStringTopMb = generateRandomString(64);
                if (name_checkMb == ""){
                    name_checkMb = randomStringTopMb;
                }else{
                    name_checkMb = name_checkMb + "," + randomStringTopMb;
                }
                username_formMb += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name=${randomStringTopMb}
                           placeholder="Nhập tên tài khoản" autocomplete="off">
                `;
            }
            if (name_checkMb == ""){
                name_checkMb = usernameData;
            }else{
                name_checkMb = name_checkMb + "," + usernameData;
            }
            username_formMb += `
                <input class="input-primary c-mt-12 hidden_class" type="text" name=${usernameData}
                       placeholder="Nhập tên tài khoản" autocomplete="off">
            `;
            for (let i = 0; i <= randomNumberBottomMb; i++){
                let randomStringBottomMb = generateRandomString(64);
                if (name_checkMb == ""){
                    name_checkMb = randomStringBottomMb;
                }else{
                    name_checkMb = name_checkMb + "," + randomStringBottomMb;
                }
                username_formMb += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name=${randomStringBottomMb}
                           placeholder="Nhập tên tài khoản" autocomplete="off">
                `;
            }
            if (name_checkMb == ""){
                name_checkMb = stringRd;
            }else{
                name_checkMb = name_checkMb + "," + stringRd;
            }
            username_formMb += `
                    <input class="input-primary c-mt-12 hidden_class" type="text" name="check_username"
                           placeholder="Nhập tên tài khoản" value=${name_checkMb} autocomplete="off">
                `;


            username_formMb += `<span class="text-error c-mt-4"></span>`;
            $('#formRegisterMobile .form_username_register_mb').html(username_formMb);

            // Thêm phần tử <style> vào đầu body hoặc head
            const style = document.createElement('style');
            style.innerHTML = `
                input[name="${usernameData}"] {
                    display: block !important;
                }
            `;
            document.head.appendChild(style);
        }
    });

    $('.changeFormLogin').click(function (e) {
        e.preventDefault();
        $('.mobile-auth-form #formLoginMobile').fadeIn(500);
        $('.mobile-auth-form #formRegisterMobile').attr('style', 'display: none !important');
        $('.mobile-auth .head-mobile h1').text('Đăng nhập');
    });

    $('.changeFormRegister').click(function (e) {
        e.preventDefault();
        $('.mobile-auth-form #formLoginMobile').attr('style', 'display: none !important');
        $('.mobile-auth-form #formRegisterMobile').fadeIn(500);
        $('.mobile-auth .head-mobile h1').text('Đăng ký');
    });
    const widgetIds = [];
    // Submit Login Desktop
    $('#formLogin, #formLoginMobile').submit(function (e) {
        e.preventDefault();
        var formSubmit = $(this);
        var url = formSubmit.attr('action');
        var btnSubmit = formSubmit.find(':submit');
        btnSubmit.text('Đang xử lý...');
        btnSubmit.prop('disabled', true);
        $.ajax({
            type: "POST",
            url: url,
            cache:false,
            data: formSubmit.serialize(),
            beforeSend: function (xhr) {
                formSubmit.find('#usernameError').text('');
                formSubmit.find('#passwordError').text('');
                $('#formLoginMobile input').removeClass('input-error');
                $('#formLogin input').removeClass('input-error');
            },
            success: function (data) {
                if(data.status == 1){
                    $('.registError').html(`<p class="text-primary">${data.data.message}</p>`)
                    if (data.return_url){
                        window.location.href = data.return_url;
                    }else {
						window.location.reload();
                    }
                }else{
                    $('.LoginError').html(data.message);
                    if(data.captcha === 'cf'){
                        const captcha_login = $('#captcha_login');
                        if (captcha_login.length) {
                            turnstile.reset(captcha_login[0]);
                        }
                        const captcha_login_mob = $('#captcha_login_mob');
                        if (captcha_login_mob.length) {
                            turnstile.reset(captcha_login_mob[0]);
                        }
                    }
                }

            },
            error: function (response) {
                if(response.status === 422 || response.status === 429) {
                    let errors = response.responseJSON.errors;
                    let keys = Object.keys(errors);
                    $.each(keys, function (index, key) {
                        if ( key == "username" ) {
                            $('#formLogin input[name="username"]').addClass('input-error');
                            $('#formLoginMobile input[name="username"]').addClass('input-error');
                            formSubmit.find('#usernameError').text(errors[key]);
                        } else if ( key == "password" ) {
                            $('#formLogin input[name="password"]').addClass('input-error');
                            $('#formLoginMobile input[name="password"]').addClass('input-error');
                            formSubmit.find('#passwordError').text(errors[key]);
                        }
                    });
                    return false;
                } else {
                    alert('Kết nối với hệ thống thất bại.Xin vui lòng thử lại');
                }
            },
            complete: function (data) {
                btnSubmit.text('Đăng nhập');
                btnSubmit.prop('disabled', false);
            }
        });
    });

    $("#formRegister, #formRegisterMobile").submit(function (e) {
        e.preventDefault();
        var formSubmit = $(this);
        var url = formSubmit.attr("action");
        var btnSubmit = formSubmit.find('button[type="submit"]');
        btnSubmit.text("Đang xử lý...");
        btnSubmit.prop("disabled", true);
        let sys_register_finger = $("#sys_register_finger").val();
        if (sys_register_finger == 1) {
            import("../../lib/fingerprint/fingerprint.js")
                .then((FingerprintJS) => FingerprintJS.load())
                .then((fp) => fp.get())
                .then((result) => {
                    const visitorId = result.visitorId;
                    continueFormSubmission(visitorId);
                })
                .catch((error) => {
                    $(".registError").html(error.message);
                    btnSubmit.text("Đăng nhập");
                    btnSubmit.prop("disabled", false);
                });
            function continueFormSubmission(visitorId) {
                $(".modal-loader-container").css("display", "flex");
                var data = formSubmit.serialize();
                data += "&finger=" + visitorId;
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    beforeSend: function (xhr) {
                        formSubmit.find("#emailRegisterError").text("");
                        formSubmit.find("#usernameRegisterError").text("");
                        formSubmit
                            .find("#usernameRegisterErrorMobile")
                            .text("");
                        formSubmit.find("#emailRegisterErrorMobile").text("");
                        formSubmit.find("#passwordRegisterError").text("");
                        formSubmit.find("#phoneRegisterError").text("");
                        $("#formRegisterMobile input").removeClass(
                            "input-error"
                        );
                        $("#formRegister input").removeClass("input-error");
                    },
                    success: function (data) {
                        if (data.status == 1) {
                            $(".registError").html(
                                `<p class="text-primary">${data.data.message}</p>`
                            );
                            if (data.return_url) {
                                window.location.href = data.return_url;
                            } else {
                                /*window.location.href = "/";*/
								window.location.reload();
                            }
                        } else {
                            let html = data.message;
                            if (data.error) {
                                html +=
                                    `<span class="error_register text-danger">` +
                                    (data.error ?? "") +
                                    `</span><span class="cursor-pointer copy-error"><img src="/assets/frontend/theme_5/image/svg/copy.svg"></span>`;
                            }
                            $(".registError").html(html);
                            if (data.captcha === "cf") {
                                const captcha_regis = $("#captcha_regis");
                                if (captcha_regis.length) {
                                    turnstile.reset(captcha_regis[0]);
                                }
                                const captcha_regis_mob =
                                    $("#captcha_regis_mob");
                                if (captcha_regis_mob.length) {
                                    turnstile.reset(captcha_regis_mob[0]);
                                }
                            }
                        }
                    },
                    error: function (response) {
                        $(".modal-loader-container").css("display", "none");
                        if (
                            response.status === 422 ||
                            response.status === 429
                        ) {
                            let errors = response.responseJSON.errors;
                            let keys = Object.keys(errors);
                            $.each(keys, function (index, key) {
                                if (key == "email") {
                                    formSubmit
                                        .find("#emailRegisterError")
                                        .text(errors[key]);
                                    formSubmit
                                        .find("#emailRegisterErrorMobile")
                                        .text(errors[key]);
                                    $(
                                        '#formRegisterMobile input[name="email"]'
                                    ).addClass("input-error");
                                    $(
                                        '#formRegister input[name="email"]'
                                    ).addClass("input-error");
                                } else if (key == "password") {
                                    formSubmit
                                        .find("#passwordRegisterError")
                                        .text(errors[key]);
                                    $(
                                        '#formRegisterMobile input[name="password"]'
                                    ).addClass("input-error");
                                    $(
                                        '#formRegister input[name="password"]'
                                    ).addClass("input-error");
                                } else if (key == "phone") {
                                    formSubmit
                                        .find("#phoneRegisterError")
                                        .text(errors[key]);
                                    formSubmit
                                        .find("#phoneRegisterErrorMobile")
                                        .text(errors[key]);
                                    $(
                                        '#formRegisterMobile input[name="phone"]'
                                    ).addClass("input-error");
                                    $(
                                        '#formRegister input[name="phone"]'
                                    ).addClass("input-error");
                                } else if (key == "username") {
                                    formSubmit
                                        .find("#usernameRegisterError")
                                        .text(errors[key]);
                                    formSubmit
                                        .find("#usernameRegisterErrorMobile")
                                        .text(errors[key]);
                                    $(
                                        '#formRegisterMobile input[name="username"]'
                                    ).addClass("input-error");
                                    $(
                                        '#formRegister input[name="username"]'
                                    ).addClass("input-error");
                                }
                            });
                            return false;
                        } else {
                            alert(
                                "Kết nối với hệ thống thất bại.Xin vui lòng thử lại"
                            );
                        }
                    },
                    complete: function (data) {
                        btnSubmit.text("Đăng ký");
                        btnSubmit.prop("disabled", false);
                        $(".modal-loader-container").css("display", "none");
                    },
                });
            }
        } else {
            $(".modal-loader-container").css("display", "flex");
            var data = formSubmit.serialize();
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                beforeSend: function (xhr) {
                    formSubmit.find("#emailRegisterError").text("");
                    formSubmit.find("#usernameRegisterError").text("");
                    formSubmit.find("#usernameRegisterErrorMobile").text("");
                    formSubmit.find("#emailRegisterErrorMobile").text("");
                    formSubmit.find("#passwordRegisterError").text("");
                    formSubmit.find("#phoneRegisterError").text("");
                    $("#formRegisterMobile input").removeClass("input-error");
                    $("#formRegister input").removeClass("input-error");
                },
                success: function (data) {
                    if (data.status == 1) {
                        $(".registError").html(
                            `<p class="text-primary">${data.data.message}</p>`
                        );
                        if (data.return_url) {
                            window.location.href = data.return_url;
                        } else {
                            window.location.href = "/";
                        }
                    } else {
                        let html = data.message;
                        if (data.error) {
                            html +=
                                `<span class="error_register text-danger">` +
                                (data.error ?? "") +
                                `</span><span class="cursor-pointer copy-error"><img src="/assets/frontend/theme_5/image/svg/copy.svg"></span>`;
                        }
                        $(".registError").html(html);
                        if (data.captcha === "cf") {
                            const captcha_regis = $("#captcha_regis");
                            if (captcha_regis.length) {
                                turnstile.reset(captcha_regis[0]);
                            }
                            const captcha_regis_mob = $("#captcha_regis_mob");
                            if (captcha_regis_mob.length) {
                                turnstile.reset(captcha_regis_mob[0]);
                            }
                        }
                    }
                },
                error: function (response) {
                    $(".modal-loader-container").css("display", "none");
                    if (response.status === 422 || response.status === 429) {
                        let errors = response.responseJSON.errors;
                        let keys = Object.keys(errors);
                        $.each(keys, function (index, key) {
                            if (key == "email") {
                                formSubmit
                                    .find("#emailRegisterError")
                                    .text(errors[key]);
                                formSubmit
                                    .find("#emailRegisterErrorMobile")
                                    .text(errors[key]);
                                $(
                                    '#formRegisterMobile input[name="email"]'
                                ).addClass("input-error");
                                $('#formRegister input[name="email"]').addClass(
                                    "input-error"
                                );
                            } else if (key == "password") {
                                formSubmit
                                    .find("#passwordRegisterError")
                                    .text(errors[key]);
                                $(
                                    '#formRegisterMobile input[name="password"]'
                                ).addClass("input-error");
                                $(
                                    '#formRegister input[name="password"]'
                                ).addClass("input-error");
                            } else if (key == "phone") {
                                formSubmit
                                    .find("#phoneRegisterError")
                                    .text(errors[key]);
                                formSubmit
                                    .find("#phoneRegisterErrorMobile")
                                    .text(errors[key]);
                                $(
                                    '#formRegisterMobile input[name="phone"]'
                                ).addClass("input-error");
                                $('#formRegister input[name="phone"]').addClass(
                                    "input-error"
                                );
                            } else if (key == "username") {
                                formSubmit
                                    .find("#usernameRegisterError")
                                    .text(errors[key]);
                                formSubmit
                                    .find("#usernameRegisterErrorMobile")
                                    .text(errors[key]);
                                $(
                                    '#formRegisterMobile input[name="username"]'
                                ).addClass("input-error");
                                $(
                                    '#formRegister input[name="username"]'
                                ).addClass("input-error");
                            }
                        });
                        return false;
                    } else {
                        alert(
                            "Kết nối với hệ thống thất bại.Xin vui lòng thử lại"
                        );
                    }
                },
                complete: function (data) {
                    btnSubmit.text("Đăng ký");
                    btnSubmit.prop("disabled", false);
                    $(".modal-loader-container").css("display", "none");
                },
            });
        }
    });

});
