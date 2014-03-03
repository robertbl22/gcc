'use strict';

angular.module('gccApp')
.controller('SearchLocationCtrl', function ($scope, SearchSvc, LocalDataSvc, sgIndustrialSvc) {

	$scope.Search = SearchSvc.fields;

	$scope.$watch('Search.Location.Corridor', function() {
		if($scope.Search.Location.Corridor != '') {
			LocalDataSvc.Corridors.get($scope.Search.Location.Corridor).success(function(data) {
				$scope.Counties = data.counties;
			});
		} else {
			LocalDataSvc.Counties.get().success(function(data) {
				$scope.Counties = data;
			});
		}
	});

	$scope.$watch('Search.Location.County', function() {
		if($scope.Search.Location.Corridor != '') {
			sgIndustrialSvc.getCountyCities($scope.countyId)
			.then(function(data){
				//$scope.county.attributes = data.features[0].attributes;
			});
		};
	});

});
