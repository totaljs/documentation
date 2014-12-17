exports.install = function(framework) {
    framework.route('/', redirect);
};

function redirect() {
    this.redirect('/v' + CONFIG('version') + '/en.html');
}