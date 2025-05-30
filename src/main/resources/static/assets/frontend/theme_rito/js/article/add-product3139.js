$(document).ready(function(){
    $(".product").each(function() {
        var type = $(this).data("type");
        var id = $(this).data("id");
        var product_type = 0;
        console.log($(this).hasClass('swiper-slide'))
        if ($(this).hasClass('swiper-slide')){
            product_type = 1;
        }
        function getProduct(){
            const url = '/get-article-product';
            $.ajax({
                type: "GET",
                url: url,
                async:true,
                cache:false,
                data: {
                    type:type,
                    id:id,
                    product_type: product_type
                },
                beforeSend: function (xhr) {

                },
                success: function (res) {
                    if(res.status == 1){
                        if (res.data != null){
                            let html = '';
                            html = res.data;
                            if (product_type == 1){
                                $(".swiper-slide.product_"+id).html(html);
                            }
                            if (product_type == 0){
                                $(".no-slide.product_"+id).html(html);
                            }
                        }
                    }
                },
                error: function (data) {
                    console.log('Có lỗi phát sinh, vui lòng liên hệ QTV để kịp thời xử lý(article product)!')
                    return;
                },
                complete: function (data) {

                }
            });
        }
        getProduct();

    });


    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    function fn(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }


    // let config =  JSON.parse($('#array-auto').val());

    // $('#content').autoLink(config);

});
