'use strict';

angular.module('gccApp')
.directive('loading', function ($timeout) {
	return {
		template: '<div class="loading-panel"></div><div class="transcluded" ng-transclude></div>',
		restrict: 'C',
		transclude: true,
		scope: {
			fieldToWatch: '@',
			spinnerOffsetY: '@'
		},
		link: function postLink(scope, element, attrs) {
			var panel = element.children('.loading-panel');
			var _isTransitionDelayed = false;

			scope.$watch('fieldToWatch', function() {
				if(scope.fieldToWatch) {
					if(_isTransitionDelayed) {
						TweenMax.fromTo(panel[0], 1.0, {opacity: 1}, {opacity:0, onComplete:done});
						_isTransitionDelayed = false;
					} else {
						panel.hide();
						_isTransitionDelayed = false;
					}
				} else {					
					panel.css('background-position', 'center ' + scope.spinnerOffsetY);
					panel.show();
					$timeout(function() { _isTransitionDelayed = true; }, 500);
				}
			});

			var done = function() {
				panel.css('display', 'none');
			}
		}
	};
});

