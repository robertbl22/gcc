'use strict';

var app = angular.module('gccApp')
.controller('CountyTabsCtrl', function ($scope, $stateParams, DataService, $timeout) {

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


	/* Properties Count stuff */
	DataService.county.getPropertiesCount(countyId)
	.then(function(data){
		$scope.propertiesCount = data;
	})
	['catch'](function(e){
		$scope.propertiesCount = 'no data';
	});

	$timeout(function() {
		if(!$scope.propertiesCount) {
			$scope.propertiesCount = 'no data';
		}
	}, (10 * 1000));


});