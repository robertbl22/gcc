'use strict',

angular.module('gccApp')
.directive('propertyThumbnail', function() {
	return {
		template: '<a ng-href="{{link}}"> \
		<img \
		ng-hide="{{photosrc===\'No Photo\'}}" \
		ng-src="{{photosrc}}" \
		alt="{{title}}" \
		title="{{title}}" \
		class="img-responsive img-thumbnail"> \
		<img \
		ng-show="{{photosrc===\'No Photo\'}}" \
		ng-src="images/no-photo.jpg" \
		alt="{{title}}" \
		title="{{title}}" \
		class="img-responsive img-thumbnail"> \
		</a>',
		restrict: 'A',
		scope: {
			photosrc: '@',
			title: '@',
			link: '@'
		}
	}
});