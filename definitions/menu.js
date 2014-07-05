<<<<<<< HEAD
framework.on('controller', function(self) {
	self.repository.menu = MODULE('docs').list('latest');
	self.repository.menuAdditional = MODULE('docs').list('latest', 'Additional');
	self.repository.menuPrototypes = MODULE('docs').list('latest', 'Prototypes');
	self.repository.menuBuilders = MODULE('docs').list('latest', 'Builders');
	self.repository.menuGlobals = MODULE('docs').list('latest', 'Globals');
=======
framework.on('controller', function(self, name) {
	self.repository.menu = self.module('docs').list('latest');
	self.repository.menuAdditional = self.module('docs').list('latest', 'Additional');
	self.repository.menuPrototypes = self.module('docs').list('latest', 'Prototypes');
	self.repository.menuBuilders = self.module('docs').list('latest', 'Builders');
	self.repository.menuGlobals = self.module('docs').list('latest', 'Globals');
>>>>>>> FETCH_HEAD
});