'use strict';

angular.module('gccApp')
.controller('SearchCtrl', function ($scope, SearchParametersSvc, ToastrSvc) {

	$scope.Search = SearchParametersSvc.fields;

	/* Form controls namespacing */
	$scope.Form = {'Property': {}};

	$scope.Form.reset = function() {
		$scope.Search = angular.copy(SearchParametersSvc.defaults);
		ToastrSvc.info('The form has been reset to default values.');
	};

	$scope.Form.submit = function() {
		ToastrSvc.warning('Sorry, the search feature is not yet ready.');
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
