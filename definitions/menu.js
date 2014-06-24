framework.on('controller', function(self, name) {
	self.repository.menu = self.module('docs').list('latest');
	self.repository.menuAdditional = self.module('docs').list('latest', 'Additional');
	self.repository.menuPrototypes = self.module('docs').list('latest', 'Prototypes');
	self.repository.menuBuilders = self.module('docs').list('latest', 'Builders');
	self.repository.menuGlobals = self.module('docs').list('latest', 'Globals');
});