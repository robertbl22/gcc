'use strict';

angular.module('gccApp')
.controller('HomeCtrl', function ($scope, DataService) {

	DataService.corridor.getAll().success(function(data) {
		$scope.Corridors = data;
	});
	
});
