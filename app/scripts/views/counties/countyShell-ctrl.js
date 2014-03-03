'use strict';

var app = angular.module('gccApp')
.controller('CountyShellCtrl', function ($scope, $stateParams, LocalDataSvc) {

	$scope.corridorId = $stateParams.corridorId;
	$scope.countyId = $stateParams.countyId;

	LocalDataSvc.Counties.get($scope.countyId).success(function(county) {
		$scope.county = county;
	});

});


