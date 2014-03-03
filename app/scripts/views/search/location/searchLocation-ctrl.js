'use strict';

angular.module('gccApp')
.controller('SearchLocationCtrl', function ($scope, DataService, SearchSvc) {

	var citiesDataSource;

	$scope.$watch('Property.Type', function() {
		updateCounty();
	});

	$scope.$watch('Location.Corridor', function() {
		updateCounty();
	});

	$scope.$watch('Location.County', function() {
		citiesDataSource = getCitiesDataSource();
		console.log('citiesDataSource changed!', citiesDataSource)
		updateCity();
	});



	var getCitiesDataSource = function() {
		switch($scope.Property.Type) {
			case SearchSvc.PropertyType.OFFICE: return DataService.office;
			case SearchSvc.PropertyType.SITE: return DataService.site;
			default: return DataService.industrial;
		}
	};

	var updateCounty = function() {
		if($scope.Location.Corridor != '') {
			DataService.corridor.getOverview($scope.Location.Corridor)
			.success(function(data) {
				$scope.Counties = data.counties;
				$scope.Location.County = '';
			});
		} else {
			DataService.county.getAll().success(function(data) {
				$scope.Counties = data;
			});
		};
	};

	var updateCity = function() {
		if($scope.Location.County != '') {
			citiesDataSource.getCountyCities($scope.Location.County)
			.then(function(data){
				$scope.Cities = data.features;
			});
		} else {
			$scope.Cities = [];
		};
	};

});
