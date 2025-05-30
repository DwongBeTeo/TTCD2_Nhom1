var auth_check = false;
var auth_balance = false;
var auth_id = false;
let auth_balance_lock = 0;
var auth_user = null;
var width = $(window).width();
var usernameData = null;
var stringRd = null;
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
function fn(text, count) {
    return text.slice(0, count) + (text.length > count ? "..." : "");
}
// $(document).ready(function () {
//     getInfo();
// });

const csrf_token = $('meta[name="csrf-token"]').attr('content');
const token = $('meta[name="jwt"]').attr('content');
var  check_index = 0

function idAffiliate(){
    var data = localStorage.getItem("information");
    if (data) {
        data = JSON.parse(data);
        if (new Date().getTime() < data.expireTime) {
            if (auth_check) {
                if (window.location.pathname === '/thong-tin') {
                    $('#ref_id').val(data.value);
                }else if(window.location.pathname === '/register' ){
                    window.location.href = '/?ref_id='+ data.value;
                } else {
                    window.location.href = '/thong-tin';
                }
            }else{
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect');
                openRegisterModal();
                $('.refId').val(data.value);
                // if (redirect !== '0') {
                //     window.location.href = '/?ref_id=' + data.value + '&redirect=0';
                // }
            }
        } else {
            localStorage.removeItem("information");
            var expireTime = now.getTime() + 24 * 60 * 60 * 1000;
            var data = {
                value: parameterValue,
                expireTime: expireTime
            };
            localStorage.setItem("information", JSON.stringify(data));
            idAffiliate();
        }
    }
}

function checkLoginRef() {
    var parameterValue = getParameterByName('ref_id');
    var now = new Date();

    if (parameterValue != '' && parameterValue != null) {
        var expireTime = now.getTime() + 24 * 60 * 60 * 1000;
        var data = {
            value: parameterValue,
            expireTime: expireTime
        };
        localStorage.setItem("information", JSON.stringify(data));
        idAffiliate();
    }else{
        var data = localStorage.getItem("information");
        if (data) {
            data = JSON.parse(data);
            if (new Date().getTime() < data.expireTime) {
                $('.refId').val(data.value);
                $('#ref_id').val(data.value);
            }else{
                localStorage.removeItem("information");
            }
        }
    }
}
function pushParamToURL(paramKey, paramValue) {
    var url = window.location.href;
    if (url.indexOf('?') === -1) {
        url += '?' + paramKey + '=' + encodeURIComponent(paramValue);
    } else {
        if (url.indexOf(paramKey + '=') === -1) {
            url += '&' + paramKey + '=' + encodeURIComponent(paramValue);
        } else {
            var currentValue = getParameterByName(paramKey);
            if (currentValue !== paramValue) {
                var regex = new RegExp(paramKey + '=([^&]*)');
                url = url.replace(regex, paramKey + '=' + encodeURIComponent(paramValue));
            }
        }
    }
    window.history.replaceState({}, '', url);
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function scrollToTop(){
    $('body, html').animate({
        scrollTop: 0
    },'slow');
}
// $(document).ready(function () {
function getCsrfToken() {
    var csrfToken = null;
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf("XSRF-TOKEN=") === 0) {
            csrfToken = cookie.substring("XSRF-TOKEN=".length, cookie.length);
            break;
        }
    }
    return csrfToken;
}
function updateElementDisplay(selector, displayStyle) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.style.display = displayStyle;
    });
}

function setInnerHtml(selector, html) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.innerHTML = html;
    });
}

function setAttribute(selector, attribute, value) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.setAttribute(attribute, value);
    });
}

