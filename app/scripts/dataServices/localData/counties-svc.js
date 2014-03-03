'use strict';

var app = angular.module('gccApp')
.factory('LocalData_CountiesSvc', function($http) {
	return {
		getOverview: function(CountyId) {
			return $http.get('scripts/data/counties/' + CountyId + '.json', {cache: true});
		},
		getAll: function() {
			return $http.get('scripts/data/counties.json', {cache: true});
		}
	};
});
