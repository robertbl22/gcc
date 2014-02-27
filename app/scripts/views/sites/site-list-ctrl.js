'use strict';

var app = angular.module('gccApp')
.controller('SiteListCtrl', function ($scope, $routeParams, SitesSvc, ToastrSvc) {

	$scope.currentPath = '#/corridor/' + $routeParams.corridorId + '/county/' + $routeParams.countyId;

	/*SitesSvc.get($routeParams.countyId).success(function(data) {
		$scope.Properties = data.features;
	});*/

	SitesSvc.getByCountyId($routeParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
	}).catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});