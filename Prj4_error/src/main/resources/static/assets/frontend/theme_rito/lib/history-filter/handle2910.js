function loadData(elm_form) {
    let overlay_find = $(".filter-history");
    let root_elm = $("#params-filter");
    root_elm.html("");
    let html_append = "";
    let length = 0;
    let sort_data = [];
    let sort_data_el = elm_form.find("[name]");

    Array.from(sort_data_el).forEach(function (elm) {
        if ($(elm).prop("tagName") === "INPUT" && !!$(elm).val().trim()) {
            let key = $(elm).attr("name");
            let value = $(elm).val();
            sort_data.push([key, value]);
            ++length;
        }

        if ($(elm).prop("tagName") === "SELECT" && !!$(elm).val()) {
            let key = $(elm).attr("name");
            if ($(elm).prop("multiple")) {
            } else {
                let value = $(elm).val();
                if (value != '' && value != undefined) {
                    let text = $(elm).find(':selected').text();
                    let value = $(elm).find(':selected').val();

                    sort_data.push([key, value, text]);

                    ++length;
                }
            }
        }
    });

    let val_checkbox = '';
    let text_checkbox = '';


    if(width < 992){
        $('.input_selectSkin_mobile').each(function (index, elem) {
            let dataid = $(this).data('id');
            let val_select = '';
            let text_select = '';

            $('.input_selectSkin_mobile select[name="data_skin['+ dataid +'][]"]').find(':selected').each(function(indexc, elemc) {
                if ($(elemc).val()){
                    if (val_select == ''){
                        val_select = $(elemc).val();
                    }else{
                        val_select = val_select + '|' + $(elemc).val();
                    }

                    if (text_select == ''){
                        text_select = $(elemc).data('title');
                    }else{
                        text_select = text_select + '|' + $(elemc).data('title');
                    }

                }
            });

            if (val_select != ''){
                if (val_checkbox == ''){
                    val_checkbox = val_select;
                }else{
                    val_checkbox = val_checkbox + '|' + val_select;
                }
            }

            if (text_select != ''){
                if (text_checkbox == ''){
                    text_checkbox = text_select;
                }else{
                    text_checkbox = text_checkbox + '|' + text_select;
                }
            }

        });
    }else{
        $('.input_selectSkin').each(function (index, elem) {
            let dataid = $(this).data('id');
            let val_select = '';
            let text_select = '';

            $('.input_selectSkin select[name="data_skin['+ dataid +'][]"]').find(':selected').each(function(indexc, elemc) {
                if ($(elemc).val()){
                    if (val_select == ''){
                        val_select = $(elemc).val();
                    }else{
                        val_select = val_select + '|' + $(elemc).val();
                    }

                    if (text_select == ''){
                        text_select = $(elemc).data('title');
                    }else{
                        text_select = text_select + '|' + $(elemc).data('title');
                    }

                }
            });

            if (val_select != ''){
                if (val_checkbox == ''){
                    val_checkbox = val_select;
                }else{
                    val_checkbox = val_checkbox + '|' + val_select;
                }
            }

            if (text_select != ''){
                if (text_checkbox == ''){
                    text_checkbox = text_select;
                }else{
                    text_checkbox = text_checkbox + '|' + text_select;
                }
            }

        });
    }

    if (val_checkbox != ''){
        sort_data.push(['data_skin', val_checkbox, text_checkbox]);
        ++length;
    }

    let url = location.protocol + "//" + location.host + location.pathname;
    let url_return = "";
    for (let i = 0; i < length; i++) {
        let count_params = sort_data[i].length;
        html_append = "";

        if (sort_data[i][0] == 'data_skin'){

            let val_data_skin = sort_data[i][1].split('|');
            let text_data_skin = sort_data[i][2].split('|');

            if (val_data_skin.length && text_data_skin.length && (val_data_skin.length == text_data_skin.length)){
                for (let m = 0; m <= val_data_skin.length; m++){
                    if (val_data_skin[m] != '' && val_data_skin[m] != undefined){
                        if (val_data_skin[m].indexOf("|") === -1) {
                            let child_html_append = '';
                            child_html_append += `<div class="tag" data-child="${val_data_skin[m]}" data-close="${sort_data[i][0]}">`;
                            child_html_append += `${text_data_skin[m]}`;
                            child_html_append += `</div>`;
                            root_elm.append(child_html_append);
                        }
                        else {
                            // let child_val_data_skin = val_data_skin[m].split('-');
                            // let child_text_data_skin = text_data_skin[m].split('-');

                            // if (child_val_data_skin.length && child_text_data_skin.length && (child_val_data_skin.length == child_text_data_skin.length)){
                            //     for (let j = 0; j <= child_text_data_skin.length; j++){
                            //         if (child_text_data_skin[j] != undefined && child_text_data_skin[j] != null && child_text_data_skin[j] != ''){
                            //             let child_html_append = '';
                            //             child_html_append += `<div class="tag" data-child="${child_val_data_skin[j]}" data-close="${sort_data[i][0]}" >`;
                            //             child_html_append += `${child_text_data_skin[j]}`;
                            //             child_html_append += `</div>`;
                            //             root_elm.append(child_html_append);
                            //         }
                            //     }
                            // }
                        }
                    }
                }
            }

        }else{
            html_append += `<div class="tag" data-close="${sort_data[i][0]}">`;
            if (count_params === 2) {
                if (sort_data[i][0] === "started_at" || sort_data[i][0] === "ended_at") {
                    let start = $(elm_form).find("input[name=started_at]");
                    let end = $(elm_form).find("input[name=ended_at]");
                    if (!!start.val().trim() && !!end.val().trim()) {
                        html_append += `${start.val().trim()} - ${end
                            .val()
                            .trim()}`;
                    } else if (!!start.val().trim()) {
                        html_append += `Sau - ${sort_data[i][1]}`;
                    } else if (!!end.val().trim()) {
                        html_append += `Trước - ${sort_data[i][1]} `;
                    }
                } else {
                    html_append += `${sort_data[i][1]}`;
                }
            }
            if (count_params === 3) {
                html_append += `${sort_data[i][2]}`;
            }
            html_append += `</div>`;

            root_elm.append(html_append);
        }

        /* add params to url*/
        if (!i) {
            url_return = url + `?${sort_data[i][0]}=${sort_data[i][1]}`;
        } else {
            /*Nếu mà nó trùng name nhau thì giá trị sẽ ngăn cách nhau bằng | chứ không thêm key mới vào url*/
            if (sort_data[i][0] === sort_data[i - 1][0]) {
                url_return += `|${sort_data[i][1]}`;
            } else {
                url_return += `&${sort_data[i][0]}=${sort_data[i][1]}`;
            }
        }
    }

    if($("#params-filter").children().length > 4){
        $(".value-filter").css({
            'width': '75%',
            'overflow-x': 'auto'
        });
        $(".nick-findter-data").css({
            'width': '90%',
            'overflow-x': 'scroll',
            'white-space': 'nowrap',
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const page = 1;
    if (!!page) {
        url_return += `&page=${page}`;
        url += `?page=${page}`;
    }
    if (length) {
        window.history.pushState({}, null, url_return);
    } else {
        window.history.pushState({}, null, url);
    }

    if (
        $(".tag[data-close=started_at]").length &&
        $(".tag[data-close=ended_at]").length
    ) {
        --length;
        $(".tag[data-close=ended_at]").remove();
    }
    overlay_find.attr("data-notify", length);
}
function hasQueryParams(url) {
    return url.includes("?");
}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
        return uri + separator + key + "=" + value;
    }
}

$(document).ready(async function () {
    if (typeof loadDataApi === "function") {
        let form_filter =
            width < 992
                ? $(".bottom-sheet .form-filter")
                : $(".modal .form-filter");
        if (form_filter.length) {
            form_filter.on("submit", async function (e) {
                e.preventDefault();
                loadData($(this));
                setParamsUrlToQuery();
                await loadDataApi(query);
                page_history = 1;
                if (width > 992) {
                    $(this).closest(".modal").modal("hide");
                } else {
                    closeSheet();
                }
            });
            form_filter.on("reset", function () {
                $(".form-filter select").niceSelect("update");
            });
            /*chỗ này là vừa vào đã load luôn*/
            setParamsUrlToQuery();

            loadData(form_filter);
            await loadDataApi(query);
        }

        $(document).on("click", "#params-filter .tag", async function () {
            let target_name = $(this).data("close");
            let target_simple = $(`.form-filter [name=${target_name}]`);
            let target = [];

            if (target_name === "started_at") {
                $(
                    ".form-filter [name=started_at],.form-filter [name=ended_at]"
                ).val("");
            }
            else if(target_name == 'data_skin'){
                let child_id = $(this).data('child');
                if(width < 992){
                    $('.input_selectSkin_mobile select[name^="data_skin"] option[value='+ child_id +']').prop('selected',false);
                    $('.input_selectSkin_mobile select[name^="data_skin"] option[value='+ child_id +']').trigger('change');
                }else{
                    $('.input_selectSkin select[name^="data_skin"] option[value='+ child_id +']').prop('selected',false);
                    $('.input_selectSkin select[name^="data_skin"] option[value='+ child_id +']').trigger('change');
                }
            }
            else {
                Array.from(target_simple).forEach(function (elm) {
                    if (!!$(elm).val()) {
                        target.push(elm);
                    }
                });
                target[0].value = "";
            }

            if($("#params-filter").children().length < 5){
                $(".value-filter").css({
                    'width': '',
                    'overflow-x': ''
                });
                $(".nick-findter-data").css({
                    'width': '',
                    'overflow-x': '',
                    'white-space': '',
                });
            }
            form_filter.on("reset", function () {
                $(".form-filter select").niceSelect("update");
            });
            loadData(form_filter);
            setParamsUrlToQuery();
            await loadDataApi(query);
            page_history = 1;
        });
        /*get params on url*/
        function setParamsUrlToQuery() {
            let url = window.location.href;
            if (hasQueryParams(url)) {
                const urlSearchParams = new URLSearchParams(
                    window.location.search
                );
                const params = Object.fromEntries(urlSearchParams.entries());

                Object.keys(query).forEach(function (key) {
                    query[key] = "";
                });

                Object.keys(params).forEach((key) => {
                    query[key] = params[key];

                    if (key == 'data_skin'){
                        let val_param = params[key].split('|');

                        if (val_param.length){
                            for (let t = 0; t <= val_param.length; t++){
                                if (val_param[t] != '' && val_param[t] != undefined){
                                    if (val_param[t].indexOf("-") === -1) {
                                        if(width < 992){
                                            $('.input_selectSkin_mobile select[name^="data_skin"] option[value='+ val_param[t] +']').prop('selected',true);
                                            $('.input_selectSkin_mobile select[name^="data_skin"] option[value='+ val_param[t] +']').trigger('change');
                                        }else{
                                            $('.input_selectSkin select[name^="data_skin"] option[value='+ val_param[t] +']').prop('selected',true);
                                            $('.input_selectSkin select[name^="data_skin"] option[value='+ val_param[t] +']').trigger('change');
                                        }
                                    }
                                    else {

                                        let child_val_param = val_param[t].split('|');
                                        if (child_val_param.length){
                                            for (let k = 0; k <= child_val_param.length; k++){
                                                if(width < 992){
                                                    $('.input_selectSkin_mobile select[name^="data_skin"] option[value='+ child_val_param[k] +']').prop('selected',true);
                                                    $('.input_selectSkin_mobile select[name^="data_skin"] option[value='+ child_val_param[k] +']').trigger('change');
                                                }else{
                                                    $('.input_selectSkin select[name^="data_skin"] option[value='+ child_val_param[k] +']').prop('selected',true);
                                                    $('.input_selectSkin select[name^="data_skin"] option[value='+ child_val_param[k] +']').trigger('change');
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (parseInt(params[key].indexOf("|")) > -1) {
                            let arr_params = params[key].split("|");
                            let inputs = $(form_filter).find(`[name=${key}]`);
                            Array.from(inputs).forEach(function (elm, index) {
                                $('select[name="'+key+'"] option[value="'+ arr_params[index] +'"]').prop('selected',true);
                                $('select[name="'+key+'"] option[value="'+ arr_params[index] +'"]').trigger('change');
                            });
                        } else {
                            $('select[name="'+key+'"] option[value="'+ params[key] +'"]').prop('selected',true);
                            $('select[name="'+key+'"] option[value="'+ params[key] +'"]').trigger('change');
                        }
                        $(form_filter).find("select").niceSelect("update");
                    }

                });

                /*nếu như mà trên url không có page thì phải gán lại cho nó là 1*/
                !params.page ? (query.page = 1) : "";
            } else {
                for (const key in query) {
                    query[key] = "";
                }
                query.page = 1;
            }
        }
        /*Load More*/

        /*Page mặc định vừa vào là 1*/
        let page_history = 1;
        if (typeof content_history !== "undefined") {
            content_history.on("scroll", function () {
                let end =
                    parseInt($(this).prop("scrollHeight")) -
                    parseInt($(this).outerHeight());
                /*nếu như lăn tới cuối cùng của bảng*/
                if (parseInt($(this).scrollTop()) >= end) {
                    page_history++;
                    query.page = page_history;
                    history_see_more = true;
                    /*nếu không phải là trang cuối thì mới load*/
                    if (!is_last_page) {
                        loadDataApi(query);
                    }
                }
            });
            /*Pagination Ajax*/
            content_history.on("click", ".page-link", function (e) {
                e.preventDefault();
                let url = new URL($(this).attr("href"));
                let url_current = window.location.href;
                query.page = url.searchParams.get("page");
                let new_url = updateQueryStringParameter(
                    url_current,
                    "page",
                    url.searchParams.get("page")
                );
                window.history.pushState({}, null, new_url);
                loadDataApi(query);
            });
        }

        /*Tìm kiếm*/
        let form_search_history = $(".form-search");
        if (form_search_history.length) {
            form_search_history.on("submit", function (e) {
                e.preventDefault();
                setParamsUrlToQuery();
                let input = $(this).find("input[type=search]");
                let query_key = input.attr("name");
                query[query_key] = input.val();
                loadDataApi(query);
            });
        }

        /*Sắp xếp theo ...*/
        $(".value-sort").on("click", ".selection", function (e) {
            e.preventDefault();
            query.sort_by_data = $(this).data("sort");
            query.page = 1;
            /*làm mới url*/
            let url_current = window.location.href;
            let new_url = updateQueryStringParameter(url_current, "page", 1);
            window.history.pushState({}, null, new_url);
            loadDataApi(query);
        });

        /*Sắp xếp theo... (mobile) */

        $(".selection-mobile").click(function (e) {
            e.preventDefault();
            query.sort_by_data = $(this).data("sort");
            query.page = 1;
            /*làm mới url*/
            let url_current = window.location.href;
            let new_url = updateQueryStringParameter(url_current, "page", 1);
            window.history.pushState({}, null, new_url);
            loadDataApi(query);
        });
    }
});
