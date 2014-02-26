'use strict';

angular.module('gccApp')
.animation('.rb-fadein', function() {
	return {
		enter: function (element, done) {
			TweenMax.fromTo(element[0], 0.3, {opacity: 0}, {opacity:1, onComplete:done});
		}
	};
});