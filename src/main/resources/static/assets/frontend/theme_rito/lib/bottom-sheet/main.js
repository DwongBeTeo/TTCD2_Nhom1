// let openSheetButton = $(".open-sheet");
let sheetHeight,sheet,sheetContents,draggableArea;

function sheetInit(selector) {
    sheet = $(selector);
    sheetContents = sheet.find(".content-bottom-sheet");
    draggableArea = sheet.find('.sheet-header');
    /* Ẩn sheet khi bấm vào lớp nền mờ*/
    sheet.find(".close,.layer").on("click", function (){
        closeSheet();
    });
    sheet.find(".close-sheet,.layer").on("click", function (){
        closeSheet();
    });
}
function setSheetHeight(value) {
    sheetHeight = Math.max(0, Math.min(100, value));
    typeof sheetContents !== 'undefined' ? sheetContents.css('height',`${sheetHeight}vh`) : '';
}
/*Set trạng thái của sheet */
function setIsSheetShown(value) {
    $('body').toggleClass('overflow-hidden', value);
    sheet.attr("aria-hidden", String(!value));
}
function closeSheet() {
    setSheetHeight(0);
    setTimeout(function () {
        setIsSheetShown(false);
    },200);
}
/*Mở sheet khi bấm vào nút '.open-sheet' , chỉ mở khi trên mobile*/
if (width < 992){
    $(document).on('click', '.open-sheet', function (e){
        /*Chặn tất cả sự kiện lại nhỡ click là thẻ 'a' hay là mở modal*/
        e.preventDefault();
        e.stopPropagation();

        /*Nếu là có cùng modal trên nút bấm thì lấy data-target_2 làm target để show sheet lên*/
        if ($(this).attr('data-toggle') && $(this).data('toggle') === 'modal') {
            sheetInit($(this).data('target_2'));
        }
        else {
            sheetInit($(this).data('target'));
        }
        setSheetHeight(sheet.data('height') * 1);
        setIsSheetShown(true);
        draggableArea.on("mousedown", onDragStart);
        draggableArea.on("touchstart", onDragStart);
    });
}

const touchPosition = (event) => event.touches ? event.touches[0] : event;

let dragPosition;

function onDragStart(event) {
    dragPosition = touchPosition(event).pageY
    sheetContents.addClass("not-selectable")
    draggableArea.css('cursor','grabbing');
    document.body.style.cursor = "grabbing";
}

function onDragMove(event) {
    const y = touchPosition(event).pageY;
    const deltaY = dragPosition - y;
    const deltaHeight = deltaY / window.innerHeight * 100;

    setSheetHeight(sheetHeight + deltaHeight);
    dragPosition = y;
}

function onDragEnd () {
    dragPosition = undefined;
    if (sheetContents === undefined || draggableArea === undefined) return;
    sheetContents.removeClass("not-selectable");
    draggableArea.css('cursor','');
    document.body.style.cursor = "";

    if (sheetHeight < 25) {
        setIsSheetShown(false);
    }
    else {
        setSheetHeight(Math.ceil(sheetHeight/5)*5);
    }
}

window.addEventListener("mousemove", onDragMove);
window.addEventListener("touchmove", onDragMove);

window.addEventListener("mouseup", onDragEnd);
window.addEventListener("touchend", onDragEnd);
