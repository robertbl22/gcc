'use strict';

angular.module('gccApp')
.controller('BreadcrumbCtrl', function ($scope, BreadcrumbSvc) {

	$scope.Breadcrumbs = BreadcrumbSvc.breadcrumbs;

	$scope.$on('$routeChangeSuccess', function(event, routeData){
		BreadcrumbSvc.update(routeData);
	});

});



