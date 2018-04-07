exports.install = function() {
	ROUTE('/', redirect);
};

function redirect() {
	this.redirect('/latest/en.html');
}