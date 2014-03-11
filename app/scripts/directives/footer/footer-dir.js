'use strict';

angular.module('gccApp')
.directive('footer', function ($timeout) {
	return {
		templateUrl: 'scripts/directives/footer/footer.html',
		restrict: 'A',
		link: function(scope, element, attrs) {
			var footer = element.find('.footer');
			var tab = element.find('.footer-tab');
			var _isMouseOver = false;

			scope.toggleSlide = function() {
				footer.toggleClass('raised');
			};

			scope.slideUp = function() {
				_isMouseOver = true;
				$timeout(function(){
					if(_isMouseOver) {
						footer.addClass('raised');
					}
				}, 600);
			};

			scope.slideDown = function() {
				_isMouseOver = false;
				$timeout(function(){
					if(!_isMouseOver) {
						footer.removeClass('raised');
					}
				}, 600);
			};

		}
	};
});

