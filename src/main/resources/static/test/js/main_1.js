/*format tiền*/
let money_format = wNumb({
    thousand: '.',
    suffix: ' đ'
});
let percent_format = wNumb({
    suffix: ' %'
});
let money_format_vnd = wNumb({
    thousand: '.',
    suffix: ' vnd'
});

$(document).ready(function() {
    function setDelayedFunctionModal() {
        if($('#rechargeModal').hasClass('show')){
            setTimeout(function () {
                reloadCaptcha();
                setDelayedFunctionModal();
            }, 60 * 60 * 1000);
        }
    }
    $(document).on('visibilitychange', function() {
        if($('#rechargeModal').hasClass('show') || window.location.pathname == '/nap-the'){
            if (document.visibilityState === 'visible') {
                reloadCaptcha();
                setDelayedFunctionModal();
            }
        }
    });
    // Button xử lý mở modal nạp tiền
    $(document).on('click', '.handle-recharge-modal',function(e){
        e.preventDefault();
        reloadCaptcha();
        setDelayedFunctionModal();
        $('#rechargeModal').modal('show');
        let tabActive = $(this).data('tab');

        if (tabActive) {
            if (tabActive == 1) {
                $('[href="#charge_card"]').tab('show');
            }
            if (tabActive == 2) {
                $('[href="#atm_card"]').tab('show');
            }
        } else {
            $('[href="#charge-card"]').tab('show');
        }
    });


    /*Tất cả các thẻ select sẽ được dùng plugin select nice*/
    $('select').niceSelect();
    /*Quantity*/
    $(document).on('click','.js-quantity-minus',function (event) {
        event.preventDefault();
        let input = $(this).closest('.js-quantity').find('.js-quantity-input');
        input.val(parseInt(input.val()) - 1);
        if(input.val() < 1 || isNaN(input.val())){
            input.val(1);
        }
        input.trigger('input')
    });
    $(document).on('click','.js-quantity-add',function (event) {
        event.preventDefault();
        let input = $(this).closest('.js-quantity').find('.js-quantity-input');
        input.val(parseInt(input.val()) + 1);
        if(input.val() > 20 || isNaN(input.val())){
            input.val(20);
        }
        input.trigger('input');
    });
    $(document).on('input','.js-quantity-input',function () {
        if ($(this).val() > 20 || isNaN($(this).val())){
            $(this).val(20);
            $(this).trigger('change');
        }
        if ($(this).val() < 1 || isNaN($(this).val())){
            $(this).val(1);
            $(this).trigger('change');
        }
    });
    /*End quantity*/
    /*Input chỉ được nhập số*/
    $(document).on('keypress','input[numberic]', function (e) {
        if (isNaN(this.value + String.fromCharCode(e.keyCode))) return false;
    });
    /*Dùng date time cho input */
    let date_time_picker = $('.date-left,.date-right');
    if (date_time_picker.length){
        /*config date_time_picker*/
        date_time_picker.datetimepicker({
            format: 'DD-MM-YYYY LT',
            useCurrent: false,
            locale:'vi',
            maxDate: moment(),
            icons:
                { time: 'fas fa-clock',
                    date: 'fas fa-calendar',
                    up: 'fas fa-arrow-up',
                    down: 'fas fa-arrow-down',
                    previous: 'fas fa-arrow-circle-left',
                    next: 'fas fa-arrow-circle-right',
                    today: 'far fa-calendar-check-o',
                    clear: 'fas fa-trash',
                    close: 'far fa-times' },
        });
        /*auto close after choose*/
        date_time_picker.datetimepicker().on('dp.change', function(e){
            if( !e.oldDate || !e.date.isSame(e.oldDate, 'day')){
                $(this).data('DateTimePicker').hide();
            }
        });
    }
    tippy('.copy-content-charge', {
        trigger: 'click',
        content: "Đã copy",
        placement: 'right',
        onShow(instance) {
            setTimeout(() => {
                instance.hide();
            }, 1500);
        },
        hideOnClick: true,
    });
    $('.copy-content-charge').on('click', function () {
        let text_content = $(this).closest('th').text().trim();
        navigator.clipboard.writeText(text_content);
    });

    /*Mua thẻ thành công*/
    tippy('.js-copy-text', {
        // default
        trigger: 'click',
        content: "Đã copy",
        placement: 'right',
    });

    tippy('.box-viewed', {
        // default
        content: "Danh mục đã xem",
        placement: 'top',
    });

    $('.js-copy-text').on('click', function () {
        let text_value = $(this).parent().find('.card__info').text().trim();
        navigator.clipboard.writeText(text_value);
        $(this).parent().addClass('active')
    });

    /*Bottom sheet (Mobile)*/
    let bottom_sheet = $('.sheet-footer');
    if (bottom_sheet.length){
        bottom_sheet.prev().css('bottom',bottom_sheet.outerHeight());
    }

    /*Filter Account*/
    $('.js-reset-form').on('click',function (e) {
        e.preventDefault();
        $(this).closest('form').trigger('reset');
        if ($(this).closest('.bottom-sheet').length) {
            $('form select').niceSelect('update');
        }
    });
    $('.js-submit-form').on('click',function (e) {
        e.preventDefault();
        $(this).closest('form').trigger('submit');
    });
    /*Sort Account*/

    /*Desktop*/
    $(document).on('click','.selection',function (e) {
        e.preventDefault();
        let value_sort = $('.value-sort');
        value_sort.find('.selection').removeClass('active');
        $(this).addClass('active');
    });

    /*Mobile*/
    $(document).on('change','input[name=sort]',function () {
        $('label[for=bottom-sheet-sort]').trigger('click');
        $('label.tool-sort').text($(this).parent().text().trim());
    });
    /*Modal chi tiết nick liên minh*/

    $('body').on('click','.submit--search',function(e){
        e.preventDefault();
        let keyword = convertToSlug($('#keyword--search').val());

        let index = 0;
        $('.item-nick-lmht').each(function (i,elm) {
            $('.body-modal__nick__text-error').css('display','none');
            let slug_item = $(elm).find('img').attr('alt');
            slug_item = convertToSlug(slug_item);
            $(this).toggle(slug_item.indexOf(keyword) > -1);
            if (slug_item.indexOf(keyword) > -1){
                index = index + 1
            }else {}

            if (index == 0){
                $('.body-modal__nick__text-error').css('display','block');
            }

        })
    })

    function convertToSlug(title) {
        var slug;
        //Đổi chữ hoa thành chữ thường
        slug = title.toLowerCase();
        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        // trả về kết quả
        return slug;
    }
    var width_main= $(window).width();
    if (width_main < 992){
        /*Step Mobile*/
        $('body').on('click','.js-step',function () {
            let selector = $(this).data('target');
            let elm = $(selector);
            elm.css('transform','translateX(0)');
        })
        $('body').on('click','.close-step',function (e) {
            e.preventDefault();
            let elm = $(this).closest('.step');
            elm.css('transform','translateX(130%)')
        })

        /*Box-shadow*/
        $('.body-mobile').on('scroll',function () {
            $('.head-mobile').toggleClass('box-shadow',!!$(this).scrollTop())
        })
    }

    /*toggle password*/
    $(document).on('click','.toggle-password',function (e) {
        let start = width < 992 ? $(this).outerWidth() - 54 : $(this).outerWidth() - 32;
        let end = $(this).outerWidth() - 12;
        if (e.offsetX >= start && e.offsetX <= end) {
            $(this).toggleClass('is_show');
            let input = $(this).find('input');
            if (input.attr("type") === "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        }
    });
    $(document).on('click','.copy-input',function (e) {
        let start;
        let end;
        if ($(this).hasClass('toggle-password')){
            start = width < 992 ? $(this).outerWidth() - 75 : $(this).outerWidth() - 60;
            end =  $(this).outerWidth() - 40;
        } else {
            start = width < 992 ? $(this).outerWidth() - 54 : $(this).outerWidth() - 32;
            end =  $(this).outerWidth() - 12;
        }
        if (e.offsetX >= start && e.offsetX <= end) {
            let value = $(this).find('input').val();
            navigator.clipboard.writeText(value);
            tippy(e.target, {
                trigger: 'focus',
                content: "Đã copy",
                placement: 'right',
                showOnCreate: true,
            });
        }
    });
    $(document).on('click', '.copy-error', function (e) {
        var errorText = $(this).siblings('.error_register').text().trim();
        if (errorText) {
            var $tempTextarea = $('<textarea>');
            $('body').append($tempTextarea);
            $tempTextarea.val(errorText).select();
            document.execCommand('copy');
            $tempTextarea.remove();
            tippy(e.target, {
                trigger: 'focus',
                content: "Đã copy",
                placement: 'right',
                showOnCreate: true,
            });
        } else {
            tippy(e.target, {
                trigger: 'focus',
                content: "Không có nội dung để copy.",
                placement: 'right',
                showOnCreate: true,
            });
        }
    });

    //Handle Toggle Viewmore Action
    $(document).on('click', '.see-more', function (e) {
        e.preventDefault();
        let viewBlock = $(this).closest('.detailViewBlock');
        let viewBlockTitle = $(viewBlock).find('.detailViewBlockTitle').text();
        let viewBlockContent = $(viewBlock).find('.detailViewBlockContent').html();
        $('#viewMore #detailTitle').text(viewBlockTitle);
        $('#viewMore #detailContent').html(viewBlockContent);
        $('#sheet-view-more #detailTitleSheet').text(viewBlockTitle);
        $('#sheet-view-more #detailContentSheet').html(viewBlockContent);
            $('#viewMore').modal('show');
    });

    // Handle Toggle Nick
    function handleToggle(selector) {
        let nickContentDesc = $(selector).parent().prev();
        nickContentDesc.toggleClass('hide');
        $(selector).toggleClass('hide');
        if ($(selector).hasClass('hide')){
            $(selector).attr('data-content','Ẩn bớt nội dung');
        }else {
            $(selector).attr('data-content','Xem thêm nội dung');
        }
    }

    let content_desc_nick = $('.content-desc-nick');
    if (content_desc_nick.length){
        $(document).on('click','.see-more-nick',function () {
            handleToggle($(this));
        });
    }

    /*Auto config noUiSlider JS*/
    let slider_input = $('.slider-input');
    if(slider_input.length){
        Array.from(slider_input).forEach(function (elm) {
            let option = $(elm).data('option').split(',');
            let arr_start = $(elm).data('start').split(',');
            let range = {
                'min': parseInt(option[0]),
                'max': parseInt(option[1]),
            }
            let step= option[2] ? parseInt(option[2]) : 0;
            let start = [parseInt(arr_start[0]),parseInt(arr_start[1])];
            noUiSlider.create(elm, {
                start: start,
                step:step,
                connect: true,
                range: range,
            });
            elm.noUiSlider.on('update', function (values, handle) {
                $(elm).attr('data-min',Math.round(values[0]));
                $(elm).attr('data-max',Math.round(values[1]));
            });
            elm.noUiSlider.on('slide', function (values, handle) {
                $(elm).addClass('changed');
            })
        })
    }

    if (width > 992) {
        let sticky = $('.js_sticky');
        if (sticky.length) {
            $(document).on('scroll',function () {
                if ($(document).scrollTop() > 180) {
                    sticky.css('top',$(sticky).data('top'))
                }else {
                    sticky.css('top',0)
                }
            })
        }
    }

    /*scroll add box shadown*/
    let card_service_select = $('#select-service').find('.card-body');
    if (card_service_select.length){
        card_service_select.on('scroll',function () {
            $(this).parent().toggleClass('card-service-select',!!$(this).scrollTop())
        })
    }
});

