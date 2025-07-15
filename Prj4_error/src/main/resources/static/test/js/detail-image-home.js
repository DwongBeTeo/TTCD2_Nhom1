"use strict"

let $item_selected, $server;
let input_pack = $('#input_pack');
let $text_total = $('.total__price');
var price_service_8 = 0;

$server = $('body select[name="server"]').val();
// Data bot
let table_bot = $('#table-bot');
if (table_bot.length) {
    $.ajax({
        type: 'GET',
        async: true,
        cache: false,
        url: '/show-bot',
        data: {
            slug: $params.slug,
        },
        success: (response) => {
            if (response.status) {
                table_bot.empty().html(response.data);
            }
        },
    })
}
let total_curency = $('#total_curency').data('currency');

let purchase_name = $params['filter_type'] * 1 === 7 ? $params['filter_name'] : total_curency;
let number_format = wNumb({
    thousand: '.',
    suffix: ` ${purchase_name}`,
});

switch ($params['filter_type']) {
    // dạng tiền tệ
    case '3':
        //chưa sử dụng
        break
    // Dạng chọn một
    case '4':
        let input_selected = $('select[name="selected"]');
        let input_server = $('select[name="server"]');

        $item_selected = input_selected.val();
        $server = input_server.val();
        input_selected.on('change', function () {
            $item_selected = $(this).val();
            setPrice();
        })
        input_server.on('change', function () {
            $server = $(this).val();
            setPrice();
        });
        setPrice();

        function setPrice() {
            let price = 0;
            let $elm_pack = $('.show-pack');
            if ($item_selected * 1 === -1) {
                return;
            }

            if ($params.server_mode * 1 === 1 && $params.server_price * 1 === 1) {

                let s_price = $params["price" + $server];

                price = parseInt(s_price[$item_selected]);

            } else {

                let s_price = $params["price"];

                price = parseInt(s_price[$item_selected]);

            }

            price = number_format.to(price)
            $text_total.text(price);
            $elm_pack.html(`<div class="t-sub-3 text-right">${input_selected.find(':selected').text()}</div><hr>`);
        }

        break;
    case '5':
        $('.input-checkbox input:not(.confirm-rule)[type="checkbox"]').on('change', function () {
            setPrice5();
        });

        function setPrice5() {
            let checked = $('.input-checkbox input:not(.confirm-rule)[type="checkbox"]:checked');
            let total = 0;
            let s_price;
            $item_selected = '';

            if ($params.server_mode * 1 === 1 && $params.server_price * 1 === 1) {
                s_price = $params["price" + $server];
            } else {
                s_price = $params["price"];
            }
            if (checked.length) {
                let $elm_pack = $('.show-pack');
                $elm_pack.empty();
                Array.from(checked).forEach(function (elm, id) {
                    let value = $(elm).val()
                    total += s_price[value] * 1;
                    $item_selected ? $item_selected += '|' : '';
                    $item_selected += value;

                    let service_name = $(elm).parent().find('.text-label').text().trim();
                    let html_pack = `<div class="t-sub-3 text-right">${service_name}</div><hr>`;
                    $elm_pack.append(html_pack);
                });
                $('input[name=selected]').val($item_selected)
            }
            total = number_format.to(total);
            $text_total.text(total);
        }

        break
    // trong khoảng
    case '6':
        $('.js-change-selected').on('change', function () {

            let type = $(this).data("type");

            UpdatePrice6(type);
        });

        UpdatePrice6();

        function UpdatePrice6(type) {
            let $elm_pack = $('.show-pack');
            let input_rank_from = $('select[name=rank_from]');
            let input_rank_to = $('select[name=rank_to]');

            let rank_from = input_rank_from.val() * 1;
            let rank_to = input_rank_to.val() * 1;

            let price = $params.price;

            let total = 0;
            if (rank_from < rank_to) {
                for (let i = parseInt(rank_from) + 1; i <= rank_to; i++) {
                    total += parseInt(price[i] - price[i - 1]);
                }
            } else {

                if (type * 1 === 0) {
                    rank_to = rank_from + 1;
                    for (var i = parseInt(rank_from) + 1; i <= rank_to; i++) {
                        total += parseInt(price[i] - price[i - 1]);
                    }
                    input_rank_to.val(rank_to);
                    input_rank_to.niceSelect('update')
                } else {

                    rank_from = rank_to - 1;
                    for (let i = parseInt(rank_from) + 1; i <= rank_to; i++) {
                        total += parseInt(price[i] - price[i - 1]);
                    }
                    input_rank_from.val(rank_from);
                    input_rank_from.niceSelect('update')
                }
            }
            let text_rank_from = input_rank_from.find('option:selected').text()
            let text_rank_to = input_rank_to.find('option:selected').text()
            let html_pack = `<div class="t-sub-3 text-right">${text_rank_from} - ${text_rank_to}</div>`;
            $elm_pack.html(html_pack);

            total = formatNumber(total) + ' VNĐ';
            $text_total.text(total);
        }

        break;
    // điền số tiền
    case '7':
        input_pack.on('input', function () {
            this.value = numberFormat($(this).val());
            input_pack.next().val(input_pack.val().replace('.', ''));
        });
        function UpdateTotal() {
            let wrongMoney = $('#wrongMoney').attr('data-wrongMoney');
            let price = input_pack.val().replace(/\./g, '') * 1;
            if (price < $params['input_pack_min'] || price > $params['input_pack_max']) {
                $text_total.text(wrongMoney);
                return;
            }
            let server_id = $('[name="server"]').val();
            let total = 0, index, current, discount = 0;
            if (!!price) {
                if ($params.server_mode * 1 === 1 && $params.server_price * 1 === 1) {
                    let s_price = $params["price" + server_id];
                    let s_discount = $params["discount" + server_id];
                    for (let i = 0; i < s_price.length; i++) {
                        if (price >= s_price[i] && !!s_price[i]) {
                            current = s_price[i];
                            index = i;
                            discount = s_discount[i];
                            total = price * s_discount[i];
                        }
                    }
                } else {
                    let s_discount = $params["discount"];
                    $params.price.forEach((price_mark, idx) => {
                        if (price >= price_mark) {
                            discount = s_discount[idx];
                        }
                    })
                    total = price * discount;
                }
                total = parseInt(total / 1000 * $params.input_pack_rate);

                $('#txt-discount').val(discount);// input hệ số:

                total = number_format.to(total);

                $text_total.text(total);
                let html_pack = `<div class="t-sub-3 text-right">${total}</div>`;
                $('.show-pack').html(html_pack);

                $('.total__price__modal').html(number_format.to(price).replace(purchase_name, total_curency));
            } else {
                $text_total.text(wrongMoney);
            }
        }

        input_pack.bind('focus keyup', function () {
            UpdateTotal();
        });
        $('select[name=server]').on('change', function () {
            UpdateTotal();
        });
        UpdateTotal()
        break;
    // điền số tiền
    case '8':
        input_pack.on('input', function () {
            this.value = numberFormat($(this).val());
            input_pack.next().val(input_pack.val().replace('.', ''));
        });
        function UpdateTotal8() {

            let price = input_pack.val().replace(/\./g, '') * 1;
            if (price < $params['input_pack_min'] || price > $params['input_pack_max']) {
                $text_total.text('Vật phẩm nhập không đúng');
                return;
            }
            let server_id = $('[name="server"]').val();
            let total = 0, index, current, discount = 0;
            if (!!price) {
                if ($params.server_mode * 1 === 1 && $params.server_price * 1 === 1) {
                    let s_price = $params["price" + server_id];
                    let s_discount = $params["discount" + server_id];
                    for (let i = 0; i < s_price.length; i++) {
                        if (price >= s_price[i] && !!s_price[i]) {
                            current = s_price[i];
                            index = i;
                            discount = s_discount[i];
                            total = price / s_discount[i];
                        }
                    }
                } else {
                    let s_discount = $params["discount"];
                    $params.price.forEach((price_mark, idx) => {
                        if (price >= price_mark) {
                            discount = s_discount[idx];
                        }
                    })
                    total = price / discount;
                }

                total = parseInt(total / 1000 * $params.input_pack_rate);

                $('#txt-discount').val(discount);// input hệ số:

                total = number_format.to(total);

                $text_total.text(total);
                let html_pack = `<div class="t-sub-3 text-right">${total}</div>`;
                $('.show-pack').html(html_pack);

                $('.total__price__modal').html(number_format.to(price).replace(purchase_name, 'VNĐ'));
            } else {
                $text_total.text('Vật phẩm nhập không đúng');
            }
        }

        input_pack.bind('focus keyup', function () {
            UpdateTotal8();
        });
        $('select[name=server]').on('change', function () {
            UpdateTotal8();
        });
        UpdateTotal8()
        break;
    default:
        break
}
function numberFormat(number) {
    let new_numb = number.replace(/\./g, "").toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    return new_numb.split('').reverse().join('').replace(/^[\.]/, '');
}

