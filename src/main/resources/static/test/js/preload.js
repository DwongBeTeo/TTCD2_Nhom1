/*convert 1 thành 01*/
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
/*convert số sang dạng k (1000 -> 1k) */
function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
}

/*Xử lý ảnh lỗi*/
function imgError(element){
    $(element).attr('src','/assets/frontend/theme_rito/image/trong/placeholder.jpg')
}
