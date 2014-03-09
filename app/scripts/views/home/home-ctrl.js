'use strict';

angular.module('gccApp')
.controller('HomeCtrl', function ($scope, DataService, CorridorHighlightSvc) {

	DataService.corridor.getAll().success(function(data) {
		$scope.Corridors = data;
	});

	$scope.highlightCorridor = function(corridorId) {CorridorHighlightSvc.highlightCorridor(corridorId);};
	
});
