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
}

function gotoScrollTo() {
    if (!window.location.hash)
        return;
    $('html,body').animate({ scrollTop: $('[id="'+window.location.hash.substring(1)+'"').offset().top }, 300);
}