'use strict';

var app = angular.module('gccApp')
.controller('SiteListCtrl', function ($scope, $stateParams, SitesSvc, ToastrSvc) {

	$scope.currentPath = '#/corridor/' + $stateParams.corridorId + '/county/' + $stateParams.countyId;

	/*SitesSvc.get($stateParams.countyId).success(function(data) {
		$scope.Properties = data.features;
	});*/

	SitesSvc.getByCountyId($stateParams.countyId)
	.then(function(data){
		$scope.Properties = data.features;
	}).catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});