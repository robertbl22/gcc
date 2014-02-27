'use strict';

var app = angular.module('gccApp')
.controller('CountyCtrl', function ($scope, $routeParams, LocalDataSvc, AggregatedCountySvc, GPPropertiesCountSvc) {

	$scope.county = {};
	$scope.corridorId = $routeParams.corridorId;
	$scope.countyId = $routeParams.countyId;


	/* Tab set stuff */
	var currentTab = 'overview';
	$scope.tabset = {};
	$scope.corridorBtns = {};
	$scope.tabset.isActive = function(tabId) {
		return tabId === currentTab;
	};
	$scope.tabset.isEmpty = function(itemCount) {
		return itemCount < 1;
	};
	$scope.tabset.setActive = function(tabId) {
		currentTab = tabId;
	};


	LocalDataSvc.Counties.get($scope.countyId).success(function(data) {
		$scope.county = data;
	});

	AggregatedCountySvc.get($scope.countyId).success(function(data) {
		$scope.county.attributes = data;
	});

	GPPropertiesCountSvc.get($scope.countyId).then(function(data) {
		$scope.propertiesCount = data;		
	});

});


