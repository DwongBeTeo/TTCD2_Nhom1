var banner_slide = new Swiper('.swiper-banner', {
    autoplay: true,
    pagination: {
        el: '.banner-slide .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-banner .navigation.slider-next',
        prevEl: '.swiper-banner .navigation.slider-prev',
    },
    updateOnImagesReady: true,
    watchSlidesVisibility: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingOnTransitionStart: false,

    centeredSlides: false,
    slidesPerView: 1,
    speed: 600,
    delay: 5000,

    loop: "infinite",


    // spaceBetween: 56,
    freeMode: false,
    touchMove: true,
    freeModeSticky:true,
    grabCursor: true,
    observer: true,
    observeParents: true,
    keyboard: {
        enabled: true,
    },
    // breakpoints: {
    //
    //     992: {
    //         slidesPerView: 3,
    //     },
    //
    //
    //     480: {
    //         slidesPerView: 1.5,
    //
    //     }
    // }
});
var header_slide = new Swiper('.swiper-header', {
    autoplay: true,
    pagination: {
        el: '.header_slide .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-header .navigation.slider-next',
        prevEl: '.swiper-header .navigation.slider-prev',
    },
    updateOnImagesReady: true,
    watchSlidesVisibility: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingOnTransitionStart: false,

    centeredSlides: false,
    slidesPerView: 1,
    speed: 600,
    delay: 5000,

    loop: "infinite",


    // spaceBetween: 56,
    freeMode: false,
    touchMove: true,
    freeModeSticky:true,
    grabCursor: true,
    observer: true,
    observeParents: true,
    keyboard: {
        enabled: true,
    },
    // breakpoints: {
    //
    //     992: {
    //         slidesPerView: 3,
    //     },
    //
    //
    //     480: {
    //         slidesPerView: 1.5,
    //
    //     }
    // }
});

var header_slide_v2 = new Swiper('.swiper-header_v2', {
    autoplay: false,
    pagination: {
        el: '.header_slide_v2 .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-header_v2 .navigation.slider-next',
        prevEl: '.swiper-header_v2 .navigation.slider-prev',
    },
    updateOnImagesReady: true,
    watchSlidesVisibility: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingOnTransitionStart: false,

    centeredSlides: false,
    slidesPerView: 1,
    speed: 600,
    delay: 5000,

    // loop: "infinite",


    // spaceBetween: 56,
    freeMode: false,
    touchMove: true,
    freeModeSticky:true,
    grabCursor: true,
    observer: true,
    observeParents: true,
    keyboard: {
        enabled: true,
    },
    // breakpoints: {
    //
    //     992: {
    //         slidesPerView: 3,
    //     },
    //
    //
    //     480: {
    //         slidesPerView: 1.5,
    //
    //     }
    // }
});

var instruct_slide = new Swiper('.swiper-instruct', {
    autoplay: false,
    pagination: {
        el: '.instruct-slide .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-instruct .swiper-button-next',
        prevEl: '.swiper-instruct .swiper-button-prev',
    },
    updateOnImagesReady: true,
    watchSlidesVisibility: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingOnTransitionStart: false,

    centeredSlides: false,
    slidesPerView: 1,
    speed: 600,
    delay: 5000,

    loop: "false",


    // spaceBetween: 56,
    freeMode: false,
    touchMove: true,
    freeModeSticky:true,
    grabCursor: true,
    observer: true,
    observeParents: true,
    keyboard: {
        enabled: true,
    },
    // breakpoints: {
    //
    //     992: {
    //         slidesPerView: 3,
    //     },
    //
    //
    //     480: {
    //         slidesPerView: 1.5,
    //
    //     }
    // }
});
var instruct_mb_slide = new Swiper('.swiper-instruct-mb', {
    autoplay: false,
    pagination: {
        el: '.instruct-slide .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-instruct-mb .navigation.slider-next',
        prevEl: '.swiper-instruct-mb .navigation.slider-prev',
    },
    updateOnImagesReady: true,
    watchSlidesVisibility: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingOnTransitionStart: false,

    centeredSlides: false,
    slidesPerView: 1,
    speed: 600,
    delay: 5000,

    loop: "false",


    // spaceBetween: 56,
    freeMode: false,
    touchMove: true,
    freeModeSticky:true,
    grabCursor: true,
    observer: true,
    observeParents: true,
    keyboard: {
        enabled: true,
    },
    // breakpoints: {
    //
    //     992: {
    //         slidesPerView: 3,
    //     },
    //
    //
    //     480: {
    //         slidesPerView: 1.5,
    //
    //     }
    // }
});
var banner_slide_text = new Swiper('.news-ads-slide', {
    autoplay: true,
    pagination: {
        el: '.banner-news .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.news-ads-slide .navigation.slider-next',
        prevEl: '.news-ads-slide .navigation.slider-prev',
    },
    updateOnImagesReady: true,
    watchSlidesVisibility: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingOnTransitionStart: false,

    centeredSlides: false,
    slidesPerView: 1,
    speed: 600,
    delay: 5000,

    loop: "infinite",
    //
    effect: "slide",
    // spaceBetween: 56,
    freeMode: false,
    touchMove: true,
    freeModeSticky:true,
    grabCursor: true,
    observer: true,
    observeParents: true,
    keyboard: {
        enabled: true,
    },
    breakpoints: {
        // 2000: {
        //
        // },
        // 992: {
        //
        // },
        //
        //
        // 480: {
        //     effect: "slide",
        //
        // }
    }
});

