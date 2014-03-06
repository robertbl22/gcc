'use strict';

angular.module('gccApp')
.controller('ResultsCtrl', function ($scope, $rootScope, SearchParametersSvc, DataService, ToastrSvc) {

	$scope.showNoResults = false;
	$scope.propertyType = SearchParametersSvc.fields.Property.Type;

	/* SelectGeorgia data */
	DataService.search.getResults(SearchParametersSvc.fields)
	.then(function(data){
		console.log('data returned', data)
		if(data.features && data.features.length > 0){
			console.log('ResultsCtrl: data.features',data.features)
			$scope.Results = data.features;
		} else {
			$scope.showNoResults = true;
		}
		$rootScope.scrollTop();
	})
	.catch(function(){
		$scope.showNoResults = true;
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});

});