'use strict';

angular.module('gccApp')
.controller('HomeCtrl', function ($scope, LocalDataSvc) {

	LocalDataSvc.Corridors.get().success(function(data) {
		$scope.Corridors = data;
	});
	
});