function updateUserProfile(responseData) {
    const { info } = responseData;
    auth_check = true;
    auth_balance = parseInt(info.balance);
    auth_balance_lock = parseInt(info.balance_lock || 0);
    auth_user = info;

    const cartPay = `<button type="submit" class="btn primary w-100">Thanh toán</button>`;
    const modalCharge = `<button type="button" class="btn primary w-100 handle-recharge-modal">Nạp thẻ</button>`;
    let numericValue = 0;
    if (document.querySelector('.total-pay')) {
        let totalPayElement = document.querySelector('.total-pay');
        let totalPayValue = totalPayElement.innerHTML;
        let numberOnly = totalPayValue.replace(/\D/g, '');
        numericValue = parseInt(numberOnly, 10);
    }
    if(auth_balance >= numericValue){
        setInnerHtml(".cart-pay", cartPay);
    }else{
        setInnerHtml(".cart-pay", modalCharge);
    }

    updateElementDisplay(".box-loading", "none");
    updateElementDisplay(".box-account_nologined", "none");
    updateElementDisplay(".box-account_logined", "block");

    const accountLoginedHtml = `
        <div class="d-flex">
            <div class="account-name">
                <div class="text-right title-color fw-500">${fn(info.fullname || info.username, 12)}</div>
                <div class="account-balance fw-400 title-color">Số dư: ${formatNumber(info.balance)}đ</div>
            </div>
            <div class="account-avatar c-ml-12">
                <img src="/assets/frontend/theme_rito/image/nam/anhdaidien.svg" alt="">
            </div>
        </div>`;
    setInnerHtml(".account-logined", accountLoginedHtml);
    const accountLoginedElement = document.querySelector(".account-logined");
    if (accountLoginedElement) {
        accountLoginedElement.classList.add("box-account-open");
    }

    setInnerHtml(".account-name-sidebar", info.fullname || info.username);
    setInnerHtml(".account-balance-sidebar", `Số dư: <span>${formatNumber(info.balance)}</span>`);
    setInnerHtml(".account-id-sidebar", `ID: <span>${info.id}</span>`);

    const logOutHtml = `
        <a href="javascript:void(0);" onclick="event.preventDefault();document.getElementById('logout-form').submit();" class="d-block align-items-center d-flex">
            <div class="sidebar-item-icon brs-8 c-p-8 c-mr-12">
                <img src="/assets/frontend/theme_rito/image/nam/log-out.svg" alt="" style="width: 24px;height: 24px">
            </div>
            <p class="sidebar-item-text fw-400 fz-12 mb-0">Đăng xuất</p>
        </a>`;
    setInnerHtml(".log-out-button", logOutHtml);

    const userProfileHtml = `
        <div class="sidebar-section-avt brs-100 c-mr-12">
            <img class="brs-100" src="/assets/frontend/theme_rito/image/nam/anhdaidien.svg" alt="">
        </div>
        <div class="sidebar-section-info">
            <div class="sidebar-section-title c-mb-4 fz-15 fw-500 profile-color">${fn(info.fullname || info.username, 12)}</div>
            <div class="sidebar-section-info-text c-mb-4 fz-13 fw-500 sidebar-user-balance profile-color">Số dư: <span class="profile-color">${formatNumber(info.balance)}đ</span></div>
            <div class="sidebar-section-info-text c-mb-4 fz-13 fw-500 sidebar-user-balance profile-color">Số dư Rito Coin: <span>${formatNumber(info.balance_affiliate || 0)} Rito Coin</span></div>
            <div class="sidebar-section-info-text c-mb-4 fz-13 fw-500 sidebar-user-balance profile-color">Số dư khuyến mãi: <span>${formatNumber(info.balance_lock || 0)}đ</span></div>
            <p class="sidebar-section-info-text mb-0 fz-13 fw-500 sidebar-user-id profile-color">ID: <span>${info.id}</span></p>
        </div>`;
    setInnerHtml(".sidebar-user-profile", userProfileHtml);

    setAttribute('meta[name="jwt"]', "content", responseData.token);

    const checkauthLoginInstruct = document.querySelector(".checkauth_login_instruct");
    if (checkauthLoginInstruct) checkauthLoginInstruct.style.visibility = "";

    const currentAmount = `${formatNumber(info.balance)}đ`;
    setInnerHtml(".current-amount", currentAmount);
    setInnerHtml(".account-balance", `Số dư: ${formatNumber(info.balance)}đ`);
    setInnerHtml(".wallet-balance .balance", formatNumber(info.balance) + ' đ');
}

function handleLogin(statusData) {
    updateElementDisplay(".box-loading", "none");
    updateElementDisplay(".box-logined", "block");
    updateElementDisplay(".box-account", "none");

    const accountLoginedHtml = `
        <div class="box-icon brs-8 ">
            <img src="/assets/frontend/theme_rito/image/nam/profile.svg" alt="profile">
        </div>`;
    setInnerHtml(".account-logined", accountLoginedHtml);

    const cartPay = `<button type="button" class="btn primary w-100" data-dismiss="modal" onclick="openLoginModal();">Đăng nhập</button>`;
    setInnerHtml(".cart-pay", cartPay);

    const accountLoginedElement = document.querySelector(".account-logined");
    if (accountLoginedElement) {
        accountLoginedElement.classList.remove("box-account-open");
        accountLoginedElement.classList.add("btn-modal-login");
    }

    updateElementDisplay(".box-account_nologined", "block");
    updateElementDisplay(".box-account_logined", "none");

    setAttribute('meta[name="jwt"]', "content", "");
    setInnerHtml(".current-amount", `0đ`);
}

