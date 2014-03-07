'use strict',

angular.module('gccApp')
.directive('propertyThumbnail', function() {
	return {
		template: '<a ui-sref="{{link}}"> \
		<img \
		ng-src="{{cleanPhotosrc}}" \
		alt="{{title}}" \
		title="{{title}}" \
		class="img-responsive img-thumbnail" imageload> \
		</a>',
		restrict: 'A',
		scope: {
			photosrc: '@',
			title: '@',
			link: '@'
		},
		link: function(scope, element, attr) {
			scope.cleanPhotosrc = '';
			if(scope.photosrc != 'No Photo') {
				scope.cleanPhotosrc = scope.photosrc;
			} else {
				scope.cleanPhotosrc = 'images/no-photo.jpg';
			}
		}
	}
});