$('.auth-username').html(auth_user ? auth_user.username : '');

$('body').on('click', '.show-confirm-service-image-home', function (e) {
    e.preventDefault();
    $('#service_id').val($(this).data('id'))
    if (!auth_check) {
        openLoginModal();
    }
    if (auth_check) {

        let gate_id = $('#gate_id').val();

        if (gate_id && gate_id == 2) {
            let data_gate_id = $(this).data('gateid');
            if (data_gate_id == 1) {
                $('.send_name_idkey').hide();
                $('.step_send_name_idkey').hide();
                let count_send_name = 1;
                $('#service_index').val(count_send_name);
                $('#step_service_index').val(count_send_name);
            } else {
                let count_send_name = $('#count_send_name').val();
                $('#service_index').val(count_send_name);
                $('#step_service_index').val(count_send_name);
                $('.send_name_idkey').show();
                $('.step_send_name_idkey').show();
            }
        }

        let server_mode = $('.server_mode').val();

        let id = $(this).data('id');
        let selected = $(this).data('selected');

        let desc = $(this).data('desc');
        if (desc) {
            $('.data_params_note').html('');
            let html = `
                    <div class="card--gray c-mb-0 c-pt-8 c-pb-8 c-pl-12 c-pr-12 c-mt-16">
                        <div class="card--attr__total justify-content-between d-flex c-mb-16 text-center">
                            <div class="card--attr__value fz-13 fw-500" style="color: #DA4343;font-size: 12px">
                                 ${desc}
                            </div>
                        </div>
                    </div>

                `;

            width > 992 ? $('.data_params_note').html(html) : $('.data_params_note_mobie').html(html);
        }

        if (server_mode && server_mode == 1) {
            let server_title = $(this).data('server-title');
            let server = $(this).data('server');
            $('.show-server').html(server_title);

            width > 992 ? $('#buyServiceHomeModal .server').val(server) : $('#buyServiceHomeStep2 .server').val(server)

        }

        let pack = $(this).data('pack');

        $('.show-pack').html(pack);

        let price = $(this).data('price');
        price_service_8 = price
        // price = price.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        // price = price.split('').reverse().join('').replace(/^[\.]/, '');

        $('#total_curency').html(formatNumber(price) + 'đ');
        $('.total_curency_mobie').html(formatNumber(price) + 'đ');

        width > 992 ? $('#buyServiceHomeModal .selected').val(selected) : $('#buyServiceHomeStep2 .selected').val(selected)
        let htlm_km = '';
        htlm_km += `
            <div class="card--gray c-mb-16 c-pt-8 c-pb-8 c-pl-12 c-pr-12">
                <div class="card--attr justify-content-between d-flex c-mb-16 text-center">
                    <div class="card--attr__name fz-13 fw-400 text-center">`;
        htlm_km += 'Nhập mã giảm giá';
        htlm_km += `</div>
                    <div class="card--attr__value fz-13 fw-500">

                    </div>
                </div>

                <div class="card--attr justify-content-between c-mb-16 text-center">
                    <div class="card--attr__name fw-400 fz-13 text-center discount_code_data_input" style="min-width: 100%;display: flex">`;
        htlm_km += `<input class="input-form w-100 discount_code" type="text" placeholder="`;
        htlm_km += 'Nhập mã giảm giá';
        htlm_km += `">`;
        htlm_km += `<button class="refresh-captcha refresh_discount brs-8" type="button" style="padding: 0 12px;margin-left: 8px;min-width: 48px" data-randid="${id}" data-price="${price}">`;
        htlm_km += 'Áp dụng';
        htlm_km += `</button>
                    </div>
                    <div class="error__text" style="margin-top: 4px;text-align: left;color: #DA4343"></div>
                    <div class="sussess__text" style="margin-top: 4px;text-align: left;color: #00a651"></div>
                    <div class="card--attr__value fz-13 fw-500">

                    </div>
                </div>
            </div>`;
        if(width > 992){
            $('#buyServiceHomeModal .data_km').html('');
            $('#buyServiceHomeModal .data_km').html(htlm_km);
        }else{
            $('#buyServiceHomeStep2 .data_km').html('');
            $('#buyServiceHomeStep2 .data_km').html(htlm_km);
        }
        width > 992 ? $('.show__modal__service__home').trigger('click') : $('.show__step__service__home').trigger('click')
    }
})
$('.show-confirm-service-home').on('click', function (e) {
    e.preventDefault();
    $('.auth-username').html(auth_user ? auth_user.username : '');
    if (!auth_check) {
        openLoginModal();
        return;
    }
    if (checkFormValid() && auth_check) {
        var checkboxes = $('input[type="radio"][name="selected"]:checked');
        let desc = checkboxes.data('desc');
        if (desc) {
            $('.data_params_note').html('');
            let html = `
                <div class="input-group c-px-8 align-content-end" style="display: block;padding-top: 16px">
                    <div class="form-label" style="color: #DA4343;font-weight: bold">
                        Lưu ý:
                    </div>
                    <div class="toggle-id c-pt-4">
                        <span style="color: #DA4343;font-size: 12px">
                            ${desc}
                        </span>
                    </div>
                </div>
            `;

            width > 992 ? $('.data_params_note_dh').html(html) : $('.data_params_note_dh').html(html)
        }
        $('#serviceRangeHome').modal('show');
    }
})
$('body').on('keyup', '.input-service-image', function (e) {
    e.preventDefault();
    $('.search__pack').val('');
    $('.search__service__image select').niceSelect('update');

    let keyword = convertToSlug($(this).val());
    let is_empty = true;
    let text_empty = $('#text-empty');
    text_empty.hide();
    $('.js-service').each(function (i, elm) {
        let slug_service = convertToSlug($(elm).find('img').attr('alt'));
        slug_service = convertToSlug(slug_service);
        $(this).toggle(slug_service.indexOf(keyword) > -1);
        if (slug_service.indexOf(keyword) > -1) {
            is_empty = false;
        }
    });
    if (is_empty) {
        text_empty.show();
    }

})

