'use strict';

var app = angular.module('gccApp');

app.controller('MainCtrl', function ($scope, $location, $anchorScroll, $rootScope, BookmarksSvc) {
	
	$scope.BookmarksIndex = BookmarksSvc.index;
	
	$rootScope.rootAnimationClass = 'rb-crossfade';

	$rootScope.scrollTop = function() {
		$location.hash('TopOfPage');
		$anchorScroll();
	};
	
	/*$scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
		BreadcrumbSvc.currentPath = absNewUrl;
		BreadcrumbSvc.previousPath = absOldUrl;
	});*/
	
});