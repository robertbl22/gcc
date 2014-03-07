'use strict';

var app = angular.module('gccApp')
.controller('IndustrialDetailCtrl', function ($scope, $stateParams, DataService, ToastrSvc) {

	$scope.corridorId = $stateParams.corridorId;
	$scope.countyId = $stateParams.countyId;
	var propertyId = $stateParams.propertyId;

	/* Local data for "corridors-indicator" */
	DataService.county.getOverview($stateParams.countyId).success(function(data) {
		$scope.county = data;
		$scope.county.corridorId = $stateParams.corridorId;
	})
	.error(function() {
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});

	/* SelectGeorgia data */
	DataService.industrial.getDetail(propertyId)
	.then(function(data){
		$scope.property = data.features[0].attributes;
		$scope.fieldAliases = data.fieldAliases;
	})
	.catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	})
	
});