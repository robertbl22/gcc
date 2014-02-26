'use strict';

var app = angular.module('gccApp')
.controller('CountyCtrl', function ($scope, $routeParams, AggregatedCountySvc, GPPropertiesCountSvc) {

	var currentTab = 'overview';
	$scope.tabset = {};
	$scope.corridorBtns = {};
	$scope.County = {};
	$scope.County.offices = {};
	$scope.County.corridorId = $routeParams.corridorId;

	$scope.countyId = $routeParams.countyId;

	$scope.tabset.isActive = function(tabId) {
		return tabId === currentTab;
	};

	$scope.tabset.isEmpty = function(itemCount) {
		return itemCount < 1;
	};

	$scope.tabset.setActive = function(tabId) {
		currentTab = tabId;
	};

	AggregatedCountySvc.get($routeParams.countyId).success(function(data) {
		$scope.County.attributes = data;
	});

	GPPropertiesCountSvc.get($routeParams.countyId).then(function(data) {
		$scope.County.propertiesCount = data;		
	});

});


