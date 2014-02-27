'use strict';

var app = angular.module('gccApp');

app.factory('IndustrialsSvc', function(PropertySvc) {
	return {
		get: function(CountyId) {
			return PropertySvc.get('Industrial', CountyId, 'CountyId');
		}
	};
});

app.factory('IndustrialSvc', function(PropertySvc) {
	return {
		get: function(PropertyId) {
			return PropertySvc.get('Industrial', PropertyId, 'PropertyId');
		}
	};
});