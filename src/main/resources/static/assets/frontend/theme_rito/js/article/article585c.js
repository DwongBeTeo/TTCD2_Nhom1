
// option swiper card
let slider_count = 1;
if ($('.slider--card .swiper-wrapper').children().length > 1) {
    slider_count = 1.25;
}

// option swiper article banner
var swiper_article= new Swiper(".article--slider", {
    autoplay: {
        disableOnInteraction: false,
        delay:3000
    },
    speed:500,
    pagination: {
        el: ".swiper-pagination.--custom",
        clickable: true
    },
    loop:true,
});

// option swiper article article
var swiper_article_banner = new Swiper(".article--slider__news", {
    spaceBetween: 16,
    slidesPerView:4,
    allowTouchMove: false,
    breakpoints: {
        1190: {
            slidesPerView: 2.25,
            allowTouchMove: true,
        }
    },
});
