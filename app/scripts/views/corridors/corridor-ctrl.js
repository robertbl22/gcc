'use strict';

angular.module('gccApp')
.controller('CorridorCtrl', function ($scope, $stateParams, DataService, CountyZoomSvc) {

	$scope.corridorId = $stateParams.corridorId;

	$scope.zoomToCounty = function(countyId) {
		CountyZoomSvc.zoom($scope.corridorId, countyId);
	};

	DataService.corridor.getOverview($stateParams.corridorId).success(function(data) {
		$scope.Corridor = data;
	});

});