$('body').on('change', '.search__pack', function (e) {
    e.preventDefault();

    $('.input-service-image').val('');

    let keyword = convertToSlug($(this).val());
    let is_empty = true;
    let text_empty = $('#text-empty');
    text_empty.hide();
    $('.js-service').each(function (i, elm) {
        let slug_service = convertToSlug($(elm).find('img').attr('alt'));
        slug_service = convertToSlug(slug_service);
        $(this).toggle(slug_service.indexOf(keyword) > -1);
        if (slug_service.indexOf(keyword) > -1) {
            is_empty = false;
        }
    });
    if (is_empty) {
        text_empty.show();
    }
})

$('body').on('click', '.btn__clear__all', function (e) {
    e.preventDefault();

    $('.search__pack').val('');
    $('.input-service-image').val('');

    $('.search__service__image select').niceSelect('update');

    let keyword = convertToSlug($(this).val());
    let is_empty = true;
    let text_empty = $('#text-empty');
    text_empty.hide();
    $('.js-service').each(function (i, elm) {
        let slug_service = convertToSlug($(elm).find('img').attr('alt'));
        slug_service = convertToSlug(slug_service);
        $(this).toggle(slug_service.indexOf(keyword) > -1);
        if (slug_service.indexOf(keyword) > -1) {
            is_empty = false;
        }
    });
    if ($('.list-service-all').hasClass('d-none')) {
        $('.list-service-all').removeClass('d-none');
        $('.list-service-cat').empty();
    }
    if (is_empty) {
        text_empty.show();
    }
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

$('#btn-expand-serivce-img-home').on('click', function (e) {
    var pageCurrrent = $(this).data('page-current');
    var pageMax = $(this).data('page-max');
    pageCurrrent = pageCurrrent + 1;
    $('.item-page-nick-' + pageCurrrent).fadeIn("fast", function () {
        // Animation complete
    });
    $(this).data('page-current', pageCurrrent);
    if (pageCurrrent == pageMax) {
        $(this).remove();
    }
});

let service_id = $('.service_id').val();

let isVoucher = $('#isVoucher').val();
// if (isVoucher && parseInt(isVoucher) == 1) {
//     getShowTopEvent(service_id);
// }

// function getShowTopEvent(service_id) {

//     $.ajax({
//         type: 'GET',
//         async: true,
//         cache: false,
//         url: '/show-top-event',
//         data: {
//             id: service_id
//         },
//         beforeSend: function (xhr) {

//         },
//         success: (res) => {

//             if (res.status == 1) {

//                 $('.data_flashsale').html('');
//                 $('.data_flashsale').html(res.data);

//                 $('#modal-body-top-scroll').html('');
//                 $('#modal-body-top-scroll').html(res.data_modal);

//                 if (res.check_top == true) {
//                     $('#notiTopEventModal').modal('show');
//                 }
//             }

//             $('.is_load_fashsale').parent().removeClass('is-load');
//             $('.is_load_fashsale').addClass('d-none');
//         },
//         error: function (data) {

//         },
//         complete: function (data) {

//         }
//     });
// }
function sortProducts(sortOption) {
    var items = $('.list-service-all .item-service');

    switch (sortOption) {
        case 'highest-price':
            $('.list-service-bestSelling').addClass('d-none');
            $('.list-service-newProduct').addClass('d-none');
            $('.list-service-all').addClass('d-none');
            $('.list-service-lowest').addClass('d-none');
            $('.list-service-cat').addClass('d-none');
            $('.list-service-highest').removeClass('d-none');
            items.sort(function (a, b) {
                var priceA = parseFloat($(a).find('.price-current').text().replace(/\./g, '').replace('đ', '').trim());
                var priceB = parseFloat($(b).find('.price-current').text().replace(/\./g, '').replace('đ', '').trim());
                return priceB - priceA;
            });
            var highestContainer = $('.list-service-highest');
            highestContainer.empty();
            $.each(items, function (index, item) {
                highestContainer.append($(item).clone());
            });
            return;
        case 'lowest-price':
            $('.list-service-bestSelling').addClass('d-none');
            $('.list-service-newProduct').addClass('d-none');
            $('.list-service-all').addClass('d-none');
            $('.list-service-highest').addClass('d-none');
            $('.list-service-cat').addClass('d-none');
            $('.list-service-lowest').removeClass('d-none');
            items.sort(function (a, b) {
                var priceA = parseFloat($(a).find('.price-current').text().replace(/\./g, '').replace('đ', '').trim());
                var priceB = parseFloat($(b).find('.price-current').text().replace(/\./g, '').replace('đ', '').trim());
                return priceA - priceB;
            });
            var lowestContainer = $('.list-service-lowest');
            lowestContainer.empty();
            $.each(items, function (index, item) {
                lowestContainer.append($(item).clone());
            });
            return;
        case 'recommended':
            var items_sort = $('#bestSelling_sort').val();
            var recommendArray = items_sort.split('|').map(function (item) {
                return item.trim();
            });
            $('.list-service-bestSelling').empty();
            var bestSellingContainer = $('.list-service-bestSelling');
            let isNotDataSelling = false;
            $('.list-service-all .item-service').each(function () {
                var itemName = $(this).find('.name-service').text().trim();
                if (recommendArray.includes(itemName)) {
                    isNotDataSelling = true;
                    bestSellingContainer.append($(this).clone());
                }
            });
            if (!isNotDataSelling) {
                bestSellingContainer.html(`<div class="justify-content-center fz-16 text-danger w-100 text-center">Không có sản phẩm phù hợp !!</div>`)
            }
            $('.list-service-bestSelling').removeClass('d-none');
            $('.list-service-newProduct').addClass('d-none');
            $('.list-service-all').addClass('d-none');
            $('.list-service-lowest').addClass('d-none');
            $('.list-service-cat').addClass('d-none');
            $('.list-service-highest').addClass('d-none');
            return;
        case 'new-product':
            var items_sort = $('#newProduct_sort').val();
            var recommendArray = items_sort.split('|').map(function (item) {
                return item.trim();
            });
            let isNotDataProduct = false;
            $('.list-service-newProduct').empty();
            var newProductContainer = $('.list-service-newProduct');
            $('.list-service-all .item-service').each(function () {
                var itemName = $(this).find('.name-service').text().trim();
                if (recommendArray.includes(itemName)) {
                    isNotDataProduct = true;
                    newProductContainer.append($(this).clone());
                }
            });
            if (!isNotDataProduct) {
                newProductContainer.html(`<div class="justify-content-center fz-16 text-danger w-100 text-center">Không có sản phẩm phù hợp !!</div>`)
            }

            $('.list-service-newProduct').removeClass('d-none');
            $('.list-service-bestSelling').addClass('d-none');
            $('.list-service-all').addClass('d-none');
            $('.list-service-lowest').addClass('d-none');
            $('.list-service-cat').addClass('d-none');
            $('.list-service-highest').addClass('d-none');
            return;
        case 'all-product':
            $('.list-service-bestSelling').addClass('d-none');
            $('.list-service-newProduct').addClass('d-none');
            $('.list-service-lowest').addClass('d-none');
            $('.list-service-highest').addClass('d-none');
            $('.list-service-cat').addClass('d-none');
            $('.list-service-all').removeClass('d-none');
            return;
        default:
            return;
    }
}
function sortItems(sortOption) {
    var recommendArray = sortOption.split('|').map(item => item.trim().toLowerCase());

    $('.list-service-cat').empty();
    var found = false;

    $('.list-service-all .item-service').each(function () {
        var itemName = $(this).find('.name-service').text().trim().toLowerCase();
        var sortContainer = $('.list-service-cat');

        if (recommendArray.includes(itemName)) {
            sortContainer.append($(this).clone());
            found = true;
        }
    });

    if (!found) {
        $('.list-service-cat').html(`<div class="justify-content-center fz-16 text-danger w-100 text-center">Không có sản phẩm phù hợp !!</div>`);
    }

    $('.list-service-cat').removeClass('d-none');
    $('.list-service-newProduct').addClass('d-none');
    $('.list-service-bestSelling').addClass('d-none');
    $('.list-service-all').addClass('d-none');
    $('.list-service-lowest').addClass('d-none');
    $('.list-service-highest').addClass('d-none');
}

function checkFormValid() {
    let form = $('#form-service-detail');
    let inputs = form.find('input[type="text"],input[type="password"]');
    let $ok = 1;
    Array.from(inputs).forEach(function (elm) {
        if (!$(elm).val().replace(/\s+/g, '')) {
            $(elm).toggleClass('invalid shake-animate', true);
            $(elm).next().text('Trường này không được để trống !');
            $ok = 0;

        } else {
            $(elm).next().empty();
            $(elm).toggleClass('invalid shake-animate', false);
        }

    });

    let checkboxs = $('#select-service input[type="checkbox"]:checked,.service-select input[type="checkbox"]:checked');

    if ($('.service-select input[type="checkbox"]').length) {
        if (!checkboxs.length) {
            $ok = 0;
            $('.error-selected').text('Cần chọn ít nhất 1 dịch vụ để thanh toán')
        } else {
            $('.error-selected').empty()
        }
    }

    let ratios = $('#select-service input[type="radio"]:checked,.service-select input[type="radio"]:checked');

    if ($('.service-select input[type="radio"]').length) {
        if (!ratios.length) {
            $ok = 0;
            $('.error-selected').text('Cần chọn dịch vụ để thanh toán')
        } else {
            $('.error-selected').empty()
        }
    }

    // confirm rule
    let checkbox_rule = $('input.confirm-rule');
    if (checkbox_rule.length) {
        if (!checkbox_rule.is(':checked')) {
            $ok = 0;
            checkbox_rule.parent().next().text('Vui lòng xác nhận thông tin trên!');
        } else {
            checkbox_rule.parent().next().empty()
        }
    }

    return $ok;
}

$('.sort-radio').change(function () {
    var sortOption = $(this).closest('.sort-desk').data('sort');
    $('.item-service').css('display', 'block');
    sortProducts(sortOption);
});

$('.cat_sort').click(function () {
    var isActive = $(this).hasClass('active-border-sort');
    $('.cat_sort').removeClass('active-border-sort');
    if (isActive) {
        $('.list-service-all').removeClass('d-none');
        $('.list-service-cat').addClass('d-none');
    } else {
        $(this).addClass('active-border-sort');
        var sortOption = $(this).data('sort');
        $('.item-service').css('display', 'block');
        $('.sort-radio').prop('checked', false);
        sortItems(sortOption);
    }
});

// Handle Submit

$('.submit-data-form-image').on('click', function (e) {
    e.preventDefault();
    let form = $('#form-service-detail-image');
    let $data = form.serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.name === 'selected' ? item.value.replace('.', '') : item.value;
        return obj;
    }, {});
    $(this).empty().html($('.submit-data-form-image').data('loading'));
    var btnSubmit = form.find(':submit');
    btnSubmit.prop('disabled', true);

    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: new FormData(form[0]),
        contentType: false,
        cache: false,
        processData: false,
        success: function (res) {
            if (res.status * 1 === 1) {
                $('#orderSuccsesBuyService #modal-success-message').text(res.message);
                $('#orderSuccsesBuyService').modal('show');
            } else {
                $('#orderFailedBuyService #modal-failed-message').text(res.message)
                $('#orderFailedBuyService').modal('show');
            }
        },
    }).done(function () {
        btnSubmit.prop('disabled', false);
        $('.submit-data-form-image').html($('.submit-data-form-image').data('title'));
        width > 992 ? $('#buyServiceHomeModal').modal('hide') : '';
        getInfo();
    })
})

