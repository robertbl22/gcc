'use strict';

angular.module('gccApp')
.factory('LocalData_CorridorsSvc', function($http) {
	return {
		getOverview: function(CorridorId) {
			return $http.get('scripts/data/corridors/' + CorridorId + '.json', {cache: true});
		},
		getAll: function() {
			return $http.get('scripts/data/corridors.json', {cache: true});
		}
	};
});

