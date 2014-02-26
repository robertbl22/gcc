'use strict';

angular.module('gccApp')
.controller('SearchCtrl', function ($scope, LocalDataProvider_CountiesSvc, SearchSvc, ToastrSvc) {

	$scope.Search = SearchSvc.fields;
	$scope.Form = {'Property': {}};

	LocalDataProvider_CountiesSvc.get().success(function(data) {
		$scope.Counties = data;
	});

	$scope.Form.reset = function() {
		$scope.Search = angular.copy(SearchSvc.defaults);
	};

	$scope.Form.submit = function() {
		ToastrSvc.warning('Sorry, the search feature is not yet ready.')
	};

	$scope.$watch('Search.Property.Type', function() {
		switch($scope.Search.Property.Type) {
			case 'Site': 
			$scope.Form.Property.TemplateUrl = 'scripts/views/search/subforms/site.html';
			break;
			case 'OfficeBuilding': 
			$scope.Form.Property.TemplateUrl = 'scripts/views/search/subforms/office.html';
			break;
			case 'IndustrialBuilding': 
			$scope.Form.Property.TemplateUrl = 'scripts/views/search/subforms/industrial.html';
			break;
		}
	});

	//$scope.Search.Property.Type = 'OfficeBuilding';


	/*$scope.$watch('Search.Location.Tiers.tier1', function(value, prev, scope) {
		console.log(value);
		console.log(prev);
		console.log(scope);
		var tiers = $scope.Search.Location.Tiers;
		console.log(tiers.tier1)
		if(!tiers.tier1 && !tiers.tier2 && !tiers.tier3 && !tiers.tier4) {
			$scope.Search.Location.Tiers.tier1 = true;
			//$scope.Search.Location.Tiers.all = true;
		}
	});*/
	/*$scope.$watch('Search.Location.Tiers.tier2', function(value) {
		var tiers = $scope.Search.Location.Tiers;
		if(!tiers.tier1 && !tiers.tier2 && !tiers.tier3 && !tiers.tier4) {
			$scope.Search.Location.Tiers.all = true;
		}
	});
	$scope.$watch('Search.Location.Tiers.tier3', function(value) {
		var tiers = $scope.Search.Location.Tiers;
		if(!tiers.tier1 && !tiers.tier2 && !tiers.tier3 && !tiers.tier4) {
			$scope.Search.Location.Tiers.all = true;
		}
	});
	$scope.$watch('Search.Location.Tiers.tier4', function(value) {
		var tiers = $scope.Search.Location.Tiers;
		if(!tiers.tier1 && !tiers.tier2 && !tiers.tier3 && !tiers.tier4) {
			$scope.Search.Location.Tiers.all = true;
		}
	});*/

});
