'use strict';

var app = angular.module('gccApp')
.controller('CountyShellCtrl', function ($scope, $stateParams, DataService) {

	$scope.corridorId = $stateParams.corridorId;
	$scope.countyId = $stateParams.countyId;

	DataService.county.getOverview($scope.countyId).success(function(county) {
		$scope.county = county;
	});

});


