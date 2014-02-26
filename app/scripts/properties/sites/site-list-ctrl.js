'use strict';

var app = angular.module('gccApp')
.controller('SiteListCtrl', function ($scope, $routeParams, SitesSvc) {

	$scope.currentPath = '#/corridor/' + $routeParams.corridorId + '/county/' + $routeParams.countyId;

	SitesSvc.get($routeParams.countyId).success(function(data) {
		$scope.Properties = data.features;
	});
	
});