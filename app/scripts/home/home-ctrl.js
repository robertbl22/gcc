'use strict';

angular.module('gccApp')
.controller('HomeCtrl', function ($scope, CorridorsSvc) {

	CorridorsSvc.get().success(function(data) {
		$scope.Corridors = data;
	});
	
});