$('.submit-data-form-image-mobile').on('click', function (e) {
    e.preventDefault();
    let form = $('#form-service-detail-image-mobile');
    let $data = form.serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.name === 'selected' ? item.value.replace('.', '') : item.value;
        return obj;
    }, {});
    $(this).empty().html(`${$('.submit-data-form-image-mobile').data('loading')}`);
    var btnSubmit = form.find(':submit');
    btnSubmit.prop('disabled', true);

    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: new FormData(form[0]),
        contentType: false,
        cache: false,
        processData: false,
        success: function (res) {
            if (res.status * 1 === 1) {
                $('#orderSuccsesBuyService #modal-success-message').text(res.message);
                $('#orderSuccsesBuyService').modal('show');
            } else {
                $('#orderFailedBuyService #modal-failed-message').text(res.message)
                $('#orderFailedBuyService').modal('show');
            }
        }
    }).done(function () {
        btnSubmit.prop('disabled', false);
        $('.submit-data-form-image-mobile').html($('.submit-data-form-image-mobile').data('title'));
        width > 992 ? $('#buyServiceHomeModal').modal('hide') : '';
        getInfo();
    })
})
$('.submit-data-form-service-range').on('click', function (e) {
    e.preventDefault();
    let form = $('#form-service-detail');
    let $data = form.serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.name === 'selected' ? item.value.replace('.', '') : item.value;
        return obj;
    }, {});

    $(this).empty().html('Đang xử lý...');
    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: new FormData(form[0]),
        contentType: false,
        cache: false,
        processData: false,
        success: function (res) {
            if (res.status * 1 === 1) {

                $('#orderSuccsesServiceHome #modal-success-message').text(res.message);

                $('#orderSuccsesServiceHome').modal('show');
            } else {
                if (res.checkbalance === 0) {
                    $('#modal-failed-range-home').toggleClass('modal-failed-recharge');
                }
                $('#orderFailedServiceHome #modal-failed-message').text(res.message)
                $('#orderFailedServiceHome').modal('show');
            }
        }
    }).done(function () {
        $('.submit-data-form-service-range').html('Xác nhận');
        width > 992 ? $('#serviceRangeHome').modal('hide') : '';
        getInfo();
    })
})

