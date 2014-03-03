'use strict';

angular.module('gccApp')
.animation('.rb-slide', function() {
	return {
		enter: function (element, done) {
			TweenMax.fromTo(element[0], 0.5, {top: 25, opacity: 0}, {top: 0, opacity: 1, onComplete: done});
		},
		leave: function (element, done) {
			TweenMax.fromTo(element[0], 0.5, {top: 0, opacity: 1}, {top:  25, opacity: 0, onComplete: done});
		}
	};
});
