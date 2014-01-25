framework.partial(function(next) {	
	var self = this;
	self.repository.menu = self.module('docs').list('latest');
	self.repository.menuAdditional = self.module('docs').list('latest', 'Additional');
	self.repository.menuPrototypes = self.module('docs').list('latest', 'Prototypes');
	self.repository.menuBuilders = self.module('docs').list('latest', 'Builders');
	next();	
});