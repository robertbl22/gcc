'use strict';

var app = angular.module('gccApp')
.controller('OfficeListCtrl', function ($scope, $stateParams, OfficesSvc) {

	$scope.currentPath = '#/corridor/' + $stateParams.corridorId + '/county/' + $stateParams.countyId;

	/*OfficesSvc.get($stateParams.countyId).success(function(data) {
		$scope.Properties = data.features;
	});*/

	OfficesSvc.getByCountyId($stateParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
		console.log('$scope.Properties',$scope.Properties)
	}).catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});