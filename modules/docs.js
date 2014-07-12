exports.render = function(version, name) {

	var documentation = exports.load();

	var doc = documentation.children.find(function(item) {
		return item.name === name;
	});

	var output = {};

	if (doc === null)
		return null;

	output.description = doc.description || '';

	if (output.description.length > 0)
		output.description = framework.module('md').prepare(output.description);

	if (doc.properties)
		output.properties = render_children(doc.properties, false, version, 'properties');

	if (doc.methods)
		output.methods = render_children(doc.methods, false, version, 'methods');

	if (doc.events)
		output.events = render_children(doc.events, true, version, 'events');

	if (doc.delegates)
		output.delegates = render_children(doc.delegates, false, version, 'delegates');

	return output;
}

exports.list = function(version, group) {

	var builder = [];

	exports.load().children.forEach(function(item) {
		if (item.group === group)
			builder.push({ name: item.name, url: '/' + item.name + '/' });
	});

	return builder;
}

exports.load = function() {
	var documentation = framework.cache.read('docs');

	if (documentation === null)
		documentation = framework.cache.add('docs', JSON.parse(require('fs').readFileSync(framework.path.public('/download/documentation.json'), 'utf8').toString('utf8')));

	return documentation;
};

function naturalSorter(as, bs){
    var a, b, a1, b1, i= 0, n, L,
    rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
    if(as.name === bs.name) return 0;
    a= as.name.toLowerCase().match(rx);
    b= bs.name.toLowerCase().match(rx);
    L= a.length;
    while(i<L){
        if(!b[i]) return 1;
        a1= a[i],
        b1= b[i++];
        if(a1!== b1){
            n= a1-b1;
            if(!isNaN(n)) return n;
            return a1>b1? 1:-1;
        }
    }
    return b[i]? -1:0;
}

function render_children(arr, events, version, id) {

	var builder = [];
	var list = [];

	arr.sort(naturalSorter);

	arr.forEach(function(item) {

		var str = '';
		var params = [];

		if (item.options && item.options.length > 0) {

			str += '<div class="documentation-options">';

			item.options.forEach(function(option) {
				str += '<span' + (option === 'internal' ? ' class="doc-internal"' : option === 'important' ? ' class="doc-important"' : '') + '>' + option + '</span>';
			});

			str += '</div>';
		}

		var ap = '';
		var name = item.name;

		if (item.params) {

			if (name[name.length - 1] === '}') {
				name = name.substring(0, name.length - 1);
				ap = '}';
			}

			if (item.params.length > 0) {
				str += '<ul class="documentation-param">'

				item.params.forEach(function(param) {

					var options = '';
					var def = '';

					if (param.options) {

						var optional = false;

						param.options.forEach(function(option) {
							options += '<span class="documentation-param-option">' + option + '</span>';
							if (option === 'optional')
								optional = true;
						});

						if (optional)
							params.push('[' + param.name + ']');
						else
							params.push(param.name);

					} else
						params.push(param.name);

					if (param['default'])
						def = '<span class="documentation-param-default">Default: ' + param['default'].encode() + '</span>';

					var sub = '';

					if (param.params) {
						sub = '<ul class="documentation-param2">';

						param.params.forEach(function(param) {

							var options = '';
							var def = '';

							if (param.options) {
								param.options.forEach(function(option) {
									options += '<span class="documentation-param-option">' + option + '</span>';
								});
							}

							if (param['default'])
								def = '<span class="documentation-param-default">Default: ' + param['default'].encode() + '</span>';

							sub += '<li><div>&bull; ' + param.name + ' <b>' + param.type + '</b></div>' + options + (param.description ? ' <span class="documentation-param-description">' + param.description + '</span>' : '') + def + '</li>';
						});

						sub += '</ul>';
					}

					str += '<li><div class="documentation-param-container"><div class="documentation-param-item">&bull; ' + param.name + (param.go ? ' <a href="/' + param.go + '/">' + param.type + '</a>' : ' <b>' + param.type + '</b>') + '</div>' + options + (param.description ? ' <span class="documentation-param-description">' + param.description + '</span>' : '') + def + '</div>' + sub + '</li>';

				});

				str += '</ul>';
			}

			if (params.length === 0)
				params.push('');

			str = '<div id="' + (ap.length > 0 ? name.substring(2) : name) + '" class="documentation-name"><span>' + (events ? name.substring(0, name.length - 1) + ', function' : name) + '(' + params.join(', ') + ')' + ap + (events ? ' {<em class="silver">&nbsp;&nbsp;&nbsp;&nbsp;// YOUR CODE HERE</em>})' : '') + ';</span>' + (item['default'] ? '<span class="high-code">Default: ' + item['default'].encode() + '</span>' : '') + '</div><div class="cl"></div>' + str;

		} else
			str = '<div id="' + (ap.length > 0 ? name.substring(2) : name) + '" class="documentation-name"><span>' + (events ? name.substring(0, name.length - 1) + ', function()' : name) + (events ? ' {<em class="silver">&nbsp;&nbsp;&nbsp;&nbsp;// YOUR CODE HERE</em>})' : '') + ';</span>' + (item['default'] ? '<span class="high-code">Default: ' + item['default'].encode() + '</span>' : '') + '</div><div class="cl"></div>' + str;

		if (item['return']) {
			if (item.go)
				str += '<div class="documentation-return">return <a href="/' + item.go + '/">' + item['return'] + '</a>;</div>';
			else
				str += '<div class="documentation-return">return <b>' + item['return'] + '</b>;</div>';
		}

		str += '<p class="documentation-description">' + item.description.encode().replace(/\s{5,}/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\n/g, '<br />') + '</p>';

		if (item.example)
			str += '<div class="documentation-example"><a href="' + item.example + '" target="_blank">example</a></div>';

		builder.push('<div class="documentation-container"><a href="#' + id + '" class="documentation-all"><span>&uarr;</span> List of all ' + id + '</a>' + str + '</div>');
		list.push('<a href="#' + (ap.length > 0 ? name.substring(2) : name) + '">' + (events && params.length > 0 ? name.substring(0, name.length - 1) + ', ' : name) + (params.length > 0 ? '<span>' + (events ? '' : '(') + params.join(', ') + ')' + '</span>' + ap : item['return'] ? ' <span class="documentation-type">{'+item['return']+'}</span>' : '') + '</a>');

	});

	return { docs: builder.join(''), list: list.join('') };
}