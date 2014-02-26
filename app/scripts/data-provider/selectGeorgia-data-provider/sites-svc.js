'use strict';

var app = angular.module('gccApp');

app.factory('SitesSvc', function(PropertySvc) {
	return {
		get: function(CountyId) {
			return PropertySvc.get('Site', CountyId, 'CountyId');
		}
	};
});

app.factory('SiteSvc', function(PropertySvc) {
	return {
		get: function(PropertyId) {
			return PropertySvc.get('Site', PropertyId, 'PropertyId');
		}
	};
});