function handleError() {
    alert("Lỗi dữ liệu, vui lòng load lại trang để tải lại dữ liệu");
}

function updateReferralInfo(responseData) {
    const { info } = responseData;
    if (info.in_active_captcha_charge === 1) {
        document.querySelector(".captchaShow")?.classList.add("d-none");
    }
    const referralUrl = `https://${window.location.host}/register?ref_id=${info.id}`;

    const domainReferralElement = document.getElementById("domain-referral");
    if (domainReferralElement) {
        domainReferralElement.value = referralUrl;
    }

    setInnerHtml(".domain-referral_check", referralUrl);
    setInnerHtml(".info-withdraw", `Số tiền hiện có từ giới thiệu: ${info.balance_affiliate ? formatNumber(info.balance_affiliate) : ''} Rito Coin`);

    if (info.balance_affiliate) {
        setInnerHtml("#balance_affiliate", `<span style="color: red;text-decoration: none;font-weight: 600;font-style: italic"><span class="balance_affiliate_current">${formatNumber(info.balance_affiliate)}</span> Rito Coin</span>`);

        const balanceAffiliateNoFormatElement = document.getElementById("balance_affiliate_noformat");
        if (balanceAffiliateNoFormatElement) {
            balanceAffiliateNoFormatElement.value = info.balance_affiliate;
        }

        const infoWithdrawElement = document.getElementById("info-withdraw");
        if (infoWithdrawElement) {
            infoWithdrawElement.value = `Tiền giới thiệu: ${formatNumber(info.balance_affiliate)} Rito Coin`;
        }
    } else {
        setInnerHtml("#balance_affiliate", `<span style="color: red;text-decoration: none;font-weight: 600;font-style: italic"><span class="balance_affiliate_current">0</span> Rito Coin</span>`);

        const balanceAffiliateNoFormatElement = document.getElementById("balance_affiliate_noformat");
        if (balanceAffiliateNoFormatElement) {
            balanceAffiliateNoFormatElement.value = 0;
        }

        const infoWithdrawElement = document.getElementById("info-withdraw");
        if (infoWithdrawElement) {
            infoWithdrawElement.value = `Tiền giới thiệu: 0 Rito Coin`;
        }
    }
    if (info.user_introduce_id) {
        var userRefName = info.user_introduce.fullname ?? info.user_introduce.username;
        var inputElement = document.querySelector('#affiliate-enable input');
        if (inputElement) {
            inputElement.value = `Bạn đã được giới thiệu bởi: ${userRefName} (ID: ${info.user_introduce.id})`;
            inputElement.setAttribute('disabled', true);
            document.querySelector('#affiliate-enable button').classList.add('d-none');
        }
    }

    // charge atm
    updateElementDisplay(".auth-charge-atm", "unset");
    updateElementDisplay(".atm-recharge-attr", "none");

}
function getInfo() {
    const url = "/ajax/user/account_info";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const jwt_token = document.querySelector('meta[name="jwt"]').getAttribute('content');
    const data = {
        _token: csrf_token,
        jwt: jwt_token
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status !== 200) {
            // swal("Lỗi!", "Có lỗi phát sinh, vui lòng liên hệ QTV để kịp thời xử lý - Error: 1", "error");
            console.log('Có lỗi phát sinh, vui lòng liên hệ QTV để kịp thời xử lý - Error: 1');
            return;
        }

        const responseData = JSON.parse(xhr.responseText);
        const statusData = responseData.status;
        let resultData = responseData.username;
        resultData = resultData.split(",");
        usernameData = resultData[0];
        stringRd = resultData[1];

        if (statusData === "ERROR") {
            handleError();
        }
        if (statusData === true) {
            updateUserProfile(responseData);
            updateReferralInfo(responseData);
        }else{
            handleLogin(statusData);
            checkLoginRef();
        }
    };

    xhr.send(Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&'));
}
document.addEventListener("DOMContentLoaded", function () {
    getInfo();
    scrollToTop();
    $('body').on('click', '.btn-modal-login', function (e) {
        e.preventDefault();
        openLoginModal()
    })
});

