'use strict';

var app = angular.module('gccApp')
.controller('CountyCtrl', function ($scope, $routeParams, LocalDataSvc, sgCountiesSvc) {

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


	LocalDataSvc.Counties.get($scope.countyId).success(function(county) {
		$scope.county = county;

		/* SelectGeorgia data */
		sgCountiesSvc.get(county.name)
		.then(function(data){
			$scope.county.attributes = data.features[0].attributes;
			$scope.fieldAliases = data.fieldAliases;
		}).catch(function(e){
			ToastrSvc.error('Sorry, there was an error while loading the data.');
		});

	});

	/*AggregatedCountySvc.get($scope.countyId).success(function(data) {
		$scope.county.attributes = data;
	});*/

	/*GPPropertiesCountSvc.get($scope.countyId).then(function(data) {
		$scope.propertiesCount = data;		
	});*/

});


