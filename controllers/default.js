exports.install = function() {
    F.route('/', redirect);
};

function redirect() {
    this.redirect('/latest/en.html');
}