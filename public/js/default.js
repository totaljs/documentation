$(document).ready(function() {
	initSource();
    setTimeout(gotoScrollTo, 1000);
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