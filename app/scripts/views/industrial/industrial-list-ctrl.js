'use strict';

var app = angular.module('gccApp')
.controller('IndustrialListCtrl', function ($scope, $routeParams, IndustrialSvc) {

	$scope.currentPath = '#/corridor/' + $routeParams.corridorId + '/county/' + $routeParams.countyId;

	/*IndustrialsSvc.get($routeParams.countyId).success(function(data) {
		$scope.Properties = data.features;
	});*/

	IndustrialSvc.getByCounty($routeParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
	}).catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});