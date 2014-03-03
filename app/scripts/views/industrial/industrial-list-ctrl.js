'use strict';

var app = angular.module('gccApp')
.controller('IndustrialListCtrl', function ($scope, $stateParams, IndustrialSvc) {

	$scope.currentPath = '#/corridor/' + $stateParams.corridorId + '/county/' + $stateParams.countyId;

	IndustrialSvc.getByCountyId($stateParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
	})
	.catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});