document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.classList.add('active');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.classList.remove('active');
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.classList.remove('active');
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }

    var searchHeaderServiceHome = document.getElementById("search-header-service-home");
    if (searchHeaderServiceHome) {
        searchHeaderServiceHome.addEventListener("input", function () {
            var searchValue = this.value.trim().toLowerCase();
            var nameServiceElements = document.querySelectorAll(".name-service");

            if (searchValue === '') {
                document.querySelectorAll(".name-check-service").forEach(function (element) {
                    element.style.display = "block";
                });
                return;
            }

            nameServiceElements.forEach(function (element) {
                var serviceName = element.textContent.trim().toLowerCase();
                var parentCheckServiceElement = element.closest(".name-check-service");
                if (parentCheckServiceElement) {
                    if (serviceName.indexOf(searchValue) !== -1) {
                        parentCheckServiceElement.style.display = "block";
                    } else {
                        parentCheckServiceElement.style.display = "none";
                    }
                    const btn_see_more = document.getElementById("btn-expand-serivce-img-home");
                    if (btn_see_more) {
                        btn_see_more.remove();
                    }
                }
            });
            document.querySelectorAll('.sort-radio').forEach(function (radio) {
                radio.checked = false;
            });
        });
    }
    $('body').on('click', '#buyServiceHomeModal .refresh_discount',function(e){
        let id = $('#form-service-detail-image').data("id");
        let price = $(this).data("price");
        price = price.toString().replace(/\./g, '');
        let discount_code = $('#buyServiceHomeModal .discount_code').val();
        $('#buyServiceHomeModal .error__text').html('');
        if (!discount_code){
            $('#buyServiceHomeModal .error__text').html('Vui lòng điền mã giảm giá');
            return false;
        }
        var url = '/dich-vu/'+ id + '/check-discount-code';
        $.ajax({
            type: 'GET',
            url: url,
            async:true,
            cache:false,
            data: {
                discount_code:discount_code,
                price:price,
                id:id
            },
            beforeSend: function (xhr) {
                $('.refresh_discount').prop('disabled', true);
            },
            success: (data) => {
                if (data.status == 1) {
                    let discount_code = data.discount_code;
                    let html_discount = '';
                    html_discount += `<input readonly class="input-form w-100 discount_code" value="`;
                    html_discount += discount_code;
                    html_discount += `" name="discount_code" type="text" placeholder="`;
                    html_discount += $('#form-service-detail-image').data('discount_cd');
                    html_discount += `" style="background: #F3F3F7">`
                    html_discount += `<button class="refresh-captcha clear_discount brs-8" type="button" style="padding: 0 12px;margin-left: 8px;min-width: 48px" data-randid="`;
                    html_discount += id ;
                    html_discount += `" data-price="` ;
                    html_discount += price + `">`;
                    html_discount += $('#form-service-detail-image').data('clear');
                    html_discount += `</button>` ;
                    $('#buyServiceHomeModal .discount_code_data_input').html('');
                    $('#buyServiceHomeModal .discount_code_data_input').html(html_discount);
                    $('#discount_code_service').val(discount_code);

                    let price_discount = data.price_discount;

                    if (price_discount < 0) {
                        let html = '';
                        html += `0`;
                        html += $('#form-service-detail-image').data('d');
                        $('#buyServiceHomeModal .total__price__modal').html(html);
                    } else{
                        let html = '';
                        html += formatNumber(price_discount);
                        html += ' ' + $('#form-service-detail-image').data('d');
                        $('#buyServiceHomeModal .total__price__modal').html(html);
                    }

                    let discount = data.discount;
                    if (auth_balance < discount){
                        let not_money = '';
                        not_money += `<div class="card--gray c-mb-0 c-mt-16 c-pt-8 c-pb-8 c-pl-12 c-pr-12">
                                    <p class="card--attr__payment_failed c-mb-0 fw-400 fz-13 lh-20">`;
                        not_money +=  $('#form-service-detail-image').data('not_money');
                        not_money +=    `</p>
                                    </div>` ;
                        $('.not-enough-money').html(not_money);
                        let html = '';
                        html += `<button type="button" class="btn ghost" disabled>`;
                        html += $('#form-service-detail-image').data('pay');
                        html += `</button>`;
                        html += `<button type="button" data-dismiss="modal" class="btn primary" data-toggle="modal" data-target="#rechargeModal">`;
                        html += $('#form-service-detail-image').data('recharge');
                        html += `</button>`;
                        $('.data__dangnhap').html(html);

                    } else {
                        $('.not-enough-money').html('');
                        let html = '';
                        html += `<button type="submit" class="btn primary">`;
                        html += $('#form-service-detail-image').data('pay');
                        html += `</button>`;
                        $('.data__dangnhap').html(html);
                    }

                    let fm_discount = data.discount_amount;
                    fm_discount = fm_discount.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
                    fm_discount = fm_discount.split('').reverse().join('').replace(/^[\.]/,'');
                    fm_discount = fm_discount + $('#form-service-detail-image').data('d');
                    $('.data_discount').html('');
                    $('.data_discount').html(fm_discount);

                    let message = '';
                    message += `<i class="fas fa-check-circle c-mr-4" style="color: #00a651"></i>`;
                    message += $('#form-service-detail-image').data('ss_discount');
                    $('#buyServiceHomeModal .sussess__text').html(message);
                }else if (data.status == 0){
                    $('#buyServiceHomeModal .sussess__text').html('');
                    let discount_code = data.discount_code;

                    let price = data.price;
                    let randid = data.randid;
                    let html_discount = '';
                    html_discount += `<input class="input-form w-100 discount_code" value="`;
                    html_discount += discount_code;
                    html_discount += `" type="text" placeholder="`;
                    html_discount += $('#form-service-detail-image').data('discount_cd');
                    html_discount += `">`;
                    html_discount += `<button class="refresh-captcha refresh_discount brs-8" type="button" style="padding: 0 12px;margin-left: 8px;min-width: 48px" data-randid="`;
                    html_discount += randid ;
                    html_discount += `" data-price="`;
                    html_discount += price;
                    html_discount += `">`;
                    html_discount += $('#form-service-detail-image').data('sm_discount');
                    html_discount += `</button>`;
                    $('#buyServiceHomeModal .discount_code_data_input').html('');
                    $('#buyServiceHomeModal .discount_code_data_input').html(html_discount);
                    $('#discount_code_service').val('');

                    let message = '<i class="fas fa-times-circle" style="color: #DA4343"></i> '+ data.message;
                    let price_discount = data.price_discount;
                    if (price_discount < 0) {
                        $('#buyServiceHomeModal .total__price__modal').html('0');
                    } else{
                        let html = '';
                        html += formatNumber(price_discount);
                        html += ' ' + $('#form-service-detail-image').data('d');
                        $('#buyServiceHomeModal .total__price__modal').html(html);
                    }
                    $('#buyServiceHomeModal .error__text').html(message);

                    let fm_discount = '';
                    fm_discount += '0';
                    fm_discount += $('#form-service-detail-image').data('d');

                    $('.data_discount').html('');
                    $('.data_discount').html(fm_discount);
                }
            },
            complete: function (data) {
                initSwiperGallery();
            }
        });
    })

    $('body').on('click', '#buyServiceHomeModal .clear_discount',function(e){
        let id = $('#form-service-detail-image').data("id");
        let price = $(this).data("price");;

        let discount_code = $('#buyServiceHomeModal .discount_code').val();


        $('#buyServiceHomeModal .error__text').html('');
        $('#buyServiceHomeModal .sussess__text').html('');
        let html_discount = '';
        html_discount += `<input class="input-form w-100 discount_code" value="`;
        html_discount += discount_code;
        html_discount += `" type="text" placeholder="`;
        html_discount += $('#form-service-detail-image').data('discount_cd');
        html_discount += `">`;
        html_discount += `<button class="refresh-captcha refresh_discount brs-8" type="button" style="padding: 0 12px;margin-left: 8px;min-width: 48px" data-randid="`;
        html_discount += id;
        html_discount += `" data-price="`;
        html_discount +=  price;
        html_discount +=  `">`;
        html_discount += $('#form-service-detail-image').data('sm_discount');
        html_discount += `</button>`;
        $('#buyServiceHomeModal .discount_code_data_input').html('');
        $('#buyServiceHomeModal .discount_code_data_input').html(html_discount);
        $('#discount_code_service').val('');
        let price_discount = price;
        price_discount = price_discount.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        price_discount = price_discount.split('').reverse().join('').replace(/^[\.]/,'');

        price_discount = price_discount;
        let html = '';
        html += price_discount;
        html += $('#form-service-detail-image').data('d');
        $('#buyServiceHomeModal .total__price__modal').html(html);

        if (auth_balance < price){
            let not_money = '';
            not_money += `<div class="card--gray c-mb-0 c-mt-16 c-pt-8 c-pb-8 c-pl-12 c-pr-12">
                        <p class="card--attr__payment_failed c-mb-0 fw-400 fz-13 lh-20">`;
            not_money += $('#form-service-detail-image').data('not_money');
            not_money +=   `</p>
                            </div>`;
            $('.not-enough-money').html(not_money);
            let html = '';
            html += `<button type="button" class="btn ghost" disabled>`;
            html += $('#form-service-detail-image').data('pay');
            html += `</button>
                                <button type="button" data-dismiss="modal" class="btn primary" data-toggle="modal" data-target="#rechargeModal">`;
            html += $('#form-service-detail-image').data('recharge');
            html += `</button>`;
            $('.data__dangnhap').html(html);

        }
        else {
            $('.not-enough-money').html('');
            let  html = '';
            html += `<button type="submit" class="btn primary">`;
            html += $('#form-service-detail-image').data('pay');
            html += `</button>`;
            $('.data__dangnhap').html(html);
        }


        let fm_discount = ''
        fm_discount += `0`;
        fm_discount +=  $('#form-service-detail-image').data('d');
        $('.data_discount').html('');
        $('.data_discount').html(fm_discount);

    })

    $('body').on('click', '#buyServiceHomeStep2 .refresh_discount',function(e){
        let id = $('#form-service-detail-image-mobile').data("id");
        let price = $(this).data("price");
        price = price.toString().replace(/\./g, '');
        let discount_code = $('#step2 .discount_code').val();

        $('#step2 .error__text').html('');

        if (!discount_code){
            $('#step2 .error__text').html('Vui lòng điền mã giảm giá');
            return false;
        }
        var url = '/dich-vu/'+ id + '/check-discount-code';
        // console.log(url)
        $.ajax({
            type: 'GET',
            url: url,
            async:true,
            cache:false,
            data: {
                discount_code:discount_code,
                price:price,
                id:id
            },
            beforeSend: function (xhr) {
                $('.refresh_discount').prop('disabled', true);
            },
            success: (data) => {
                if (data.status == 1) {

                    let discount_code = data.discount_code;
                    let html_discount = '';
                    html_discount += `<input readonly class="input-form w-100 discount_code" value="`;
                    html_discount += discount_code;
                    html_discount += `" name="discount_code" type="text" placeholder="`;
                    html_discount += $('#form-service-detail-image').data('discount_cd');
                    html_discount += `" style="background: #F3F3F7">`
                    html_discount += `<button class="refresh-captcha clear_discount brs-8" type="button" style="padding: 0 12px;margin-left: 8px;min-width: 48px" data-randid="`;
                    html_discount += id ;
                    html_discount += `" data-price="` ;
                    html_discount += price + `">`;
                    html_discount += $('#form-service-detail-image').data('clear');
                    html_discount += `</button>` ;
                    $('#step2 .discount_code_data_input').html('');
                    $('#step2 .discount_code_data_input').html(html_discount);
                    $('#discount_code_service').val(discount_code);

                    let price_discount = data.price_discount;

                    if (price_discount < 0) {
                        let html = '';
                        html += `0`;
                        html += $('#form-service-detail-image').data('d');
                        $('#step2 .total__price__modal').html(html);
                    } else{
                        let html = '';
                        html += formatNumber(price_discount);
                        html += ' ' + $('#form-service-detail-image').data('d');
                        $('#step2 .total__price__modal').html(html);
                    }

                    let discount = data.discount;

                    if (auth_balance < discount){
                        let not_money = '';
                        not_money += `<div class="card--gray c-mb-0 c-mt-16 c-pt-8 c-pb-8 c-pl-12 c-pr-12">
                                    <p class="card--attr__payment_failed c-mb-0 fw-400 fz-13 lh-20">`;
                        not_money +=  $('#form-service-detail-image').data('not_money');
                        not_money +=    `</p>
                                    </div>` ;
                        $('.not-enough-money').html(not_money);
                        let html = '';
                        html += `<button type="button" class="btn ghost" disabled>`;
                        html += $('#form-service-detail-image').data('pay');
                        html += `</button>`;
                        html += `<button type="button" data-dismiss="modal" class="btn primary" data-toggle="modal" data-target="#rechargeModal">`;
                        html += $('#form-service-detail-image').data('recharge');
                        html += `</button>`;
                        $('.data__dangnhap').html(html);

                    }
                    else {
                        $('.not-enough-money').html('');
                        let html = '';
                        html += `<button type="submit" class="btn primary">`;
                        html += $('#form-service-detail-image').data('pay');
                        html += `</button>`;
                        $('.data__dangnhap').html(html);
                    }

                    let fm_discount = data.discount_amount;
                    fm_discount = fm_discount.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
                    fm_discount = fm_discount.split('').reverse().join('').replace(/^[\.]/,'');
                    fm_discount = fm_discount + $('#form-service-detail-image').data('d');
                    $('.data_discount').html('');
                    $('.data_discount').html(fm_discount);

                    let message = '';
                    message += `<i class="fas fa-check-circle c-mr-4" style="color: #00a651"></i>`;
                    message += $('#form-service-detail-image').data('ss_discount');
                    $('#step2 .sussess__text').html(message);


                }else if (data.status == 0){
                    $('#step2 .sussess__text').html('');
                    let discount_code = data.discount_code;

                    let price = data.price;
                    let randid = data.randid;
                    let html_discount = '';
                    html_discount += `<input class="input-form w-100 discount_code" value="`;
                    html_discount += discount_code;
                    html_discount += `" type="text" placeholder="`;
                    html_discount += $('#form-service-detail-image').data('discount_cd');
                    html_discount += `">`;
                    html_discount += `<button class="refresh-captcha refresh_discount brs-8" type="button" style="padding: 0 12px;margin-left: 8px;min-width: 48px" data-randid="`;
                    html_discount += randid ;
                    html_discount += `" data-price="`;
                    html_discount += price;
                    html_discount += `">`;
                    html_discount += $('#form-service-detail-image').data('sm_discount');
                    html_discount += `</button>`;
                    $('#step2 .discount_code_data_input').html('');
                    $('#step2 .discount_code_data_input').html(html_discount);
                    $('#discount_code_service').val('');

                    let message = '<i class="fas fa-times-circle" style="color: #DA4343"></i> '+ data.message;
                    let price_discount = data.price_discount;
                    if (price_discount < 0) {
                        $('#step2 .total__price__modal').html('0');
                    } else{
                        let html = '';
                        html += price_discount;
                        html += ' ' + $('#form-service-detail-image').data('d');
                        $('#step2 .total__price__modal').html(html);
                    }
                    $('#step2 .error__text').html(message);

                    let fm_discount = '';
                    fm_discount = '0';
                    fm_discount = $('#form-service-detail-image').data('d');

                    $('.data_discount').html('');
                    $('.data_discount').html(fm_discount);
                }

            },
            error: function (data) {

            },
            complete: function (data) {
                initSwiperGallery();
            }
        });

    })

    $('body').on('click', '#buyServiceHomeStep2 .clear_discount',function(e){
        let id = $('#form-service-detail-image').data("id");
        let price = $(this).data("price");
        price = price.toString().replace(/\./g, '');
        let discount_code = $('#buyServiceHomeStep2 .discount_code').val();

        $('#buyServiceHomeStep2 .error__text').html('');
        $('#buyServiceHomeStep2 .sussess__text').html('');
        let html_discount = '';
        html_discount += `<input class="input-form w-100 discount_code" value="`;
        html_discount += discount_code;
        html_discount += `" type="text" placeholder="`;
        html_discount += $('#form-service-detail-image').data('discount_cd');
        html_discount += `">`;
        html_discount += `<button class="refresh-captcha refresh_discount brs-8" type="button" style="padding: 0 12px;margin-left: 8px;min-width: 48px" data-randid="`;
        html_discount += id;
        html_discount += `" data-price="`;
        html_discount +=  price;
        html_discount +=  `">`;
        html_discount += $('#form-service-detail-image').data('sm_discount');
        html_discount += `</button>`;
        $('#buyServiceHomeStep2 .discount_code_data_input').html('');
        $('#buyServiceHomeStep2 .discount_code_data_input').html(html_discount);
        $('#discount_code_service').val('');
        let price_discount = price;
        price_discount = price_discount.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        price_discount = price_discount.split('').reverse().join('').replace(/^[\.]/,'');

        price_discount = price_discount;
        let html = '';
        html += price_discount;
        html += $('#form-service-detail-image').data('d');
        $('#buyServiceHomeStep2 .total__price__modal').html(html);

        if (auth_balance < price){
            let not_money = '';
            not_money += `<div class="card--gray c-mb-0 c-mt-16 c-pt-8 c-pb-8 c-pl-12 c-pr-12">
                        <p class="card--attr__payment_failed c-mb-0 fw-400 fz-13 lh-20">`;
            not_money += $('#form-service-detail-image').data('not_money');
            not_money +=   `</p>
                            </div>`;
            $('.not-enough-money').html(not_money);
            let html = '';
            html += `<button type="button" class="btn ghost" disabled>`;
            html += $('#form-service-detail-image').data('pay');
            html += `</button>
                                <button type="button" data-dismiss="modal" class="btn primary" data-toggle="modal" data-target="#rechargeModal">`;
            html += $('#form-service-detail-image').data('recharge');
            html += `</button>`;
            $('.data__dangnhap').html(html);

        }
        else {
            $('.not-enough-money').html('');
            let  html = '';
            html += `<button type="submit" class="btn primary">`;
            html += $('#form-service-detail-image').data('pay');
            html += `</button>`;
            $('.data__dangnhap').html(html);
        }


        let fm_discount = ''
        fm_discount += `0`;
        fm_discount +=  $('#form-service-detail-image').data('d');
        $('.data_discount').html('');
        $('.data_discount').html(fm_discount);

    })
});


