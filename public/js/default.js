$(document).ready(function() {
	initSource();
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