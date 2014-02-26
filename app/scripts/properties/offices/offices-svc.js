'use strict';

var app = angular.module('gccApp');

app.factory('OfficesSvc', function(PropertySvc) {
	return {
		get: function(CountyId) {
			return PropertySvc.get('Office', CountyId, 'CountyId');
		}
	};
});

app.factory('OfficeSvc', function(PropertySvc) {
	return {
		get: function(PropertyId) {
			return PropertySvc.get('Office', PropertyId, 'PropertyId');
		}
	};
});