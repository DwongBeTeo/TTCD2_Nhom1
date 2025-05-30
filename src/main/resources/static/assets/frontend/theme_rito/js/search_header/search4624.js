$(document).ready(function () {
    function searchHeader() {
        let width = $(window).width();
        if(width > 992){
            var valSearch = $("#search-header-input").val();
        }else{
            if ($('.search_header_click').hasClass('d-none')){
                var valSearch = $(".search-mobi-header .search-header-input-mob").val();
            }else {
                var valSearch = $(".search_header_click .search-header-input-mob").val();
            }
            if(!valSearch){
                var valSearch = $(".search-menu-header-mob-new").val();
            }
            if(!valSearch){
                var valSearch = $("#search-mob-input-pubg").val();
            }
        }        
        if (valSearch != "") {
            window.location.href = "/search?query=" + valSearch;
        }
    }

    $("#formSearchHeader").submit(function (e) {
        e.preventDefault();
        searchHeader();
    });

    $(".formSearchHeaderMob").submit(function (e) {
        e.preventDefault();
        searchHeader();
    });

    $(".ic-search").click(function (e) {
        e.preventDefault();
        searchHeader();
    });

    var typingTimer;
    var doneTypingInterval = 200;

    $("#search-header-input").on("input", function () {
        clearTimeout(typingTimer);
        var query = $("#search-header-input").val();
        if (query == "") {
            changeInputHeader(query);
        }
        typingTimer = setTimeout(function () {
            if (query != "") {
                changeInputHeader(query);
            }
        }, doneTypingInterval);
    });
    $(".search-header-mob").on("input", function () {
        clearTimeout(typingTimer);
        // var query = $(".search-header-mob").val();
        if ($('.search_header_click').hasClass('d-none')){
            var query = $(".search-mobi-header .search-header-input-mob").val();
        }else {
            var query = $(".search_header_click .search-header-input-mob").val();
        }
        if (query == "") {
            changeInputHeader(query);
        }

        typingTimer = setTimeout(function () {
            if (query != "") {
                changeInputHeader(query);
            }
        }, doneTypingInterval);
    });

    $("#search-header-input").on("click", function () {
        clearTimeout(typingTimer);
        var query = $("#search-header-input").val();
        if (query == "") {
            changeInputHeader(query);
        }

        typingTimer = setTimeout(function () {
            if (query != "") {
                changeInputHeader(query);
            }
        }, doneTypingInterval);
    });

    $(".search-header-mob").on("click", function () {
        clearTimeout(typingTimer);
        if ($('.search_header_click').hasClass('d-none')){
            var query = $(".search-mobi-header .search-header-input-mob").val();
        }else {
            var query = $(".search_header_click .search-header-input-mob").val();
        }
        if (query == "") {
            changeInputHeader(query);
        }

        typingTimer = setTimeout(function () {
            if (query != "") {
                changeInputHeader(query);
            }
        }, doneTypingInterval);
    });

    $('.box-search_mobile').on("click", function () {
        $('.search_header_click').toggleClass('d-none')
    })

    const $popup = $("#input-search-header");
    const $popup_mob = $(".input-search-header-mob");

    $(document).on("click", function (e) {
        if ($popup.html() != "") {
            $popup.empty().html("");
        }
        if ($popup_mob.html() != "") {
            $popup_mob.empty().html("");
        }
    });

    function changeInputHeader(query) {
        $.ajax({
            type: "GET",
            url: "/search",
            data: {
                query: query,
            },
            beforeSend: function () {},
            success: function (data) {
                if (data.status == 1) {
                    if ($(window).width() > 992) {
                        $("#input-search-header").html(data.data);
                    } else {
                        $(".input-search-header-mob").html(data.data);
                    }
                }
            },
            complete: function (data) {},
        });
    }
});
