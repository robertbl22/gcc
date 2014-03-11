'use strict';

var app = angular.module('gccApp')
.controller('CountyShellCtrl', function ($scope, $rootScope, $stateParams, DataService) {

	$rootScope.scrollTop();

	$scope.corridorId = $stateParams.corridorId;
	$scope.countyId = $stateParams.countyId;

	DataService.county.getOverview($scope.countyId).success(function(county) {
		$scope.county = county;
	});

});


