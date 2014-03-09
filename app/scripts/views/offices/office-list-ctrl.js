'use strict';

var app = angular.module('gccApp')
.controller('OfficeListCtrl', function ($scope, $stateParams, DataService) {

	DataService.office.getByCounty($stateParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
	})
	['catch'](function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});