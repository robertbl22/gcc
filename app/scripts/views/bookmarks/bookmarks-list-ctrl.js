'use strict';

angular.module('gccApp')
.controller('BookmarksListCtrl', function ($scope, BookmarksSvc) {

	BookmarksSvc.load();
	$scope.Bookmarks = BookmarksSvc.collection;
	$scope.BookmarksIndex = BookmarksSvc.index;
	$rootScope.scrollTop();

	$scope.deleteAllBookmarks = function() {
		BookmarksSvc.deleteAll();
	};

	$scope.deleteBookmark = function(property) {
		BookmarksSvc.delete(property.OBJECTID);
	};
	
});
