function handleTocPosition() {
    let tocHtml = '<div id="toctoc" class="toc-container d-none"></div>';
    $(tocHtml).insertBefore( $(".article--content__text h2").first());
}

handleTocPosition();

$(document).ready(function() {
    var options = {
        opened: false,
        target: '.article--content__text',
        smooth: true,
        headText: 'Mục lục',
        headLinkText: ['<i class="fas fa-expand-arrows-alt"></i>', '<i class="fas fa-compress-arrows-alt"></i>'],
        headBackgroundColor: 'transparent',
    };

    if ( $(".article--content__text h2").length >=2 ) {
        $.toctoc(options);
    }
});

// var images = document.querySelectorAll(".image-action img");
// var count = 0;
// images.forEach(function(image,count) {
//     var link = document.createElement("button");
//     link.dataset.filename = image.src.split("/").pop();
//     // link.href = image.src;
//     link.dataset.href = image.src;
//     link.download = image.src.split("/").pop();
//     link.innerText = "Download Image";
//     let name = 'downloadImage' + count;
//     link.setAttribute("id", name);
//     link.setAttribute("class", 'downloadImage');
//     count += 1;
//     image.parentNode.insertBefore(link, image.nextSibling);
//
//     var div = document.createElement("div");
//     div.setAttribute("class", "show_img_info");
//     link.insertAdjacentElement("afterend", div);
//
//     var prvimage = new Image();
//     prvimage.src = image.src;
//     prvimage.onload = function() {
//         var width = this.naturalWidth;
//         var height = this.naturalHeight;
//
//         var filenameText = document.createElement("span");
//         filenameText.innerText = "Filename: " + link.dataset.filename;
//         div.appendChild(filenameText);
//
//         var br = document.createElement("br");
//         div.appendChild(br);
//
//         var infoText = document.createElement("span");
//         infoText.innerText = "Size: " + width + " x " + height;
//         div.appendChild(infoText);
//
//     };
//     // show kích thước ảnh
//     fetch(prvimage)
//         .then(response => response.blob())
//         .then(blob => {
//             var size = blob.size;
//             var formattedSize = formatFileSize(size);
//
//             var br2 = document.createElement("br");
//             div.appendChild(br2);
//
//             var sizeText = document.createElement("span");
//             sizeText.innerText = "FileSize: " + formattedSize;
//             div.appendChild(sizeText);
//
//         })
//         .catch(error => {
//             console.log("Error IMG: " + error);
//         });
//
//     image.setAttribute("alt", link.dataset.filename);
//
//     function formatFileSize(bytes) {
//         if (bytes < 1024) {
//             return bytes + ' bytes';
//         } else if (bytes < 1024 * 1024) {
//             return (bytes / 1024).toFixed(2) + ' KB';
//         } else {
//             return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
//         }
//     }
//
// });
//
//
//
// $('body').on('click', '.downloadImage', function(e) {
//     let index = $(this).data('id');
//     let name = 'downloadImage' + index;
//     let btn = document.getElementById(name);
//     let url = $(this).data('href');
//     let filename = $(this).data('filename');
//     e.preventDefault()
//     $.ajax({
//         type: "POST",
//         url: '/ajax/downloadimg',
//         data: {
//             _token: $('meta[name="csrf-token"]').attr('content'),
//             imageUrl: url,
//             filename: filename
//         },
//         xhrFields: {
//             responseType: 'blob' // Đặt kiểu dữ liệu là blob để nhận dữ liệu ảnh
//         },
//         success: function(response) {
//
//             var url = window.URL.createObjectURL(new Blob([response]));
//             // Tạo thẻ a ẩn để tải xuống ảnh
//             var link = document.createElement('a');
//             link.href = url;
//             link.download = 'image.jpg';
//             link.click();
//
//             // Giải phóng URL tải xuống
//             window.URL.revokeObjectURL(url);
//         },
//         error: function(xhr, status, error) {
//             // Xử lý lỗi (nếu có)
//         }
//     })
// });
