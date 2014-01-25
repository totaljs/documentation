exports.prepare = function load(text) {

	var self = this;
	var markdown = framework.module('markdown').init();

	markdown.onTitle = function(type, value) {

		switch (type) {
			case '#':
				return '<h1>{0}</h1>'.format(value);
			case '##':
				return '<h2 class="nmb">{0}</h2>'.format(value);
			case '###':
				return '<h3 class="nmb">{0}</h3>'.format(value);
			case '*':
			case '-':
				return '<div class="bb">&nbsp;</div>';
		};

		if (value === '\n')
			return '<br />';

		return '<div>{0}</div>'.format(value);
	};

	markdown.onEmbedded = function(type, value) {

		switch (type) {
			case 'javascript':
				return '<pre class="brush: jscript">{0}</pre>'.format(value.join('\n').encode());
			case 'html':
				return '<pre class="brush: xml">{0}</pre>'.format(value.join('\n').encode());
			case 'plain':
				return '<pre class="brush: plain">{0}</pre>'.format(value.join('\n').encode());
			case 'embed':
				return value.join('');
		}
		return '';
	};

	markdown.onParagraph = function(type, value) {
		switch (type) {
			case '>':
				return '<p>{0}</p>'.format(value.join('<br />'));
			case '|':
				return '<div class="documentation-stability">{0}</div>'.format(value.join('<br />'));
		}
		return '';
	}

	markdown.onLine = function(line) {
		return '<p>' + line + '</p>';
	};

	markdown.onList = function(ul) {

		var builder = [];
		builder.push('<ul class="documentation-ul">');

		ul.forEach(function(o) {
			builder.push('<li>{0}</li>'.format(o.value).indent(4));
		});

		builder.push('</ul>');

		return builder.join('\n');
	};

	markdown.onLink = function(name, url) {
		return '<a href="{0}" class="link">{1}</a>'.format(url.indexOf('http') === -1 ? 'http://' + url : url, name);
	};

	markdown.onFormat = function(type, value) {

		switch (type) {
			case '__':
				return '<strong>{0}</strong>'.format(value);
			case '_':
				return '<b>{0}</b>'.format(value);
			case '**':
				return '<em>{0}</em>'.format(value);
			case '*':
				return '<i>{0}</i>'.format(value);
		};

		return '';
	};

	markdown.onImage = function(alt, url, width, height) {
		return '<div class="image"><img src="{0}" width="{1}" height="{2}" alt="{3}" /><div>{3}</div></div>'.format(url, width, height, alt);
	};

	markdown.onKeyword = function(type, name) {
		switch (type) {
			case '[]':
				return '<span>{0}</span>'.format(name);
			case '{}':
				return '<span class="documentation-optional">{0}</span>'.format(name);
		}

		return '';
	};

	return markdown.load(text);
}