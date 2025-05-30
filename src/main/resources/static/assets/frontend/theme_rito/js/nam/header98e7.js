function openSearch(){
    // let width = $(window).width();
    setTimeout(function(){
        $('.box-search-mobile_detail').toggle();

    }, 0);
}
$(document).ready(function () {
    // $(document).on('scroll',function(){
    //
    //     if ($(this).scrollTop() > 180) {
    //
    //         $('.box-menu').addClass("menu-fix");
    //         $('.box-menu-bar').fadeOut(200);
    //
    //     } else {
    //         $('.box-menu').removeClass("menu-fix");
    //         $('.box-menu-bar').fadeIn(200);
    //     }
    // });
    // $('.refresh-captcha').click(function () {
    //     $('.refresh-captcha img').toggleClass("down");
    // });
    $(document).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.go-to-top').fadeIn();
            $('.go-to-top').addClass('d-flex');
        } else {
            $('.go-to-top').fadeOut();
            $('.go-to-top').removeClass('d-flex');
        }
    });
    $('.go-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
    var user = function() {
        $('.box-search-mobile').click(function(e) {
            e.stopPropagation();
            $('.box-search-mobile_detail').click(function (e) {
                e.stopPropagation();
            });
            $('.box-search-mobile_detail').toggle();
            $('.box-account-logined').hide();

        });
        $(document).on("click",".box-account-open",function(e) {

            // $('.box-account-open').click(function(e) {
            // e.preventDefault(); // stops link from making page jump to the top
            let login_content = $('.box-account-logined');
            e.stopPropagation();
            login_content.click(function (e) {
                e.stopPropagation();
            });
            // Okee rồi nhé anh Nam ^^
            login_content.fadeToggle(200);
            $('.box-search-mobile_detail').fadeOut(100);
            $('.notify_menu').hide()
        });

        $(document).on('click','body',function(){
            $('.box-account-logined').hide();
            $('.box-search-mobile_detail').fadeOut(100)
        });
        $('.close-login-popup').click( function() {
            $('.box-account-logined').fadeOut(200);
            $('.box-search-mobile_detail').fadeOut(100)
        });

        $('.nav-bar-info-search').click( function() {
            $('.user-logined-content').fadeOut(200);
            $('.box-search-mobile_detail').fadeOut(100)

        });

    }
    $(document).ready(user);




    $(document).ready(function(){

        var previousScroll = 0;

        // $(window).scroll(function(){
        //     var currentScroll = $(this).scrollTop();
        //     if (currentScroll > 80 && currentScroll < $(document).height() - $(window).height()){
        //         if (currentScroll >= previousScroll){
        //             window.setTimeout(hideNav, 100);
        //         } else {
        //             window.setTimeout(showNav, 100);
        //         }
        //         previousScroll = currentScroll;
        //     }else{
        //         window.setTimeout(hideNav, 100);
        //     }
        // });
        // function hideNav() {
        //     $('.box-menu').removeClass("menu-fix");
        //     $('.box-menu-bar').fadeIn(200);
        //     $('.rotation-leaderboard').css('top', '80px');

        // }
        // function showNav() {
        //     $('.box-menu').addClass("menu-fix");
        //     $('.box-menu-bar').fadeOut(200);
        //     $('.rotation-leaderboard').css('top', '140px');
        // }

    });
    $(window).scroll(function() {
        if($(window).width() < 992) {

            if ($(this).scrollTop() > 0) {
                $('.box-search_mobile').fadeIn();
                if ($(this).scrollTop() > 64){
                    $('.search-mobi-header').addClass('invisible');
                }else {
                    $('.search-mobi-header').removeClass('invisible');
                }
            } else {
                $('.box-search_mobile').fadeOut();
                $('.search_header_click').addClass('d-none');
                $('.search-mobi-header').removeClass('invisible');
            }
        }
    });

    // $(function() {
    //
    //     $('.lazy').Lazy({
    //         // your configuration goes here
    //         placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
    //         // scrollDirection: 'vertical',
    //         effect: 'fadeIn',
    //         visibleOnly: true,
    //         afterLoad: function(element) {
    //             $('img.lazy').css('background-image','unset')
    //         },
    //         onFinishedAll: function() {
    //             // called once all elements was handled
    //         }
    //
    //     });
    //
    // });

    Fancybox.bind('[data-fancybox="galleryAccount"]', {
        infinite: true,
        Thumbs : false,
        toolbar         : false,
        dragToClose: true,
        animated: true,
        closeButton: "top",
        openSpeed: 300,
        Image: {
            zoom: true,
            // zoom: 200
        },
        caption: function (fancybox, carousel, slide) {
            return (
                `${slide.index + 1} / ${carousel.slides.length} <br />` + slide.caption
            );
        },
        slideshow: true,
        Toolbar: {

            display: [
                { id: "prev", position: "center" },
                { id: "counter", position: "center" },
                { id: "next", position: "center" },
                { id: "zoom", position: "center" },
                "close",
            ],

        },

    });
    Fancybox.bind('[data-fancybox="galleryNickDetail"]', {
        infinite: false,
        Thumbs : true,
        toolbar         : true,
        dragToClose: true,
        animated: true,
        loop:false,
        closeButton: "top",
        openSpeed: 300,
        Image: {
            zoom: true,
            // zoom: 200
        },
        caption: function (fancybox, carousel, slide) {
            return (
                `${slide.index + 1} / ${carousel.slides.length} <br />` + slide.caption
            );
        },
        slideshow: true,
        Toolbar: {

            display: [
                { id: "prev", position: "center" },
                { id: "counter", position: "center" },
                { id: "next", position: "center" },
                { id: "zoom", position: "center" },
                "close",
            ],

        },

    });
    // randomBannerTop()
    // function randomBannerTop() {
    //     var s, f, t, e, h, i;
    //     if (!isRandomBannerTop) {
    //         var c = document.querySelector(".banner-media"),
    //             r = document.querySelector(".media-slider"),
    //             o = window.location.pathname,
    //             u = sessionStorage.getItem(bannerTopIndexKey),
    //             n = parseInt(u);
    //         if (o != "/" && u == null && randomizeChild(r), u != null && !isNaN(n) && (n + 1 >= document.querySelectorAll(".media-slider .item").length ? n = 0 : n++, n > 0)) {
    //             for (s = document.querySelectorAll(".media-slider .item"), f = document.createDocumentFragment(), t = 0; t < n; t++) f.appendChild(s[t]);
    //             r.append(f)
    //         }
    //         document.querySelectorAll(".media-slider .item").length > 1 && (e = document.querySelector(".media-slider .item"), h = document.querySelector(".media-slider .item a").getAttribute("href"), o == h && (e.remove(), r.appendChild(e)));
    //         i = document.querySelector(".media-slider .item");
    //         c.style.backgroundColor = i.dataset.backgroundColor;
    //         i.classList.add("visible");
    //         n = i.dataset.order;
    //         sessionStorage.setItem(bannerTopIndexKey, n != null ? n - 1 : 0);
    //         isRandomBannerTop = !0
    //     }
    // }
    // initCarousel();
    // function initCarousel() {
    //     var i = document.querySelector(".banner-media"),
    //         r = document.querySelector(".media-slider .prev"),
    //         u = document.querySelector(".media-slider .next"),
    //         n = 0,
    //         t = document.querySelectorAll(".media-slider .item"),
    //         f = t.length;
    //     lazyLoadImg(t[n].querySelector("a img"));
    //     r != null && r.addEventListener("click", function() {
    //         t[n].classList.remove("visible");
    //         n--;
    //         n < 0 && (n = f - 1);
    //         t[n].classList.add("visible");
    //         i.style.backgroundColor = t[n].dataset.backgroundColor;
    //         lazyLoadImg(t[n].querySelector("a img"))
    //     });
    //     u != null && u.addEventListener("click", function() {
    //         t[n].classList.remove("visible");
    //         n++;
    //         n > f - 1 && (n = 0);
    //         t[n].classList.add("visible");
    //         i.style.backgroundColor = t[n].dataset.backgroundColor;
    //         lazyLoadImg(t[n].querySelector("a img"))
    //     })
    // }
});



