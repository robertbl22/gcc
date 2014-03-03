'use strict';

angular.module('gccApp')
.controller('SearchLocationCtrl', function ($scope, SearchSvc, DataService) {

	$scope.Search = SearchSvc.fields;

	$scope.$watch('Search.Location.Corridor', function() {
		if($scope.Search.Location.Corridor != '') {
			DataService.corridor.getOverview($scope.Search.Location.Corridor).success(function(data) {
				$scope.Counties = data.counties;
			});
		} else {
			DataService.county.getAll().success(function(data) {
				$scope.Counties = data;
			});
		}
	});

	$scope.$watch('Search.Location.County', function() {
		if($scope.Search.Location.Corridor != '') {
			DataService.industrial.getCountyCities($scope.countyId)
			.then(function(data){
				//$scope.county.attributes = data.features[0].attributes;
			});
		};
	});

});
