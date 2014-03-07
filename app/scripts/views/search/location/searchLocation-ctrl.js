'use strict';

angular.module('gccApp')
.controller('SearchLocationCtrl', function ($scope, SearchLocationSvc, ToastrSvc) {

	(function init() {
		_updateCounty();
	}());

	/* Event Handlers */

	$scope.$watch('Property.Type', function(newVal, oldVal) {
		if(newVal != oldVal) {
			_updateCounty();
			_updateCity();
		};
	});

	$scope.$watch('Location.Corridor', function(newVal, oldVal) {
		if(newVal != oldVal) {
			_updateCounty();
		};
	});

	$scope.$watch('Location.County', function(newVal, oldVal) {
		if(newVal != oldVal) {
			_updateCity();
		};
	});

	/* Private Methods */

	function _updateCounty() {
		SearchLocationSvc.getCounties($scope.Location.Corridor)
		.then(function(data) { 
			$scope.Counties = data;
			_resetCounty();
		})
		.catch(function() {
			ToastrSvc.warning('Sorry, there was an error while fetching the data.');
		});
	};

	function _updateCity() {
		var countyName = $scope.Location.County;
		var propertyType = $scope.Property.Type;
		SearchLocationSvc.getCities(propertyType, countyName)
		.then(function(data) {
			$scope.Cities = data.features;
			_resetCity();
		})
		.catch(function() {
			ToastrSvc.warning('Sorry, there was an error while fetching the data.');
		});
	};

	function _resetCounty() {
		var countyName = $scope.Location.County;
		var counties = $scope.Counties;
		var hasItem = SearchLocationSvc.isCountyInArray(countyName, counties);
		if(!hasItem) {
			$scope.Location.County = '';
		};
	};

	function _resetCity() {
		var cityName = $scope.Location.City;
		var cities = $scope.Cities;
		var hasItem = SearchLocationSvc.isCityInArray(cityName, cities);
		if(!hasItem) {
			$scope.Location.City = '';
		};
	};


});
