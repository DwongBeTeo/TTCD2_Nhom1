$(document).ready(function () {
    var width_notify = $(window).width();
    $('.close-notification-popup').click( function() {
        $('.notify_menu').fadeOut(200);
        $('.box-search-mobile_detail').fadeOut(100)
    });
    // load so thong bao khi load trang

    setTimeout(function() {
        CountNotification();
    }, 4500);

    function CountNotification(){
        if (auth_check){
            url = "/user/notification-count";
        }else{
            url = "/user/notification-count-not-auth";
        }
        $.ajax({
            type: "GET",
            url: url,
            data: {
                page:page
            },
            beforeSend: function (xhr) {

            },
            success: function (data){
                if(data.status == 1){
                    if(data.count > 0){
                        $('#data-notification').val(data.count);
                        var num = data.count;
                        if(num > 9){
                            num = "9+";
                        }
                        $('#num-notification').text(num);
                        $('#num-notification').removeClass('d-none');
                        // var htmltitle = '';
                        // htmltitle = '(' + num + ') ' + title;
                        // $('#metatitle').html('');
                        // $('#metatitle').html(htmltitle);
                    }
                    else{
                        $('#num-notification').text(0);
                        $('#data-notification').val(0);
                        // var htmltitle = '';
                        // htmltitle = title;
                        // $('#metatitle').html('');
                        // $('#metatitle').html(htmltitle);

                    }
                }
                else{
                    $('#num-notification').text(0);
                    $('#data-notification').val(0);
                    // var htmltitle = '';
                    // htmltitle = title;
                    // $('#metatitle').html('');
                    // $('#metatitle').html(htmltitle);

                }
            },
            error: function (data) {

            },
            complete: function (data) {

            }

        })
    }
    var page = 1;
    var type = 1;
    if (width_notify < 992) {
        $('.box-notify').click(function () {
            $('.noti_menu_mobile').css('transform', 'translateX(0)');
            page = 1;
            let loading = "";
            loading += '<div class="loading-wrap"><span class="modal-loader-spin"></span></div>';
            $('.notification_type.mobile .tag').removeClass('active');
            type = $('.notification_type.mobile .tag').first().data('id');
            $('.notification_type.mobile .tag').first().addClass('active');
            $('.notify_menu_seeMore').attr('data-type', type);
            $('.notify_content_layout').prepend(loading).addClass('is-load');
            getNotification(page,type);
        })
    } else {
        $(document).on("click",".box-notify",function(e) {
            let notification_content = $('.notify_menu');
            e.stopPropagation();
            notification_content.click(function (e) {
                e.stopPropagation();
            });
            notification_content.fadeToggle(200);
            $('.box-search-mobile_detail').fadeOut(100);
            $('.box-account-logined').hide();
            page = 1;
            $('.notification_type .tag').removeClass('active');
            type = $('.notification_type .tag').first().data('id');
            $('.notification_type .tag').first().addClass('active');
            $('.notify_menu_seeMore').attr('data-type', type);

            let loading = "";
            loading += '<div class="loading-wrap"><span class="modal-loader-spin"></span></div>';
            $('.notify_content_layout').prepend(loading).addClass('is-load');
            getNotification(page,type);
        });

        $(document).on('click','body',function(){
            $('.notify_menu').hide();
            $('.box-search-mobile_detail').fadeOut(100)
        });
    }

    $('.notification_type .tag').click(function (e) {
        e.stopPropagation();
        $('.notification_type .tag').removeClass('active');
        $(this).addClass('active');
        type = $(this).data('id');
        page = 1;
        $('.notify_menu_seeMore').attr('data-type', type);
        let loading = "";
        loading += '<div class="loading-wrap"><span class="modal-loader-spin"></span></div>';
        $('.notify_content_layout').prepend(loading).addClass('is-load');
        getNotification(page,type);
    })
    $('.notify_menu_seeMore').click(function (e) {
        e.stopPropagation();
        page++;
        let loading = "";
        loading += '<div class="loading-wrap"><span class="modal-loader-spin"></span></div>';
        type = $(this).attr('data-type');
        $('.notify_content_layout').prepend(loading).addClass('is-load');
        $(this).prop('disabled', true);
        getNotification(page,type);
    })
    function getNotification(page,type){
        if (auth_check){
            url = "/user/notification";
        }else{
            url = "/user/notification-not-auth";
        }
        $.ajax({
            type: "GET",
            url: url,
            data: {
                page:page,
                type:type,
            },
            beforeSend: function (xhr) {

            },
            success: function (data){
                let html = "";
                if(data.status === "LOGIN"){
                    html += '<div class="notification-menu-in-content text-center c-my-16" >';
                    html += '  <img src="/assets/frontend/theme_rito/image/nam/notification_mailbox.png" alt="">';
                    html += '<p class="fw-500 c-mt-12">Vui lòng <a href="javascript:void(0)" class="font-italic text-primary-color" onclick="openLoginModal()">Đăng nhập</a>  để sử dung <br> tính năng này!\n</p>';
                    html += '</div>';
                    if (width_notify < 992) {
                        $('#result-notification_mobile').html(html);

                    }else {
                        $('#result-notification').html(html);

                    }
                }
                if(data.status == 1){
                    $.each(data.data,function(key,value){
                        html += '<div class="sidebar">';
                        if (value.href){
                            html += '<a href="'+value.href+'">';
                        }else {
                            html += '<a href="javascript:void(0)">';

                        }
                        html += '<div class="sidebar-section d-flex brs-12 c-mb-8 ">';
                        html += '<div class="sidebar-section-avt brs-100 c-mr-12">';
                        html += '<img class="brs-100" src="/assets/frontend/theme_rito/image/nam/anhdaidien.svg" alt="">';
                        html += '</div>';
                        html += '<div class="sidebar-section-info" style="flex: 1">';
                        html += '<div class="sidebar-section-title c-mb-4 fz-15 fw-500 text-limit limit-3">'+value.content+'</div>';
                        html += '<div class="sidebar-section-info-text c-mb-4 fz-13">'+value.time+'</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</a>';
                        html += '</div>';
                    })
                    if(data.currentPage == 1){
                        if (width_notify < 992) {
                            $('#result-notification_mobile').html(html);
                        }else {
                            $('#result-notification').html(html);
                        }
                        //$('.notification-menu').toggle();
                        if(data.append == 0){
                            $('.notify_menu_seeMore').css('display','none');
                        }
                    }
                    else{
                        if (width_notify < 992) {
                            $('#result-notification_mobile').append(html);
                        }else {
                            $('#result-notification').append(html);
                        }
                    }
                    if(data.lastPage <= page){
                        $('.notify_menu_seeMore').css('display','none');
                    }else {
                        $('.notify_menu_seeMore').css('display','block');
                    }
                    if (!$('#num-notification').hasClass('d-none')){
                        $('#num-notification').text('');
                        $('#num-notification').addClass('d-none');
                        $('#num-notification').attr('data-notification',0); //setter
                    }
                    jQuery.each( data.notification_count, function( i, val ) {
                        var num = val;
                        if(num > 9){
                            num = "9+";
                        }
                        $('.num-notification-inner_'+i).text(num)
                        if (val > 0){
                            $('.num-notification-inner_'+i).css('display','block')

                        }else {
                            $('.num-notification-inner_'+i).css('display','none')

                        }
                    });
                }
                if(data.status == 0){
                    html += '<div class="notification-menu-in-content text-center c-my-16" >';
                    html += '  <img src="/assets/frontend/theme_rito/image/nam/notification_mailbox.png" alt="">';
                    html += '<p class="fw-500 c-mt-12">Bạn chưa có thông báo nào\n</p>';
                    html += '</div>';
                    if (width_notify < 992) {
                        $('#result-notification_mobile').html(html);

                    }else {
                        $('#result-notification').html(html);

                    }
                    $('.notify_menu_seeMore').css('display','none');

                }
            },
            error: function (data) {
                html += '<div class="notification-menu-in-content text-center c-my-16" >';
                html += '  <img src="/assets/frontend/theme_rito/image/nam/notification_mailbox.png" alt="">';
                html += '<p class="fw-500 c-mt-12">Có lỗi phát sinh!\n</p>';
                html += '</div>';
                if (width_notify < 992) {
                    $('#result-notification_mobile').html(html);

                }else {
                    $('#result-notification').html(html);

                }
            },
            complete: function (data) {
                $('.notify_content_layout').removeClass('is-load')
                $('.notify_content_layout').find('.loading-wrap').remove();
                $(".notify_menu_seeMore").prop('disabled', false);

            }

        })
    }


})
