$(document).ready(function () {
    let content_history = $('.loadjs_option_nick_ctv');
    let wrap_history = content_history.length ? content_history.parent() : '';
    function loadNickOptionCtv(){
        $.ajax({
            type: 'GET',
            async: true,
            cache: false,
            url: '/get-list-product-option-nick-ctv',
            data: {
            },
            beforeSend: function (xhr) {
                /*Thêm loading khi tải*/
                if (!wrap_history.hasClass('is-load')) {
                    wrap_history.addClass('is-load');
                    let loading = '<div class="loading-wrap"><span class="modal-loader-spin"></span></div>';
                    wrap_history.prepend(loading);
                }
            },
            success: (res) => {
                if (res.status == 1) {
                    $('.loadjs_option_nick_ctv').html(res.htmlloadoptionctv);
                    swiper_config_related_service_ctv.update();
                } else if (res.status == 0) {
                    var html = '';
                    html += '<div class="row pb-3 pt-3"><div class="col-md-12 text-center"><span style="color: red;font-size: 16px;">' + res.message + '</span></div></div>';

                    $('.loadjs_option_nick_ctv').html('')
                    $('.loadjs_option_nick_ctv').html(html)
                }
            },
            complete: function (res) {
                wrap_history.removeClass('is-load')
                wrap_history.find('.loading-wrap').remove();
            }
        });
        // },180000);
    }
    loadNickOptionCtv()
})


