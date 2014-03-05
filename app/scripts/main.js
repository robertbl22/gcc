'use strict';

var app = angular.module('gccApp');

app.controller('MainCtrl', function ($scope, $location, $anchorScroll, $rootScope, BookmarksSvc, BreadcrumbSvc) {
	$scope.BookmarksIndex = BookmarksSvc.index;
	$scope.ControlName = 'MainCtrl';
	$rootScope.rootAnimationClass = 'rb-crossfade';
	
	$scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
		BreadcrumbSvc.currentPath = absNewUrl;
		BreadcrumbSvc.previousPath = absOldUrl;
	});

	$rootScope.scrollTop = function() {
		$location.hash('TopOfPage');
		$anchorScroll();
	};
	
});