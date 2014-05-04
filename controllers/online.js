exports.install = function(framework) {

    framework.route('/stats/', view_stats);
    framework.route('/stats/', xhr_stats, ['xhr', 'post']);

    var module = framework.module('online');

    module.allowXHR = false;
    module.allowIP = true;

    module.onValid = function(req) {
        return req.path[0] !== 'stats';
    };

};

/*
    Description: Online statistics
    Output: view
    Method: GET
*/
function view_stats() {
	var self = this;
	var online = self.module('online');

    var model = online.today;
    var now = new Date();

    model.year = now.getFullYear();
    model.pages = model.hits > 0 && model.count > 0 ? (model.hits / model.count).floor(2) : 0;

    if (model.last !== null)
        model.last = Math.floor((now.getTime() - model.last.getTime()) / 60000);

    self.framework.stats.request.get--;
    self.framework.stats.response.view--;

    online.monthly(function(data) {
        model.monthly = data;
        self.view('~online', model);
    });
}

/*
    Description: Get current statistics
    Output: JSON
    Method: POST (XHR)
*/
function xhr_stats() {
    var self = this;
    var module = self.module('online');
    var stats = module.today;
    var now = new Date();

    stats.online = module.online;
    stats.ip = module.ip;
    stats.pages = stats.hits > 0 && stats.count > 0 ? (stats.hits / stats.count).floor(2) : 0;

    if (stats.last !== null)
        stats.last = Math.floor((now.getTime() - stats.last.getTime()) / 60000);

    self.framework.stats.request.post--;
    self.framework.stats.request.xhr--;
    self.framework.stats.response.json--;

    self.json(stats);
}