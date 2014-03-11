'use strict';

angular.module('gccApp')
.directive('footer', function ($timeout) {
	return {
		templateUrl: 'scripts/directives/footer/footer.html',
		restrict: 'A',
		link: function(scope, element, attrs) {
			var footer = element.find('.footer');
			var tab = element.find('.footer-tab');
			footer.on('click', function() {
				footer.toggleClass('raised');
			});

			var _isMouseOver = false;
			footer.on('mouseover', function() {
				_isMouseOver = true;
				$timeout(function(){
					if(_isMouseOver) {
						footer.addClass('raised');
					}
				}, 300);
			});
			footer.on('mouseout', function() {
				_isMouseOver = false;
				$timeout(function(){
					if(!_isMouseOver) {
						footer.removeClass('raised');
					}
				}, 300);
			});
		}
	};
});

