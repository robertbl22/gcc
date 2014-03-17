'use strict';

angular.module('gccApp')
.controller('BookmarksListCtrl', function ($scope, $rootScope, $modal, BookmarksSvc) {

	BookmarksSvc.load();
	$scope.Bookmarks = BookmarksSvc.collection;
	$scope.BookmarksIndex = BookmarksSvc.index;
	$rootScope.scrollTop();

	$scope.showConfirmDeleteAllModal = function() {
		$modal.open({
			templateUrl: 'confirmDeleteAllModal.html',
			controller: ModalInstanceCtrl
		});
	};

	$scope.deleteBookmark = function(property) {
		BookmarksSvc.deleteSingle(property.OBJECTID);
	};

	var ModalInstanceCtrl = ['$scope', '$modalInstance', function($scope, $modalInstance) {
		$scope.deleteAllBookmarks = function() {
			BookmarksSvc.deleteAll();
			$modalInstance.close();
		};
		$scope.close = function() {
			$modalInstance.dismiss('cancel');
		}
	}];
	
});
