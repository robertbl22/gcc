'use strict';

var app = angular.module('gccApp');

app.controller('MainCtrl', function ($scope, $rootScope, BookmarksSvc, BreadcrumbSvc) {
	$scope.BookmarksIndex = BookmarksSvc.index;
	$scope.ControlName = 'MainCtrl';
	$rootScope.rootAnimationClass = 'rb-fade';
	
	$scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
		BreadcrumbSvc.currentPath = absNewUrl;
		BreadcrumbSvc.previousPath = absOldUrl;
	});
	
});