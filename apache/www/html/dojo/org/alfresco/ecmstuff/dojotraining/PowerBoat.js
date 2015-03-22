define([
		// Any dependencies required by this module goes here
		'dojo/_base/declare',
		'./Boat'
	], function(declare, Boat) {
		// Once all modules in the dependency list have loaded, this
		// function is called to define the   
		// com/marversolutions/ecmstuff/dojotraining/PowerBoat module.
 
		// This returned object becomes the defined value of this module
		return declare(Boat, {
			engineType: '',
			constructor: function(name) {
				this.name = name;
			},
			setEngineType: function(type) {
				this.engineType = type;
			}
		});
});
