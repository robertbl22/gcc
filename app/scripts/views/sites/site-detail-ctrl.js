'use strict';

var app = angular.module('gccApp')
.controller('SiteDetailCtrl', function ($scope, $stateParams, DataService, BreadcrumbSvc, ToastrSvc) {

	$scope.corridorId = $stateParams.corridorId;
	$scope.countyId = $stateParams.countyId;
	var propertyId = $stateParams.propertyId;
	//$scope.detailsTab = 'map';

	/* Local data for "corridors-indicator" */
	DataService.county.getOverview($stateParams.countyId).success(function(data) {
		$scope.county = data;
		$scope.county.corridorId = $stateParams.corridorId;
	})
	.error(function() {
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});

	/* SelectGeorgia data */
	DataService.site.getDetail(propertyId)
	.then(function(data){
		$scope.property = data.features[0].attributes;
		$scope.geometry = data.features[0].geometry[0];
		$scope.fieldAliases = data.fieldAliases;
	})
	.catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});

	/* "Return" link */
	$scope.previousPath = BreadcrumbSvc.previousPath;
	$scope.hasPreviousPath = function() {
		if(BreadcrumbSvc.previousPath === BreadcrumbSvc.currentPath) {
			return false;
		}
		return true;
	};
	
});