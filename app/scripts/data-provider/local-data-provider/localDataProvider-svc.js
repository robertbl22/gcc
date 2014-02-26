'use strict';

var app = angular.module('gccApp')
.factory('LocalDataProvider', function(CorridorsSvc, CountiesSvc) {
	return {
		CorridorsSvc: CorridorsSvc,
		CountiesSvc: CountiesSvc
	};
});
