'use strict';

var app = angular.module('gccApp')
.controller('CountyCtrl', function ($scope, $stateParams, DataService) {

	$scope.county = {};
	$scope.corridorId = $stateParams.corridorId;
	$scope.countyId = $stateParams.countyId;
	

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


	DataService.county.getOverview($scope.countyId).success(function(county) {
		$scope.county = county;
	})
	.error(function() {
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});

	/* SelectGeorgia data */
	DataService.county.getDetail($scope.countyId)
	.then(function(data){
		$scope.county.attributes = data.features[0].attributes;
		$scope.fieldAliases = data.fieldAliases;
	})
	.catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});

	DataService.county.getPropertiesCount($scope.countyId)
	.then(function(data){
		$scope.propertiesCount = data;
	})
	.catch(function(e){
		$scope.propertiesCount = {offices:'?',industrial:'?',sites:'?'};
	});

});