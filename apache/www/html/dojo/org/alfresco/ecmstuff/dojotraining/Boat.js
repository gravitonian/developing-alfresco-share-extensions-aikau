define([
		// Any dependencies required by this module goes here
		'dojo/_base/declare'
	], function(declare) {
		// Once all modules in the dependency list have loaded, this
		// function is called to define the   
		// com/marversolutions/ecmstuff/dojotraining/Boat module.
 
		// This returned object becomes the defined value of this module
		return declare(null, {
			name: '',
			currentSpeed: 0,
			constructor: function(name) {
				this.name = name;
			},
			accelerate: function(increment) {
				this.currentSpeed += increment;
			}
		});
});
