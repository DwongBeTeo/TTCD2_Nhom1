$(document).ready(function () {
    var startX, endX;
    var threshold = 0; // Ngưỡng cuộn để xác định hướng
    var container = $("._7m5mUc");
    var element = $(".iyAYMg");
    var containerWidth = container.width();
    var elementWidth = element.width();
    var currentValue = 0; // Thêm biến để lưu trữ giá trị hiện tại của transform

    $(".IX71cF").on("touchstart", function (event) {
        startX = event.changedTouches[0].screenX;
    });

    $(".IX71cF").on("touchmove", function (event) {
        endX = event.changedTouches[0].screenX;
        var deltaX = endX - startX;

        if (deltaX > threshold) {
            moveLeft();
        } else if (deltaX < -threshold) {
            moveRight();
        }
    });
    var step = 0.1;
    function moveLeft() {
        if (currentValue > 0) {
            currentValue -= step;
            updateTransform();
        }
    }

    function moveRight() {
        if (currentValue < containerWidth - elementWidth) {
            currentValue += step;
            updateTransform();
        }
    }
    function updateTransform() {
        if (currentValue >= 0 && currentValue <= containerWidth - elementWidth) {
            element.css("transform", "translateX(" + currentValue + "px)");
        }
    }
});
