'use strict';

angular.module('gccApp')
.controller('CorridorCtrl', function ($scope, $stateParams, LocalDataSvc, CountyZoomSvc) {

	$scope.corridorId = $stateParams.corridorId;

	$scope.zoomToCounty = function(countyId) {
		CountyZoomSvc.zoom($scope.corridorId, countyId);
	};

	LocalDataSvc.Corridors.get($stateParams.corridorId).success(function(data) {
		$scope.Corridor = data;
	});

});
