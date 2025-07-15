function handleTocPosition() {
    let tocHtml = '<div id="toctoc" class="toc-container d-none"></div>';
    $(tocHtml).insertBefore( $(".accounts_content h2").first());
}

$('#viewMore').on('shown.bs.modal', function (e) {
    $('#viewMore').find('.data-content').toggleClass('accounts_content',true);
    handleTocPosition();
    if ( $(".accounts_content h2").length >=2 ) {
        $.toctoc( {
            opened: false,
            target: '.accounts_content',
            smooth: true,
            headText: 'Mục lục',
            headLinkText: ['<i class="fas fa-expand-arrows-alt"></i>', '<i class="fas fa-compress-arrows-alt"></i>'],
            headBackgroundColor: 'transparent',
        });
    }
})
