'use strict',

angular.module('gccApp')
.directive('propertyThumbnail', function($state) {
	return {
		template: '<a href="{{url}}"> \
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
			relativeState: '@',
			propertyId: '@'
		},
		link: function(scope, element, attr) {
			/* jshint unused: false */ /* for element, attrs */	
			scope.url = $state.href(scope.relativeState, {propertyId: scope.propertyId});

			scope.cleanPhotosrc = '';
			if(scope.photosrc != 'No Photo') {
				scope.cleanPhotosrc = scope.photosrc;
			} else {
				scope.cleanPhotosrc = 'images/no-photo.jpg';
			}
		}
	}
});