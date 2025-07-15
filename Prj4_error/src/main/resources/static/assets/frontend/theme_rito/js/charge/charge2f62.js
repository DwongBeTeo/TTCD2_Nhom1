var chargeDataSend = {
    type: null,
    pin: null,
    serial: null,
    captcha: null,
    amount: null,
    fullname: null,
    finger: null,
    g_captcha:null,
    cf_captcha:null,
    _token: $('meta[name="csrf-token"]').attr('content'),
}
//append new data into confirm modal
function prepareConfirmData(widgetType) {
    let cardChecked;
    let confirmTitle;
    let confirmDiscount;
    let confirmPromotion;
    let confirmPrice;
    let confirmPin;
    let confirmSerial;
    let confirmPotName;
    let g_captcha;
    let cf_captcha;
    // trang nạp thẻ desktop
    if (widgetType == 1) {
        cardChecked = $('#chargeCardForm input[name="amount"]:checked');
        confirmTitle = $('#telecom').val();
        confirmDiscount = $(cardChecked).data('ratio');
        confirmPromotion = $(cardChecked).data('promotion');
        confirmPrice = $(cardChecked).val();
        confirmPin = $('#chargeCardForm input[name="pin"]').val().trim();
        confirmSerial = $('#chargeCardForm input[name="serial"]').val().trim();
        confirmPotName = $('#chargeCardForm input[name="fullname"]').val().trim();
        g_captcha = $('#chargeCardForm .g-recaptcha-response').val() ?? '';
        cf_captcha = $('#chargeCardForm input[name="cf-turnstile-response"]').val() ?? '';
    }
    if (widgetType == 2) {
        cardChecked = $('#rechargeModal input[name="amount"]:checked');
        confirmTitle = $('#telecom_modal').val();
        confirmDiscount = $(cardChecked).data('ratio');
        confirmPromotion = $(cardChecked).data('promotion');
        confirmPrice = $(cardChecked).val();
        confirmPin = $('#rechargeModal input[name="pin"]').val().trim();
        confirmSerial = $('#rechargeModal input[name="serial"]').val().trim();
        confirmPotName = $('#rechargeModal input[name="fullname"]').val().trim();
        g_captcha = $('#rechargeModal .g-recaptcha-response').val() ?? '';
        cf_captcha = $('#rechargeModal input[name="cf-turnstile-response"]').val() ?? '';
    }
    if (widgetType == 3) {
        cardChecked = $('#chargeCardHomeFormMobile input[name="amount"]:checked');
        confirmPin = $('#chargeCardHomeFormMobile input[name="pin"]').val().trim();
        confirmSerial = $('#chargeCardHomeFormMobile input[name="serial"]').val().trim();
        confirmPotName = $('#chargeCardHomeFormMobile input[name="fullname"]').val().trim();
        confirmTitle = $('#telecom_mobile').val();
        g_captcha = $('#chargeCardHomeFormMobile .g-recaptcha-response').val() ?? '';
        cf_captcha = $('#chargeCardHomeFormMobile input[name="cf-turnstile-response"]').val() ?? '';
        if ( $(window).width() >= 992 ) {
            cardChecked = $('#chargeCardHomeForm input[name="amount"]:checked');
            confirmPin = $('#chargeCardHomeForm input[name="pin"]').val().trim();
            confirmSerial = $('#chargeCardHomeForm input[name="serial"]').val().trim();
            confirmPotName = $('#chargeCardHomeForm input[name="fullname"]').val().trim();
            confirmTitle = $('#telecom').val();
            g_captcha = $('#chargeCardHomeForm .g-recaptcha-response').val() ?? '';
            cf_captcha = $('#chargeCardHomeForm input[name="cf-turnstile-response"]').val() ?? '';
        }
        confirmDiscount = $(cardChecked).data('ratio');
        confirmPromotion = $(cardChecked).data('promotion');
        confirmPrice = $(cardChecked).val();
    }
    // trang nạp thẻ mobile
    if (widgetType == 4) {
        cardChecked = $('#chargeCardFormMobile input[name="amount"]:checked');
        confirmTitle = $('#telecom_mobile').val();
        confirmDiscount = $(cardChecked).data('ratio');
        confirmPromotion = $(cardChecked).data('promotion');
        confirmPrice = $(cardChecked).val();
        confirmPin = $('#chargeCardFormMobile input[name="pin"]').val().trim();
        confirmSerial = $('#chargeCardFormMobile input[name="serial"]').val().trim();
        confirmPotName = $('#chargeCardFormMobile input[name="fullname"]').val().trim();
        g_captcha = $('#chargeCardHomeFormMobile .g-recaptcha-response').val() ?? '';
        cf_captcha = $('#chargeCardHomeFormMobile input[name="cf-turnstile-response"]').val() ?? '';
    }

    if ( !confirmPromotion ) {
        confirmPromotion = 0;
    }

    if ( !confirmDiscount || confirmDiscount < 0 ) {
        confirmDiscount = 100;
    }

    let saleAmount = confirmPrice - (confirmPrice * confirmDiscount / 100);
    let totalAmount = confirmPrice - saleAmount;
    if ( saleAmount > 0  && totalAmount > 0 ) {
        $('#orderCharge #totalBill').text(`${ formatNumber(totalAmount)}`);
        $('#chargeConfirmStep #totalBillMobile').text(`${ formatNumber(totalAmount)}`);
    } else {
        $('#orderCharge #totalBill').text(`${ formatNumber(confirmPrice)}`);
        $('#chargeConfirmStep #totalBillMobile').text(`${ formatNumber(confirmPrice)}`);
    }

    $('#orderCharge #confirmTitle').text(confirmTitle);
    $('#chargeConfirmStep #confirmTitleMobile').text(confirmTitle);
    $('#orderCharge #confirmPrice').text(`${formatNumber( confirmPrice )} đ`);
    $('#chargeConfirmStep #confirmPriceMobile').text(`${formatNumber( confirmPrice )} đ`);
    $('#orderCharge #confirmDiscount').text(`${confirmDiscount}%`);
    $('#chargeConfirmStep #confirmDiscountMobile').text(`${confirmDiscount}%`);
    $('#orderCharge #confirmPromotion').text(`${confirmPromotion}%`);
    $('#chargeConfirmStep #confirmPromotionMobile').text(`${confirmPromotion}%`);

    $('#orderCharge #confirmPin').text(`${confirmPin}`);
    $('#chargeConfirmStep #confirmPinMobile').text(`${confirmPin}`);
    $('#orderCharge #confirmSerial').text(`${confirmSerial}`);
    $('#chargeConfirmStep #confirmSerialMobile').text(`${confirmSerial}`);
}

