(function($) {
    $.toctoc = function(options) {
  
      // 🎛️ SETTINGS
      var settings = $.extend({
        headBackgroundColor: '#1c1c1c',
        headTextColor: '#fff',
        headLinkColor: '#add8e6',
        bodyBackgroundColor: '#f5f5f5',
        bodyLinkColor: '#000',
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: '2px',
        headText: 'Table of contents',
        headLinkText: ['show', 'close'],
        opened: false,
        target: 'body',
        smooth: true
      }, options);
      
      // 🎯 DOM ITEMS
      const toc = $('#toctoc');
      const tocHead = $("<div></div>").attr("id", "toctoc-head");
      const tocHeadToggler = $("<a class='toc-toggle'></a>").attr("href", "#");
      const tocHeadText = $("<span class='toc-header'></span>").text(settings.headText);
      const tocBody = $("<div></div>").attr("id", "toctoc-body");
  
      // ▶️ INITIALISATION
      init();
      function init() {
        tocHead.append(tocHeadText).append(tocHeadToggler);
        let titles = settings.target + " h2, " + settings.target + " h3, " + settings.target + " h4";
        $(titles).each(function(i) {
          let tag = $(this).prop('tagName').toLowerCase();
          let content = $(this).text();
          let anchor = 'toctoc-' + (i + 1);
          $(this).attr('id', anchor);
          tocBody.append("<a href='#"+anchor+"'><p class='link link-"+tag+"'>"+content+"</p></a>");
        });
        toc.append(
          tocHead.css({
            'background-color': settings.headBackgroundColor,
            'color': settings.headTextColor
          })
        ).append(tocBody);
        tocHeadToggler.css({'color': settings.headLinkColor});
        if (settings.smooth) {
          let anchors = toc.find('a[href^="#toctoc"]');
          $.each(anchors, function (index, anchor) { 
            $(anchor).on('click', function (e) {
              e.preventDefault();
              let attrValue = $(this).attr('href');
              document.querySelector(attrValue).scrollIntoView({
                behavior: 'smooth'
              });
             });
          });
        }
        loadVisibility();
        toc.removeClass('d-none');
      }
  
      // 👀 EVENT LISTENER (click)
      tocHeadToggler.on('click', (e) => {
        e.preventDefault();
        toggleVisibility();
      });
  
      // ⚙️ TOGGLE VISIBILITY
      function toggleVisibility() { 
        settings.opened ? settings.opened = false : settings.opened = true;
        loadVisibility();
      }
  
      // ⚙️ LOAD VISIBILITY
      function loadVisibility() { 
        let containerBlockWidth = $(settings.target).width() - 20;
        if (settings.opened) {
          tocHeadToggler.html(`<label>${settings.headLinkText[1]}</label>`);
          tocBody.find('a').css("whiteSpace", "nowrap");
          tocBody.css({ "position": "absolute", "visibility": "hidden", "display" : "block", "maxWidth": `${containerBlockWidth}px`});
          let tocBodyWidth = tocBody.width();
          let tocBodyHeight = tocBody.height();
          tocBody.css({ "position": "relative", "visibility": "visible", "display" : "block", "width" : "0", "height": "0" });
          tocBody.animate({ width: `${tocBodyWidth}px`, height: `${tocBodyHeight}px`}, 300, function () {
            tocBody.find('a').attr('style', '');
            tocBody.attr('style', '');
          });
        } else {
          tocHeadToggler.html(`<label>${settings.headLinkText[0]}</label>`);
          tocBody.find('a').css("whiteSpace", "nowrap");
          tocBody.css({"maxWidth": `${containerBlockWidth}px`});
          tocBody.animate({ width: '0', height: '0'}, 300, function() {
            tocBody.find('a').attr('style', '');
            tocBody.attr('style', '');
            tocBody.css({"display" : "none"});
          });
        }
      }
      
    };
  })(jQuery);