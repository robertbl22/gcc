'use strict';

angular.module('gccApp')
.controller('SearchCtrl', function ($scope, $state, SearchParametersSvc, ToastrSvc) {

	$scope.Search = SearchParametersSvc.fields;

	/* Form controls namespacing */
	$scope.Form = {'Property': {}};

	$scope.Form.reset = function() {
		SearchParametersSvc.reset();
		$scope.Search = SearchParametersSvc.fields;
		ToastrSvc.info('The form has been reset to default values.');
	};

	$scope.Form.submit = function() {
		SearchParametersSvc.save();
		$state.go('search.results');
	};

	$scope.$watch('Search.Property.Type', function() {
		switch($scope.Search.Property.Type) {
			case SearchParametersSvc.PropertyType.SITE: 
			$scope.Form.Property.TemplateUrl = 'scripts/views/search/site/site.html';
			break;
			case SearchParametersSvc.PropertyType.OFFICE: 
			$scope.Form.Property.TemplateUrl = 'scripts/views/search/building/office.html';
			break;
			case SearchParametersSvc.PropertyType.INDUSTRIAL: 
			$scope.Form.Property.TemplateUrl = 'scripts/views/search/building/industrial.html';
			break;
		}
	});

});