//Append new data to submit to backend
function prepareDataSend(widgetType) {
    let cardChecked;
    let pin;
    let serial;
    let captcha;
    let type;
    let amount;
    let fullname;
    let g_captcha;
    let cf_captcha;
    let checkcaptcha = $('#feedback-recaptcha-recharge').data('checkcaptcha');
    if (widgetType == 1) {
        cardChecked = $('#chargeCardForm input[name="amount"]:checked');
        pin = $('#chargeCardForm input[name="pin"]').val().trim();
        serial = $('#chargeCardForm input[name="serial"]').val().trim();
        fullname = $('#chargeCardForm input[name="fullname"]').val().trim();
        g_captcha = $('#chargeCardForm .g-recaptcha-response').val() ?? '';
        cf_captcha = $('#chargeCardForm input[name="cf-turnstile-response"]').val() ?? '';
        // if(checkcaptcha == 1){
        //     captcha = grecaptcha.getResponse();
        // }else
        // {
        //     captcha = $('#chargeCardForm input[name="captcha"]').val().trim();
        // }
        type = $('#telecom').val();
        amount = $(cardChecked).val();
    }
    if (widgetType == 2) {
        cardChecked = $('#rechargeModal input[name="amount"]:checked');
        pin = $('#rechargeModal input[name="pin"]').val().trim();
        serial = $('#rechargeModal input[name="serial"]').val().trim();
        fullname = $('#rechargeModal input[name="fullname"]').val().trim();
        g_captcha = $('#rechargeModal .g-recaptcha-response').val() ?? '';
        cf_captcha = $('#rechargeModal input[name="cf-turnstile-response"]').val() ?? '';
        // if(checkcaptcha == 1){
        //     captcha = grecaptcha.getResponse();
        // }else {
        //     captcha = $('#rechargeModal input[name="captcha"]').val().trim();
        // }
        type = $('#telecom_modal').val();
        amount = $(cardChecked).val();
    }
    if (widgetType == 3) {
        cardChecked = $('#chargeCardHomeFormMobile input[name="amount"]:checked');
        pin = $('#chargeCardHomeFormMobile input[name="pin"]').val().trim();
        serial = $('#chargeCardHomeFormMobile input[name="serial"]').val().trim();
        fullname = $('#chargeCardHomeFormMobile input[name="fullname"]').val().trim();
        type = $('#telecom_mobile').val();
        g_captcha = $('#chargeCardHomeFormMobile .g-recaptcha-response').val() ?? '';
        cf_captcha = $('#chargeCardHomeFormMobile input[name="cf-turnstile-response"]').val() ?? '';
        if ( $(window).width() >= 992 ) {
            cardChecked = $('#chargeCardHomeForm input[name="amount"]:checked');
            pin = $('#chargeCardHomeForm input[name="pin"]').val().trim();
            serial = $('#chargeCardHomeForm input[name="serial"]').val().trim();
            fullname = $('#chargeCardHomeForm input[name="fullname"]').val().trim();
            g_captcha = $('#chargeCardHomeForm .g-recaptcha-response').val() ?? '';
            cf_captcha = $('#chargeCardHomeForm input[name="cf-turnstile-response"]').val() ?? '';
            type = $('#telecom').val();
        }
        // if(checkcaptcha == 1){
        //     captcha = grecaptcha.getResponse();
        // }else {
        //     captcha = $('#chargeCardHomeFormMobile input[name="captcha"]').val().trim();
        //     if ( $(window).width() >= 992 ) {
        //         captcha = $('#chargeCardHomeForm input[name="captcha"]').val().trim();
        //     }
        // }
        amount = $(cardChecked).val();
    }
    if (widgetType == 4) {
        cardChecked = $('#chargeCardFormMobile input[name="amount"]:checked');
        pin = $('#chargeCardFormMobile input[name="pin"]').val().trim();
        serial = $('#chargeCardFormMobile input[name="serial"]').val().trim();
        fullname = $('#chargeCardFormMobile input[name="fullname"]').val().trim();
        // if(checkcaptcha == 1){
        //     captcha = grecaptcha.getResponse();
        // }else
        // {
        //     captcha = $('#chargeCardFormMobile input[name="captcha"]').val().trim();
        // }
        type = $('#telecom_mobile').val();
        amount = $(cardChecked).val();
    }
    chargeDataSend.type = type;
    chargeDataSend.pin = pin;
    chargeDataSend.serial = serial;
    // chargeDataSend.captcha = captcha;
    chargeDataSend.amount = amount;
    chargeDataSend.fullname = fullname;
    chargeDataSend.g_captcha = g_captcha;
    chargeDataSend.cf_captcha = cf_captcha;
}