function handleAddCartServiceImage(item) {
    function checkFormValid() {
        let form = $('#form-service-detail');
        let inputs = form.find('input[type="text"],input[type="password"]');
        let $ok = 1;
        Array.from(inputs).forEach(function (elm) {
            if (!$(elm).val()) {

                $(elm).toggleClass('invalid shake-animate', true);
                $(elm).next().toggleClass('br-validate', true);
                $(elm).next().text($('#form-service-detail').data('title'));
                $ok = 0;

            } else {
                $(elm).next().empty();
                $(elm).next().toggleClass('br-validate', true);
                $(elm).toggleClass('invalid shake-animate', false);
            }
        });

        let checkboxs = $('#select-service input[type="checkbox"]:checked,.service-select input[type="checkbox"]:checked');

        if ($('.service-select input[type="checkbox"]').length) {
            if (!checkboxs.length) {
                $ok = 0;
                $('.error-selected').data('texter');
            } else {
                $('.error-selected').empty()
            }
        }

        // confirm rule
        let checkbox_rule = $('input.confirm-rule');
        let text_rule = $('.confirm-rule').data('rule');
        if (checkbox_rule.length) {
            if (!checkbox_rule.is(':checked')) {
                $ok = 0;
                checkbox_rule.parent().next().text(`${text_rule}`);
            } else {
                checkbox_rule.parent().next().empty()
            }
        }

        return $ok;
    }
    checkFormValid()
    let domain = window.location.host;
    let cart = JSON.parse(localStorage.getItem(`cart_${domain}`)) || [];

    if (checkTotalQuantityCart() >= 10) {
        swal({
            title: "Giỏ hàng đã đạt tối đa!",
            text: "Số lượng không được vượt quá 10 sản phẩm!",
            type: "error",
            showConfirmButton: false,
            timer: 2000
        });
        return; // Dừng thực thi nếu tổng số lượng đã đạt tối đa
    }

    let form

    if(width > 992 ){
        form = $('#form-service-detail-image');

      }else{
           form = $('#form-service-detail-image-mobile');
      }



    $(window).resize(function(){
        if($(window).width() > 992 ){
            form = $('#form-service-detail-image');

          }else{
               form = $('#form-service-detail-image-mobile');
          }
    });

    let inputs = form.find('input:not([type="hidden"])').filter(function () {
        return $(this).closest('[style*="display: none"]').length === 0 &&
               $(this).css('display') !== 'none' &&
               $(this).css('visibility') !== 'hidden';
    }).not('.discount_code');

    var allFilled = true;
    var itemData = item;

    inputs.each(function () {
        let inputValue = $(this).val();
        if (inputValue.trim() === '') {


            allFilled = false;
        }
    });
    if (allFilled) {


        let data = {
            'id': itemData.id,
            'title': itemData.title,
            'image': itemData.image,
            'price': price_service_8,
            'price_old': itemData.price_old,
            'module': 'service',
            'quantity': 1,
            'slug': `dich-vu/${itemData.slug}`,
        };

        const check = form.serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.name === 'selected' ? item.value.replace('.', '') : item.value;
            return obj;
        }, {});

        delete check._token;

        let cartIdNew = JSON.parse(JSON.stringify(check));
        delete cartIdNew.index;
        for (let key in cartIdNew) {
            if (key.startsWith("customer_data")) {
                delete cartIdNew[key];
            }
        }
        cartIdNew.id = itemData.id;

        let cartIdNewString = JSON.stringify(cartIdNew);
        let cartId = CryptoJS.MD5(cartIdNewString).toString(CryptoJS.enc.Hex);

        for (let i = 0; i < check.index; i++) {
            check[`send_dat${i}`] = $params[`send_data${i}`];
        }
        check['send_name'] = $params['send_name'];
        check['send_type'] = $params['send_type'];
        check['name_selected'] = $params['name'];

        for (let i = 0; i < check.index; i++) {
            check[`send_dat${i}`] = $params[`send_data${i}`];
        }

        check.title_item = $params['name'][check['selected']] ?? null;
        data.price = $params['price'][check['selected']];
        data.dataSend = check;
        if($params['image_attribute']){
            data.image = $params['image_attribute'][check['selected']]

        }


        const foundItem = cart.find(item => item.cartId === cartId);

        if (foundItem) {
            if (foundItem.quantity < 10) {
                // $('#cartConfirmationModal').modal('show');

                // $('#confirmAdd').off('click').on('click', function () {
                //     if (foundItem.quantity < 10) {
                //         foundItem.quantity += 1;
                //         localStorage.setItem(`cart_${domain}`, JSON.stringify(cart));
                //         loadDataCart();

                //         $('#cartConfirmationModal').modal('hide');
                //         swal({
                //             text: "Số lượng dịch vụ đã được tăng!",
                //             type: "success",
                //         });
                //     } else {
                //         $('#cartConfirmationModal').modal('hide');
                //         swal({
                //             title: "Số lượng tối đa đã đạt!",
                //             text: "Bạn không thể thêm thêm dịch vụ này vào giỏ hàng.",
                //             type: "error",
                //         });
                //     }
                // });
                if (foundItem.quantity < 10) {
                    foundItem.quantity += 1;
                    localStorage.setItem(`cart_${domain}`, JSON.stringify(cart));
                    loadDataCart();


                    swal({
                        title: "Thành công",
                        text: "Sản phẩm đã được thêm vào giỏ hàng!",
                        type: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {

                    swal({
                        title: "Số lượng sản phẩm đạt tối đa!",
                        text: "Số lượng tối đa là 10 sản phẩm!",
                        type: "error",
                        showConfirmButton: false, // Hide the OK button
                        timer: 2000
                    });
                }
            } else {
                swal({
                    title: "Số lượng sản phẩm đạt tối đa!",
                    text: "Số lượng tối đa là 10 sản phẩm!",
                    type: "error",
                    showConfirmButton: false, // Hide the OK button
                    timer: 2000
                });
            }
        } else {
            data.cartId = cartId;
            data.quantity = 1;
            cart.push(data);
            localStorage.setItem(`cart_${domain}`, JSON.stringify(cart));
            loadDataCart();
            swal({
                title: "Thành công",
                text: "Sản phẩm đã được thêm vào giỏ hàng!",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            })
        }
    } else {
        swal({
            title: "Vui lòng điền đầy đủ thông tin!",
            type: "error",
            showConfirmButton: false,
            timer: 2000
        });
    }
}
