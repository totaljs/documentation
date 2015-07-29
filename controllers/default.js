exports.install = function() {
    F.route('/', redirect);
};

function redirect() {
    this.redirect('/v' + CONFIG('version') + '/en.html');
}