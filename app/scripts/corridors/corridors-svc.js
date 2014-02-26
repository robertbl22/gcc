'use strict';

angular.module('gccApp')
.factory('CorridorsSvc', function($http) {
	return {
		get: function(CorridorId) {
			if(CorridorId) {
				return $http.get('scripts/data/corridors/' + CorridorId + '.json', {cache: true});
			}
			else {
				return $http.get('scripts/data/corridors.json', {cache: true});
			}
		}
	};
});