var swiper2 = new Swiper('.item_play_dif_slide_detail', {

    navigation: {
        nextEl: '.item_play_dif_slide .swiper-button-next',
        prevEl: '.item_play_dif_slide .swiper-button-prev',
    },
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //     autoplaySpeed: 5000,
    //
    // },
    autoplay: true,
    // preloadImages: false,
    updateOnImagesReady: true,
    // lazyLoading: false,
    watchSlidesVisibility: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingOnTransitionStart: false,

    // watchSlidesProgress: true,
    //
    lazy: true,
    lazy: {
        loadPrevNext: true,
    },
    loop: false,
    centeredSlides: false,
    slidesPerView: 4,
    speed: 800,
    spaceBetween: 12,


    // autoplay: false,
    // parallax: true,
    touchMove: true,
    freeModeSticky:true,
    grabCursor: true,
    // slideToClickedSlide: true,

    observer: true,
    observeParents: true,
    breakpoints: {
        // 1460: {
        //     coverflowEffect: {
        //         rotate: 0   ,
        //         stretch: 476,
        //         depth: 300,
        //         modifier: 1, // 2,3
        //         slideShadows : false,
        //     },
        // },
        // 1220: {
        //     coverflowEffect: {
        //         rotate: 0   ,
        //         stretch: 180,
        //         depth: 300,
        //         modifier: 1, // 2,3
        //         slideShadows : false,
        //
        //     },
        // },
        992: {
            slidesPerView: 3,
        },


        480: {
            slidesPerView: 2,

        }
    }
});

var swiperAffiliate = new Swiper('.item_play_dif_slide_detail_affiliate', {

    navigation: {
        nextEl: '.item_play_dif_slide .swiper-button-next',
        prevEl: '.item_play_dif_slide .swiper-button-prev',
    },
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //     autoplaySpeed: 5000,
    //
    // },
    autoplay: true,
    // preloadImages: false,
    updateOnImagesReady: true,
    // lazyLoading: false,
    watchSlidesVisibility: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingOnTransitionStart: false,

    // watchSlidesProgress: true,
    //
    lazy: true,
    lazy: {
        loadPrevNext: true,
    },
    loop: false,
    centeredSlides: false,
    slidesPerView: 3,
    speed: 800,
    spaceBetween: 12,


    // autoplay: false,
    // parallax: true,
    touchMove: true,
    freeModeSticky:true,
    grabCursor: true,
    // slideToClickedSlide: true,

    observer: true,
    observeParents: true,
    breakpoints: {
        // 1460: {
        //     coverflowEffect: {
        //         rotate: 0   ,
        //         stretch: 476,
        //         depth: 300,
        //         modifier: 1, // 2,3
        //         slideShadows : false,
        //     },
        // },
        // 1220: {
        //     coverflowEffect: {
        //         rotate: 0   ,
        //         stretch: 180,
        //         depth: 300,
        //         modifier: 1, // 2,3
        //         slideShadows : false,
        //
        //     },
        // },
        992: {
            slidesPerView: 3,
        },


        480: {
            slidesPerView: 2,

        }
    }
});


