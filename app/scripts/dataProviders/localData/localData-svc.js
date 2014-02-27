'use strict';

var app = angular.module('gccApp')
.factory('LocalDataSvc', function(CorridorsSvc, CountiesSvc) {
	return {
		Corridors: CorridorsSvc,
		Counties: CountiesSvc
	};
});
