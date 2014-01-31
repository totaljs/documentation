exports.install = function(framework) {    
    framework.route('/', view_homepage);
    framework.route('/configuration/', view_configuration);
    framework.route('/did-you-know/', view_didyouknow);
    framework.route('/directory/', view_directory);
    framework.route('/how-does-it-work/{name}/', view_howdoesitworks);
    framework.route('/search/', view_search);
    framework.route('/tutorial/', view_tutorial);
    framework.route('/videos/', view_videos);
    framework.route('/{name}/', view_documentation);
    framework.route('/internal/reindex/', empty_internal_reindex);
};

/*
    Description: Homepage
    Output: view
    Method: GET
*/
function view_homepage() {
    var self = this;
    self.view('homepage');
}

/*
    Description: Configuration
    Output: view
    Method: GET
*/
function view_configuration() {
    var self = this;
    self.view('configuration');
}

/*
    Description: Did you know?
    Output: view
    Method: GET
*/
function view_didyouknow() {
    var self = this;
    self.view('didyouknow');
}

/*
    Description: Directories
    Output: view
    Method: GET
*/
function view_directory() {
    var self = this;
    self.view('directory');
}

/*
    Description: How does it works?
    Output: view
    Method: GET
*/
function view_howdoesitworks(name) {
    var self = this;
    switch (name) {
        case 'authorization':
        case 'components':
        case 'controllers':
        case 'definitions':
        case 'html-css-js':
        case 'models':
        case 'modules':
        case 'resources':
        case 'security':
        case 'templates':
        case 'validation':
        case 'views':
            self.view('how-it-works-' + name);
            return;        
    }

    self.view404();
}

/*
    Description: Search results
    Output: view
    Method: GET
*/
function view_search() {
    var self = this;
    self.fulltext('documentation').find(self.get.q, {}, function(count, docs) {

        var length = docs.length;
        for (var i = 0; i < length; i++)
            docs[i].document.url = self.host(docs[i].document.url);

        self.view('search', docs);
    });
}

/*
    Description: Tutorial
    Output: view
    Method: GET
*/
function view_tutorial() {
    var self = this;
    self.view('tutorial');
}

/*
    Description: Videos on YouTube.com
    Output: view
    Method: GET
*/
function view_videos() {
    var self = this;
    self.view('videos');
}

/*
    Description: Documetantion according to documentation.json
    Output: view
    Method: GET
*/
function view_documentation(name) {
    var self = this;
    var model = self.module('docs').render('', name);

    if (model === null) {
        self.view404();
        return;
    }

    self.meta(name);
    self.view('dynamic', model);
}

/*
    Description: ReIndex FullText search
    Output: empty
    Method: GET
*/
function empty_internal_reindex() {
    var self = this;
    var fulltext = self.fulltext('documentation');

    var docs = self.module('docs').load();
    var md = self.module('md');
    var db = [];

    var add = function(obj, property) {

        var name = property.name;
        var params = [];

        if (property.params) {
            property.params.forEach(function(param) {
                if (param.options && param.options.indexOf('optional') !== -1)
                    params.push('[' + param.name + ']');
                else
                    params.push(param.name);
            });

            var beg = '(';
            var end = '';
            
            var last = name[name.length - 1];
            if (last === '}') {
                end = '}';
                name = name.substring(0, name.length - 1);
            } else if (last === ')') {
                beg = '';
                name = name.substring(0, name.length - 1) + (params.length > 0 ? ', ' : '');
            }

            name = name + beg + params.join(', ') + ')' + end;
        }

        db.push({ search: obj.name + ' ' + property.name + ' ' + property.description, doc: { url: '/' + obj.name + '/#' + property.name.replace(/\{|\}|\@/g, ''), description: property.description.encode().replace('\n', '<br />'), name: name, path: obj.name }});
    };

    var addheader = function(obj) {
        var description = obj.description || '';
        db.push({ search: obj.name + ' ' + description, doc: { url: '/' + obj.name + '/', description: md.prepare(description), name: obj.name, path: obj.name }});
    };

    docs.children.forEach(function(obj) {

        var methods = obj['methods'];
        var delegates = obj['delegates'];
        var properties = obj['properties'];
        var events = obj['events'];

        addheader(obj);

        if (properties) {
            properties.forEach(function(property) {
                add(obj, property);
            });
        }

        if (delegates) {
            delegates.forEach(function(property) {
                add(obj, property);
            });
        }

        if (methods) {
            methods.forEach(function(property) {
                add(obj, property);
            });
        }

        if (events) {
            events.forEach(function(property) {
                add(obj, property);
            });
        }
    });

    fulltext.drop(function(err) {
        db.waiting(function(item, next) {
            fulltext.add(item.search, item.doc, function() {
                setTimeout(next, 50);
            });
        });
    });

    self.empty();
}