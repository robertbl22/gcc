'use strict';

var app = angular.module('gccApp')
.controller('CountyOverviewCtrl', function ($scope, $stateParams, DataService) {

	var countyId = $stateParams.countyId;

	/* The county overview is in $scope.$parent */
	
	/*$scope.county = {};
	DataService.county.getOverview($scope.countyId).success(function(county) {
		$scope.county.summary = county.summary;
	})
	.error(function() {
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});*/

	/* SelectGeorgia data */
	DataService.county.getDetail($scope.countyId)
	.then(function(data){
		$scope.countyAttributes = data.features[0].attributes;
		$scope.fieldAliases = data.fieldAliases;
	})
	['catch'](function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});

});