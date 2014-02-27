'use strict';

var app = angular.module('gccApp')
.factory('CountiesSvc', function($http) {
	return {
		get: function(CountyId) {
			if(CountyId) {
				return $http.get('scripts/data/counties/' + CountyId + '.json', {cache: true});
			}
			else {
				return $http.get('scripts/data/counties.json', {cache: true});
			}
		}
	};
});
