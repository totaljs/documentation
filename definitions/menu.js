framework.on('controller', function(self) {
	self.repository.menu = MODULE('docs').list('latest');
	self.repository.menuAdditional = MODULE('docs').list('latest', 'Additional');
	self.repository.menuPrototypes = MODULE('docs').list('latest', 'Prototypes');
	self.repository.menuBuilders = MODULE('docs').list('latest', 'Builders');
	self.repository.menuGlobals = MODULE('docs').list('latest', 'Globals');
});