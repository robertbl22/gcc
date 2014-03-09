'use strict';

var app = angular.module('gccApp')
.controller('SiteListCtrl', function ($scope, $stateParams, DataService, ToastrSvc) {

	DataService.site.getByCounty($stateParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
	})
	['catch'](function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});