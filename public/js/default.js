$(document).ready(function() {
	initSource();
    setTimeout(gotoScrollTo, 1000);

    setInterval(function() {
        var doc = $(document);
        var off = doc.scrollTop();
        var el = $('.top');

        if (off > 300) {
            if (!el.is(':visible'))
                el.fadeIn(300);
        }
        else {
            if (el.is(':visible'))
                el.fadeOut(300);
        }

    }, 5000);

    $('.top').bind('click', function() {
        $(this).fadeOut(300);
    });
});

function initSource() {
	if ($('pre').length > 0) {
    	SyntaxHighlighter.defaults['toolbar'] = false;
	    SyntaxHighlighter.defaults['auto-links'] = false;
	    SyntaxHighlighter.all();
    }

    var url = window.location.pathname;
    if (url.substring(url.length - 1, url.length) !== '/')
    	url += '/';

    $('.menu').find('a[href="' + url + '"]').addClass('selected');
    $('.documentation-name').on('click', function() {
        window.location.href = '#' + this.id;
    });
}

function gotoScrollTo() {
    if (!window.location.hash)
        return;
    var el = $('[id="'+window.location.hash.substring(1)+'"');
    if (el.length > 0)
        $('html,body').animate({ scrollTop: el.offset().top }, 300);
}