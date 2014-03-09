'use strict';

var app = angular.module('gccApp')
.controller('OfficeDetailCtrl', function ($scope, $stateParams, DataService, ToastrSvc) {

	var propertyId = $stateParams.propertyId;
	$scope.countyId = $stateParams.countyId;
	$scope.corridorId = $stateParams.corridorId;

	DataService.office.getDetail(propertyId)
	.then(function(data){
		$scope.property = data.features[0].attributes;
		$scope.fieldAliases = data.fieldAliases;

		if($scope.countyId === undefined || $scope.countyId === '') {
			$scope.countyId = DataService.county.countyNameToCountyId($scope.property.COUNTY_NAME);
			DataService.county.getOverview($scope.countyId).success(function(data) {
				$scope.corridorId = data.corridors[0].id;
			});
		}
	})
	['catch'](function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});
	
});