function showConfirmContent () {
    prepareConfirmData(1);
    prepareDataSend(1);
    //Close recharge modal if page has this modal
    $('#rechargeModal').modal('hide');
    if ( $(window).width() >= 992 ) {
        $('#orderCharge').modal('show');
    } else {
        $('#chargeConfirmStep').css('transform', 'translateX(0)');
    }
}

function showConfirmContentMobile () {
    prepareConfirmData(4);
    prepareDataSend(4);
    $('#rechargeModal').modal('hide');
    if ( $(window).width() >= 992 ) {
        $('#orderCharge').modal('show');
    } else {
        $('#chargeConfirmStep').css('transform', 'translateX(0)');
    }
}

function showModalConfirmContent () {
    prepareConfirmData(2);
    prepareDataSend(2);
    $('#rechargeModal').modal('hide');
    if ( $(window).width() >= 992 ) {
        $('#orderCharge').modal('show');
    } else {
        $('#chargeConfirmStep').css('transform', 'translateX(0)');
    }
}

function showHomeConfirmContent () {
    prepareConfirmData(3);
    prepareDataSend(3);
    if ( $(window).width() >= 992 ) {
        $('#orderCharge').modal('show');
    } else {
        $('#chargeConfirmStep').css('transform', 'translateX(0)');
    }
}
$(document).ready(function () {
    getPromotionLockMoney();
    if (window.location.pathname.includes("/recharge-atm")) {
        // Nếu có, giả lập click vào #atmNavTab
        $('#atmNavTab').click();
    }
    $('#chargeNavTab').click(function () {
        let telecom = $('#telecom').val();
        getAmount(telecom, 1);
    });
    $('#telecom').on('change', function () {
        let telecom = $(this).val();
        getAmount(telecom, 1);
    });
    $('#telecom_mobile').on('change', function () {
        let telecom = $(this).val();
        getAmount(telecom, 4);
    });
    $('#telecom_modal').on('change', function () {
        let telecom = $(this).val();
        getAmount(telecom, 2);
    });
    $(document).on('click', '#orderCharge #confirmSubmitButton', function(e) {
        e.preventDefault();
        let sys_charge_finger = $("#sys_charge_finger").val();
        if (sys_charge_finger == 1) {
            import(`../../lib/fingerprint/fingerprint.js`)
            .then(FingerprintJS => FingerprintJS.load())
            .then(fp => fp.get())
            .then(result => {
                const visitorId = result.visitorId;
                chargeDataSend.finger = visitorId ?? null;
                continueFormSubmission(visitorId);
            })
            .catch(error => console.error(error));
        function continueFormSubmission(visitorId) {
            $.ajax({
                url:'/nap-the',
                type:'POST',
                data: chargeDataSend,
                beforeSend: function () {
                    $('#orderCharge #confirmSubmitButton').prop("disabled", true);
                    $('#orderCharge #confirmSubmitButton').text("Đang xử lý");
                    $('#modalSuccessPayment #successMessage').text('');
                    $('#modalFailPayment #failMessage').text('');
                },
                success:function (res) {
                    $('#orderCharge').modal('hide');
                    if(res.status == 1) {
                        $('#modalSuccessPayment #successMessage').text(res.message);
                        $('#modalSuccessPayment').modal('show');
                        pushParamToURL('charge', 'success');
                    }
                    else if(res.status == 401){
                        $('#modalFailPayment #failMessage').text('Bạn cần phải đăng nhập để hoàn thiện giao dịch!');
                        $('#modalFailPayment').modal('show');
                        pushParamToURL('charge', 'failed');
                    }
                    else if(res.status == 0){
                        let html = res.message;
                        if(res.error){
                            html += `<span class="error_register text-danger">` + (res.error?? '') + `</span><span class="cursor-pointer copy-error"><img src="/assets/frontend/theme_5/image/svg/copy.svg"></span>`
                        }
                        $('#modalFailPayment #failMessage').html(html);
                        $('#modalFailPayment').modal('show');
                        pushParamToURL('charge', 'failed');
                    }
                    else{
                        $('#modalFailPayment #failMessage').text('Đã có lỗi xảy ra!');
                        $('#modalFailPayment').modal('show');
                        pushParamToURL('charge', 'failed');
                    }
                    if(res.captcha === 'cf'){
                        const captcha_charge = $('#captcha_charge');
                        if (captcha_charge.length) {
                            turnstile.reset(captcha_charge[0]);
                        }
                        const captcha_charge_home = $('#captcha_charge_home');
                        if (captcha_charge_home.length) {
                            turnstile.reset(captcha_charge_home[0]);
                        }
                        const captcha_charge_home_mob = $('#captcha_charge_home_mob');
                        if (captcha_charge_home_mob.length) {
                            turnstile.reset(captcha_charge_home_mob[0]);
                        }
                        const captcha_charge_modal = $('#captcha_charge_modal');
                        if (captcha_charge_modal.length) {
                            turnstile.reset(captcha_charge_modal[0]);
                        }
                    }
                },
                error: function (res) {
                    $('#orderCharge').modal('hide');
                    $('#modalFailPayment #failMessage').text('Đã có lỗi xảy ra!');
                    $('#modalFailPayment').modal('show');
                },
                complete: function () {
                    reloadCaptcha();
                    $('#reload_1').trigger('click');
                    $('#orderCharge #confirmSubmitButton').prop("disabled", false);
                    $('#orderCharge #confirmSubmitButton').text("Xác nhận");

                    $('#chargeCardForm input[name="pin"]').val('');
                    $('#chargeCardForm input[name="serial"]').val('');
                    // $('#chargeCardForm input[name="captcha"]').val('');
                    $('#chargeCardForm input[name="amount"]').prop("checked", false);

                    $('#chargeCardModalForm input[name="pin"]').val('');
                    $('#chargeCardModalForm input[name="serial"]').val('');
                    // $('#chargeCardModalForm input[name="captcha"]').val('');
                    $('#chargeCardModalForm input[name="amount"]').prop("checked", false);

                    $('#chargeCardHomeForm input[name="pin"]').val('');
                    $('#chargeCardHomeForm input[name="serial"]').val('');
                    // $('#chargeCardHomeForm input[name="captcha"]').val('');
                    $('#chargeCardHomeForm input[name="amount"]').prop("checked", false);

                    // grecaptcha.reset();
                }
            });
        }
        } else {
            $.ajax({
                url:'/nap-the',
                type:'POST',
                data: chargeDataSend,
                beforeSend: function () {
                    $('#orderCharge #confirmSubmitButton').prop("disabled", true);
                    $('#orderCharge #confirmSubmitButton').text("Đang xử lý");
                    $('#modalSuccessPayment #successMessage').text('');
                    $('#modalFailPayment #failMessage').text('');
                },
                success:function (res) {
                    $('#orderCharge').modal('hide');

                    if(res.status == 1) {
                        $('#modalSuccessPayment #successMessage').text(res.message);
                        $('#modalSuccessPayment').modal('show');
                        pushParamToURL('charge', 'success');
                    }
                    else if(res.status == 401){
                        $('#modalFailPayment #failMessage').text('Bạn cần phải đăng nhập để hoàn thiện giao dịch!');
                        $('#modalFailPayment').modal('show');
                        pushParamToURL('charge', 'failed');
                    }
                    else if(res.status == 0){
                        let html = res.message;
                        if(res.error){
                            html += `<span class="error_register text-danger">` + (res.error?? '') + `</span><span class="cursor-pointer copy-error"><img src="/assets/frontend/theme_5/image/svg/copy.svg"></span>`
                        }
                        $('#modalFailPayment #failMessage').html(html);
                        $('#modalFailPayment').modal('show');
                        pushParamToURL('charge', 'failed');
                    }
                    else{
                        $('#modalFailPayment #failMessage').text('Đã có lỗi xảy ra!');
                        $('#modalFailPayment').modal('show');
                        pushParamToURL('charge', 'failed');
                    }
                    if(res.captcha === 'cf'){
                        const captcha_charge = $('#captcha_charge');
                        if (captcha_charge.length) {
                            turnstile.reset(captcha_charge[0]);
                        }
                        const captcha_charge_home = $('#captcha_charge_home');
                        if (captcha_charge_home.length) {
                            turnstile.reset(captcha_charge_home[0]);
                        }
                        const captcha_charge_home_mob = $('#captcha_charge_home_mob');
                        if (captcha_charge_home_mob.length) {
                            turnstile.reset(captcha_charge_home_mob[0]);
                        }
                        const captcha_charge_modal = $('#captcha_charge_modal');
                        if (captcha_charge_modal.length) {
                            turnstile.reset(captcha_charge_modal[0]);
                        }
                    }
                },
                error: function (res) {
                    $('#orderCharge').modal('hide');
                    $('#modalFailPayment #failMessage').text('Đã có lỗi xảy ra!');
                    $('#modalFailPayment').modal('show');
                },
                complete: function () {
                    reloadCaptcha();
                    $('#reload_1').trigger('click');
                    $('#orderCharge #confirmSubmitButton').prop("disabled", false);
                    $('#orderCharge #confirmSubmitButton').text("Xác nhận");

                    $('#chargeCardForm input[name="pin"]').val('');
                    $('#chargeCardForm input[name="serial"]').val('');
                    // $('#chargeCardForm input[name="captcha"]').val('');
                    $('#chargeCardForm input[name="amount"]').prop("checked", false);

                    $('#chargeCardModalForm input[name="pin"]').val('');
                    $('#chargeCardModalForm input[name="serial"]').val('');
                    // $('#chargeCardModalForm input[name="captcha"]').val('');
                    $('#chargeCardModalForm input[name="amount"]').prop("checked", false);

                    $('#chargeCardHomeForm input[name="pin"]').val('');
                    $('#chargeCardHomeForm input[name="serial"]').val('');
                    // $('#chargeCardHomeForm input[name="captcha"]').val('');
                    $('#chargeCardHomeForm input[name="amount"]').prop("checked", false);

                    // grecaptcha.reset();
                }
            });
        }

    });
    $("#reloadCaptcha").on('click', function () {
        reloadCaptcha();
    });
    $("#reloadModalCaptcha").on('click', function () {
        reloadCaptcha();
    });
    $(document).on('click', '#chargeConfirmStep #confirmSubmitButtonMobile', function(e) {
        e.preventDefault();
        let sys_charge_finger = $("#sys_charge_finger").val();
        if (sys_charge_finger == 1) {
            import(`../../lib/fingerprint/fingerprint.js`)
            .then(FingerprintJS => FingerprintJS.load())
            .then(fp => fp.get())
            .then(result => {
                const visitorId = result.visitorId;
                chargeDataSend.finger = visitorId ?? null;
                continueFormSubmission(visitorId);
            })
            .catch(error => console.error(error));
        function continueFormSubmission(visitorId) {
            $.ajax({
                url:'/nap-the',
                type:'POST',
                data: chargeDataSend,
                beforeSend: function () {
                    $('#chargeConfirmStep #confirmSubmitButtonMobile').prop("disabled", true);
                    $('#chargeConfirmStep #confirmSubmitButtonMobile').text("Đang xử lý");
                    //Delete text in success and fail modal
                    $('#modalSuccessPayment #successMessage').text('');
                    $('#modalFailPayment #failMessage').text('');
                },
                success:function (res) {
                    if(res.status == 1) {
                        $('#modalSuccessPayment #successMessage').text(res.message + ': ' + (res.ip ? `: ${res.ip}` : ''));
                        $('#modalSuccessPayment').modal('show');
                    }
                    else if(res.status == 401){
                        $('#modalFailPayment #failMessage').text('Bạn cần phải đăng nhập để hoàn thiện giao dịch!');
                        $('#modalFailPayment').modal('show');
                    }
                    else if(res.status == 0){
                        let html = res.message;
                        if(res.error){
                            html += `<span class="error_register text-danger">` + (res.error?? '') + `</span><span class="cursor-pointer copy-error"><img src="/assets/frontend/theme_5/image/svg/copy.svg"></span>`
                        }
                        $('#modalFailPayment #failMessage').html(html);
                        $('#modalFailPayment').modal('show');
                    }
                    else{
                        $('#modalFailPayment #failMessage').text('Đã có lỗi xảy ra!');
                        $('#modalFailPayment').modal('show');
                    }
                    if(res.captcha === 'cf'){
                        const captcha_charge = $('#captcha_charge');
                        if (captcha_charge.length) {
                            turnstile.reset(captcha_charge[0]);
                        }
                        const captcha_charge_home = $('#captcha_charge_home');
                        if (captcha_charge_home.length) {
                            turnstile.reset(captcha_charge_home[0]);
                        }
                        const captcha_charge_home_mob = $('#captcha_charge_home_mob');
                        if (captcha_charge_home_mob.length) {
                            turnstile.reset(captcha_charge_home_mob[0]);
                        }
                        const captcha_charge_modal = $('#captcha_charge_modal');
                        if (captcha_charge_modal.length) {
                            turnstile.reset(captcha_charge_modal[0]);
                        }
                    }
                },
                error: function (res) {
                    $('#modalFailPayment #failMessage').text('Đã có lỗi xảy ra!');
                    $('#modalFailPayment').modal('show');
                },
                complete: function () {
                    reloadCaptcha()
                    $('#reload_1').trigger('click');
                    $('#chargeConfirmStep .close-step').trigger('click');

                    $('#chargeConfirmStep #confirmSubmitButtonMobile').prop("disabled", false);
                    $('#chargeConfirmStep #confirmSubmitButtonMobile').text("Xác nhận");

                    $('#chargeCardForm input[name="pin"]').val('');
                    $('#chargeCardForm input[name="serial"]').val('');
                    // $('#chargeCardForm input[name="captcha"]').val('');
                    $('#chargeCardForm input[name="amount"]').prop("checked", false);

                    $('#chargeCardModalForm input[name="pin"]').val('');
                    $('#chargeCardModalForm input[name="serial"]').val('');
                    // $('#chargeCardModalForm input[name="captcha"]').val('');
                    $('#chargeCardModalForm input[name="amount"]').prop("checked", false);

                    $('#chargeCardHomeFormMobile input[name="pin"]').val('');
                    $('#chargeCardHomeFormMobile input[name="serial"]').val('');
                    // $('#chargeCardHomeFormMobile input[name="captcha"]').val('');
                    $('#chargeCardHomeFormMobile input[name="amount"]').prop("checked", false);
                }
            });
        }
        } else {
            $.ajax({
                url:'/nap-the',
                type:'POST',
                data: chargeDataSend,
                beforeSend: function () {
                    $('#chargeConfirmStep #confirmSubmitButtonMobile').prop("disabled", true);
                    $('#chargeConfirmStep #confirmSubmitButtonMobile').text("Đang xử lý");
                    //Delete text in success and fail modal
                    $('#modalSuccessPayment #successMessage').text('');
                    $('#modalFailPayment #failMessage').text('');
                },
                success:function (res) {
                    if(res.status == 1) {
                        $('#modalSuccessPayment #successMessage').text(res.message + ': ' + (res.ip ? `: ${res.ip}` : ''));
                        $('#modalSuccessPayment').modal('show');
                    }
                    else if(res.status == 401){
                        $('#modalFailPayment #failMessage').text('Bạn cần phải đăng nhập để hoàn thiện giao dịch!');
                        $('#modalFailPayment').modal('show');
                    }
                    else if(res.status == 0){
                        let html = res.message;
                        if(res.error){
                            html += `<span class="error_register text-danger">` + (res.error?? '') + `</span><span class="cursor-pointer copy-error"><img src="/assets/frontend/theme_5/image/svg/copy.svg"></span>`
                        }
                        $('#modalFailPayment #failMessage').html(html);
                        $('#modalFailPayment').modal('show');
                    }
                    else{
                        $('#modalFailPayment #failMessage').text('Đã có lỗi xảy ra!');
                        $('#modalFailPayment').modal('show');
                    }
                    if(res.captcha === 'cf'){
                        const captcha_charge = $('#captcha_charge');
                        if (captcha_charge.length) {
                            turnstile.reset(captcha_charge[0]);
                        }
                        const captcha_charge_home = $('#captcha_charge_home');
                        if (captcha_charge_home.length) {
                            turnstile.reset(captcha_charge_home[0]);
                        }
                        const captcha_charge_home_mob = $('#captcha_charge_home_mob');
                        if (captcha_charge_home_mob.length) {
                            turnstile.reset(captcha_charge_home_mob[0]);
                        }
                        const captcha_charge_modal = $('#captcha_charge_modal');
                        if (captcha_charge_modal.length) {
                            turnstile.reset(captcha_charge_modal[0]);
                        }
                    }
                },
                error: function (res) {
                    $('#modalFailPayment #failMessage').text('Đã có lỗi xảy ra!');
                    $('#modalFailPayment').modal('show');
                },
                complete: function () {
                    reloadCaptcha()
                    $('#reload_1').trigger('click');
                    $('#chargeConfirmStep .close-step').trigger('click');

                    $('#chargeConfirmStep #confirmSubmitButtonMobile').prop("disabled", false);
                    $('#chargeConfirmStep #confirmSubmitButtonMobile').text("Xác nhận");

                    $('#chargeCardForm input[name="pin"]').val('');
                    $('#chargeCardForm input[name="serial"]').val('');
                    // $('#chargeCardForm input[name="captcha"]').val('');
                    $('#chargeCardForm input[name="amount"]').prop("checked", false);

                    $('#chargeCardModalForm input[name="pin"]').val('');
                    $('#chargeCardModalForm input[name="serial"]').val('');
                    // $('#chargeCardModalForm input[name="captcha"]').val('');
                    $('#chargeCardModalForm input[name="amount"]').prop("checked", false);

                    $('#chargeCardHomeFormMobile input[name="pin"]').val('');
                    $('#chargeCardHomeFormMobile input[name="serial"]').val('');
                    // $('#chargeCardHomeFormMobile input[name="captcha"]').val('');
                    $('#chargeCardHomeFormMobile input[name="amount"]').prop("checked", false);
                }
            });
        }

    });
    function getPromotionLockMoney() {
        $.ajax({
            type: 'GET',
            async:true,
            cache:false,
            url: '/get-promotion-lock-money',
            beforeSend: function () {

            },
            success: function (data) {
                let htmlLockMoney = ''

                if (data.type){
                    if (data.type == 1){
                        $('.promotion_lock_charge').html('KM '+data.data+'%');
                        htmlLockMoney += '<div class="c-mx-n16 c-px-12 c-py-12 d-flex c-mb-12">';
                        htmlLockMoney += '<div class="c-mr-8"><img src="/assets/frontend/theme_rito/image/lock_money/bonus.png" alt=""></div>';
                        htmlLockMoney += '<div class="d-flex flex-column my-auto">';
                        htmlLockMoney += '<div class="fz-15 lh-16 fw-400 text-ghost">Nạp thẻ cào để nhận khuyến mãi lên đến <span class="fz-15 lh-16 fw-700">'+ data.data +'%</span></div>';
                        htmlLockMoney += '</div>';
                        htmlLockMoney += '</div>';
                        $('.amount_promotion').data('promotion', data.data);
                    }else if (data.type == 2){
                        var telecom = data.data;
                        if (telecom){
                            $.each(telecom,function(telecom_key,amount){
                                $.each(amount,function(key_amount,value){
                                    if (value && value > 0){
                                        $('.promotion_lock_charge_'+telecom_key+'_'+key_amount).html('KM '+value+'%');
                                        $('.amount_promotion_'+telecom_key+'_'+key_amount).data('promotion', value);
                                    }
                                })
                            })
                        }
                    }

                }
                $("#lockMoneyRecharge").html(htmlLockMoney)

            },
            complete: function () {

            }
        });
    };
    // Get card data
    function getTelecom () {
        let url = '/ajax/get-tele-card';

        $.ajax({
            type: "GET",
            async:true,
            cache:false,
            url: url,
            success: function (data) {
                if(data.status == 1){
                    let html = '';

                    if ( data.data.length > 0 ) {
                        $.each( data.data, function ( key, value ) {
                            html += '<option value="'+value.key+'">'+value.title+'</option>';
                        });
                    } else {
                        html += '<option value="">-- Vui lòng chọn nhà mạng --</option>';
                    }

                    $('select#telecom').html(html)
                    $('.select-form').niceSelect('update');

                    let typeValue = $('#telecom').val();

                    if ( typeValue ) {
                        getAmount(typeValue);
                    } else {

                    }
                }
            },
            error: function (data) {
                swal({
                    title: "Lỗi !",
                    text: "Có lỗi phát sinh vui lòng liên hệ QTV để kịp thời xử lý.",
                    icon: "error",
                    buttons: {
                        cancel: "Đóng",
                    },
                })
            },
            complete: function (data) {
                $('#charge_card .loader-container').remove();
                $('#charge_card .content-block').removeClass('d-none');
            }
        });
    }
    $(document).on('click','.daylamapin',function(){
        reloadCaptcha();
    });
    function getAmount (telecom, widgetType) {
        let url = '/ajax/get-amount-tele-card';
        $.ajax({
            type: "GET",
            async:true,
            cache:false,
            url: url,
            data: {
                telecom: telecom
            },
            beforeSend: function () {
                if (widgetType == 1) {
                    $('#cardAmount').empty();
                }
                if (widgetType == 2) {
                    $('#cardAmountModal').empty();
                }
                if (widgetType == 3) {
                    $('#cardAmount').empty();
                    $('#cardAmountMobile').empty();
                    $('#cardAmountModal').empty();
                }
                if (widgetType == 4) {
                    $('#cardAmountMobile').empty();
                }
                $('.money-form-group .loader').removeClass('d-none');
            },
            success: function (data) {
                // if (data.status == 0) {
                //     switch (widgetType) {
                //         case 1:
                //             $('.checkTelecom').html(`<div class="col-md-12 c-px-4 money-radio-form" style="color: red">Vui lòng chọn nhà mạng</div>`)
                //     }
                // }
                if (data.status == 1) {
                    // Append new data both in mobile and desktop
                    let html = '';
                    let htmlMobile = '';
                    let htmlModal ='';
                    if ( data.data.length > 0 ) {
                        $.each( data.data, function( key, value ) {
                            html += '<div class="col-4 c-px-4 money-radio-form my-auto">';
                            htmlMobile += '<div class="col-4 c-px-4 money-radio-form my-auto">';
                            htmlModal += '<div class="col-4 c-px-4 money-radio-form my-auto">';

                            if (value.promotion_ratio && value.promotion_ratio > 0){
                                html += '<input name="amount" type="radio" id="recharge_amount_'+key+'" data-ratio="'+value.ratio_true_amount+'" data-promotion="'+value.promotion_ratio+'" value="'+value.amount+'" hidden>';
                                htmlMobile += '<input name="amount" type="radio" id="recharge_amount_mobile_'+key+'" data-ratio="'+value.ratio_true_amount+'" data-promotion="'+value.promotion_ratio+'" value="'+value.amount+'" hidden>';
                                htmlModal += '<input name="amount" type="radio" id="recharge_amount_modal_'+key+'" data-ratio="'+value.ratio_true_amount+'" data-promotion="'+value.promotion_ratio+'" value="'+value.amount+'" hidden>';
                            }else {
                                html += '<input name="amount" type="radio" id="recharge_amount_'+key+'" data-ratio="'+value.ratio_true_amount+'" data-promotion="0" value="'+value.amount+'" hidden>';
                                htmlMobile += '<input name="amount" type="radio" id="recharge_amount_mobile_'+key+'" data-ratio="'+value.ratio_true_amount+'" data-promotion="0" value="'+value.amount+'" hidden>';
                                htmlModal += '<input name="amount" type="radio" id="recharge_amount_modal_'+key+'" data-ratio="'+value.ratio_true_amount+'" data-promotion="0" value="'+value.amount+'" hidden>';
                            }

                            // }
                            html += '<label for="recharge_amount_'+key+'" class="c-py-16 c-px-8 c-mb-8 brs-8 p_recharge_amount">';
                            if(value.params !== null){
                                html += `<div class="`;
                                if(value.params.option == 0){
                                    html += `topup_sst_inner_right">`;
                                }else {
                                    html += `topup_sst_inner_left">`;
                                }
                                html += `<img src="`+value.params.icon+`" alt="" style="width: 100%">`;
                                html += ` </div>`;
                            }


                            html += '<p class="fw-500 fs-15 mb-0">'+ formatNumber(value.amount)  +'đ</p>';
                            html += '<p class="fw-500 fs-15 mb-0" style="color: #82869E;font-size: 12px"> Nhận '+ value.ratio_true_amount  +'%</p>';
                            if (value.promotion_ratio && value.promotion_ratio > 0){
                                html += '<span class="fw-500 fz-11 mb-0 promotion_lock_charge" >KM '+ value.promotion_ratio  +'% </span>';
                            }
                            html += '</label>';
                            html += '</div>';

                            htmlMobile += '<label for="recharge_amount_mobile_'+key+'" class="c-py-16 c-px-8 c-mb-8 brs-8 p_recharge_amount">';
                            if(value.params !== null){
                                htmlMobile += `<div class="`;
                                if(value.params.option == 0){
                                    htmlMobile += `topup_sst_inner_right">`;
                                }else {
                                    htmlMobile += `topup_sst_inner_left">`;
                                }
                                htmlMobile += `<img src="`+value.params.icon+`" alt="" style="width: 100%">`;
                                htmlMobile += ` </div>`;
                            }
                            htmlMobile += '<p class="fw-500 fs-15 mb-0">'+ formatNumber(value.amount)  +'đ</p>';
                            htmlMobile += '<p class="fw-500 fs-15 mb-0" style="color: #82869E;font-size: 11px"> Nhận '+ value.ratio_true_amount  +'%</p>';
                            if (value.promotion_ratio && value.promotion_ratio > 0){
                                htmlMobile += '<span class="fw-500 fz-11 mb-0 promotion_lock_charge" >KM '+ value.promotion_ratio  +'% </span>';
                            }
                            htmlMobile += '</label>';
                            htmlMobile += '</div>';

                            htmlModal += '<label for="recharge_amount_modal_'+key+'" class="c-py-16 c-px-8 c-mb-8 brs-8 p_recharge_amount">';
                            if(value.params !== null){
                                htmlModal += `<div class="`;
                                if(value.params.option == 0){
                                    htmlModal += `topup_sst_inner_right">`;
                                }else {
                                    htmlModal += `topup_sst_inner_left">`;
                                }
                                htmlModal += `<img src="`+value.params.icon+`" alt="" style="width: 100%">`;
                                htmlModal += ` </div>`;
                            }
                            htmlModal += '<p class="fw-500 fs-15 mb-0">'+ formatNumber(value.amount)  +'đ</p>';
                            htmlModal += '<p class="fw-500 fs-15 mb-0" style="color: #82869E;font-size: 12px"> Nhận '+ value.ratio_true_amount  +'%</p>';
                            if (value.promotion_ratio && value.promotion_ratio > 0){
                                htmlModal += '<span class="fw-500 fz-11 mb-0 promotion_lock_charge" > KM '+ value.promotion_ratio  +'% </span>';
                            }
                            htmlModal += '</label>';
                            htmlModal += '</div>';
                        });
                    }

                    //Append new amount data
                    if (widgetType == 1) {
                        $('#cardAmount').html(html);
                    }
                    if (widgetType == 2) {
                        $('#cardAmountModal').html(htmlModal);
                    }
                    if (widgetType == 3) {
                        $('#cardAmount').html(html);
                        $('#cardAmountMobile').html(htmlMobile);
                        $('#cardAmountModal').html(htmlModal);
                    }
                    if (widgetType == 4) {
                        $('#cardAmountMobile').html(htmlMobile);
                    }
                    reloadCaptcha();
                }
                // checked_input_cardamout()
            },
            error: function (data) {
                swal({
                    title: "Lỗi !",
                    text: "Có lỗi phát sinh vui lòng liên hệ QTV để kịp thời xử lý.",
                    icon: "error",
                    buttons: {
                        cancel: "Đóng",
                    },
                })
            },
            complete: function (data) {
                if (!$('.money-form-group .loader').hasClass('d-none')){
                    $('.money-form-group .loader').addClass('d-none');
                }
            }
        });
    }
});
