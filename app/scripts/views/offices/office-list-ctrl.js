'use strict';

var app = angular.module('gccApp')
.controller('OfficeListCtrl', function ($scope, $routeParams, OfficesSvc) {

	$scope.currentPath = '#/corridor/' + $routeParams.corridorId + '/county/' + $routeParams.countyId;

	/*OfficesSvc.get($routeParams.countyId).success(function(data) {
		$scope.Properties = data.features;
	});*/

	OfficesSvc.getByCounty($routeParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
	}).catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});