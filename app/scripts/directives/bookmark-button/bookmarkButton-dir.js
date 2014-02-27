'use strict';

angular.module('gccApp')
.directive('bookmarkButton', function(BookmarksSvc, ToastrSvc) {

	return {
		templateUrl: 'scripts/directives/bookmark-button/bookmarkButton.html',
		restrict: 'A',
		scope: {
			item: '=',
			itemId: '@',
			itemType: '@'
		},
		link: function(scope, element, attrs) {

			var actionType = {ADD_BOOKMARK:'add', DELETE_BOOKMARK:'delete'};

			/* itemId takes a while to populate so we watch for change */
			var getWatched = function() { return scope.itemId; };
			var changeAction = function() { scope.action = getAction(); }
			scope.$watch(getWatched, changeAction);


			scope.addBookmark = function() {
				var success = BookmarksSvc.add(scope.itemId, scope.itemType, scope.item);
				if(success) {
					ToastrSvc.success('Bookmark saved!');
					scope.action = actionType.DELETE_BOOKMARK;
				} else {
					ToastrSvc.info('Bookmark already exists');
				}
			}
			
			scope.deleteBookmark = function() {
				var success = BookmarksSvc.delete(scope.itemId);
				ToastrSvc.warning('Bookmark removed!');
				scope.action = actionType.ADD_BOOKMARK;
			}

			function getAction() {
				var hasItem = BookmarksSvc.hasItem(scope.itemId);
				if(hasItem) {
					return actionType.DELETE_BOOKMARK;
				}
				return actionType.ADD_BOOKMARK;
			}
		}
	}
});