$(document).ready(function(){
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    function fn(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    function getTopCharge(){
        const url = '/top-charge';
        $.ajax({
            type: "GET",
            url: url,
            async:true,
            cache:false,
            beforeSend: function (xhr) {
            },
            success: function (data) {
                if(data.status == 1){
                    let html = '';
                    let htmlCharge = '';
                    let isMoldal = false;
                    let auth_id = false;
                    if (auth_user){
                        auth_id = auth_user.id;
                    }

                    if(data.data && data.data.length > 0 ){
                        $.each(data.data,function(key,value){
                            key = key +1;
                            if (auth_id && value.user_id == auth_id){
                                isMoldal = true;
                            }
                            if (key < 4){
                                html += '<li>';
                                html += '<p class="bg-content"></p>';
                                html += '<span>'+fn(value.username, 12) +'</span>';
                                // html += '<label>'+value.username+'<sup>đ</sup></label>';
                                html += '<label>'+ formatNumber(value.amount) +'<sup>đ</sup></label>';
                                html +='</li>';
                            }else if(key < 6){
                                html += '<li>';
                                html += '<p class="text-content">'+key+'</p>';
                                html += '<span>'+fn(value.username, 12) +'</span>';
                                // html += '<label>'+value.username+'<sup>đ</sup></label>';
                                html += '<label>'+ formatNumber(value.amount) +'<sup>đ</sup></label>';
                                html +='</li>';
                            }

                        });
                        htmlCharge += '<a href="/nap-the" class="">';
                        htmlCharge += '<div class="text-white btn-nap-the c-py-8 c-px-16 text-center c-mb-12">Nạp thẻ ngay</div>';
                        htmlCharge += '</a>';
                    }
                    else{

                    }

                    $('.content-banner-card-top').html(html)
                    $('.content-banner-card .btn-charge').html(htmlCharge);
                }
            },
            error: function (data) {
                console.log('Có lỗi phát sinh, vui lòng liên hệ QTV để kịp thời xử lý(top-charge)!')
                return;
            },
            complete: function (data) {

            }
        });
    }

    getTopCharge();
});
