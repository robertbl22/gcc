'use strict';

var app = angular.module('gccApp')
.controller('SiteDetailCtrl', function ($scope, $routeParams, CountiesSvc, BreadcrumbSvc, SelectGeorgiaSvc, ToastrSvc) {

	var propertyId = $routeParams.propertyId;
	$scope.detailsTab = 'map';
	$scope.currentPath = '#/corridor/' + $routeParams.corridorId + '/county/' + $routeParams.countyId;

	/* Local data for "corridors-indicator" */
	CountiesSvc.get($routeParams.countyId).success(function(data) {
		$scope.county = data;
		$scope.county.corridorId = $routeParams.corridorId;
	});

	/* SelectGeorgia data */
	SelectGeorgiaSvc.site.get(propertyId)
	.then(function(data){
		$scope.property = data.features[0].attributes;
		$scope.geometry = data.features[0].geometry[0];
		$scope.fieldAliases = data.fieldAliases;
	}).catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	})

	/* "Return" link */
	$scope.previousPath = BreadcrumbSvc.previousPath;
	$scope.hasPreviousPath = function() {
		if(BreadcrumbSvc.previousPath === BreadcrumbSvc.currentPath) {
			return false;
		}
		return true;
	};
	
});