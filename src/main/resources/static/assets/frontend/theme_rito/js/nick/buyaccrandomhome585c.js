$(document).ready(function () {

    $('body').on('click', '.buyacchome',function(e){
        e.preventDefault();
        // var htmlloading = '';
        //
        // htmlloading += '<div class="loading"></div>';
        // $('.loading-data__buyacc').html('');
        // $('.loading-data__buyacc').html(htmlloading);

        var id = $(this).data("id");

        var html = $('.formDonhangAccountHome' + id + '').html();
        $('.data__form__random_home').html('');
        $('.data__form__random_home').html(html);
        $('.loadModal__acount_home').modal('toggle');
    });

    $('body').on('submit', '#LoadModalHome .formDonhangAccountHome', function(e){
        e.preventDefault();
        var htmlloading = '';

        htmlloading += '<div class="loading"></div>';
        $('.loading-data__muangay').html('');
        $('.loading-data__muangay').html(htmlloading);

        var formSubmit = $(this);
        var url = formSubmit.attr('action');
        var btnSubmit = formSubmit.find(':submit');
        btnSubmit.prop('disabled', true);

        $.ajax({
            type: "POST",
            url: url,
            data: formSubmit.serialize(), // serializes the form's elements.
            beforeSend: function (xhr) {

            },
            success: function (response) {

                $('.data__form__random').html('');

                if(response.status == 1){
                    $('.loadModal__acount').modal('hide');
                    swal({
                        title: "Mua tài khoản thành công",
                        text: "Thông tin chi tiết tài khoản vui lòng về lịch sử đơn hàng.",
                        type: "success",
                        confirmButtonText: "Về lịch sử đơn hàng",
                        showCancelButton: true,
                        cancelButtonText: "Đóng",
                    })
                        .then((result) => {
                            if (result.value) {
                                window.location = '/lich-su-mua-nick';
                            } else if (result.dismiss === "Đóng") {
                                location.reload();
                            }else {
                                location.reload();
                            }
                        })
                }
                else if (response.status == 2){
                    $('.loadModal__acount').modal('hide');

                    swal(
                        'Thông báo!',
                        response.message,
                        'warning'
                    )
                }else {
                    $('.loadModal__acount_home').modal('hide');
                    swal(
                        'Lỗi!',
                        response.message,
                        'error'
                    )
                }
                $('.loading-data__muangay').html('');
            },
            error: function (response) {
                if(response.status === 422 || response.status === 429) {
                    let errors = response.responseJSON.errors;

                    jQuery.each(errors, function(index, itemData) {

                        formSubmit.find('.notify-error').text(itemData[0]);
                        return false; // breaks
                    });
                }else if(response.status === 0){
                    alert(response.message);
                    $('#text__errors').html('<span class="text-danger pb-2" style="font-size: 14px">'+response.message+'</span>');
                }
                else {
                    $('#text__errors').html('<span class="text-danger pb-2" style="font-size: 14px">'+'Kết nối với hệ thống thất bại.Xin vui lòng thử lại'+'</span>');
                }
            },
            complete: function (data) {
                btnSubmit.prop('disabled', false);
            }
        })


    })

    $('body').on('click', '.the-cao-atm-home',function(e){
        $('#notBuyHome').modal('show');
    });

});
