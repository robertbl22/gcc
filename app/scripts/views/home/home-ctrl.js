'use strict';

angular.module('gccApp')
.controller('HomeCtrl', function ($scope, LocalDataProvider_CorridorsSvc) {

	LocalDataProvider_CorridorsSvc.get().success(function(data) {
		$scope.Corridors = data;
	});
	
});
