'use strict',

angular.module('gccApp')
.directive('propertyThumbnail', function($state) {
	return {
		template: '<a href="{{url}}" class="imageload"> \
		<img \
		ng-src="{{cleanPhotosrc}}" \
		alt="{{title}}" \
		title="{{title}}" \
		class="img-responsive img-thumbnail"> \
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
				scope.cleanPhotosrc = 'http://www.gaports.com/bbimagehandler.ashx?Url=' + scope.photosrc + '&width=262';
			} else {
				scope.cleanPhotosrc = 'images/no-photo.jpg';
			}
		}
	}
});