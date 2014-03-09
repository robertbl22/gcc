'use strict';

var app = angular.module('gccApp')
.controller('CountyTabsCtrl', function ($scope, $stateParams, DataService) {

	var countyId = $stateParams.countyId;

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

	/* The county overview is in $scope.$parent */
	
	/*$scope.county = {};
	DataService.county.getOverview(countyId).success(function(county) {
		$scope.county = county;
	})
	.error(function() {
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});*/

	/* SelectGeorgia data */
	DataService.county.getPropertiesCount(countyId)
	.then(function(data){
		$scope.propertiesCount = data;
	})
	['catch'](function(e){
		$scope.propertiesCount = {offices:'?',industrial:'?',sites:'?'};
	});

});