exports.install = function() {
	ROUTE('/', redirect);
};

function redirect() {
	this.redirect('/v{0}/en.html'.format(F.config.version));
}