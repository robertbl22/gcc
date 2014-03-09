'use strict';

var app = angular.module('gccApp')
.controller('IndustrialListCtrl', function ($scope, $stateParams, DataService) {

	DataService.industrial.getByCounty($stateParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
	})
	['catch'](function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});