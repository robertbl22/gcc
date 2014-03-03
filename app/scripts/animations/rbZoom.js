'use strict';

angular.module('gccApp')
.animation('.rb-zoom', function() {
	return {
		enter: function (element, done) {
			//element.parent()[0].style.position = 'relative';
			//element[0].style.position = 'absolute';
			TweenMax.fromTo(element[0], 0.5, {top: 100, scaleX: 0.5, scaleY: 0.5, opacity: 0}, {top: 0, scaleX: 1, scaleY: 1, opacity: 1, onComplete: done});
		},
		leave: function (element, done) {
			TweenMax.fromTo(element[0], 0.5, {top: 0, scaleX:1, scaleY: 1, opacity: 1}, {top: 100, scaleX: 0.5, scaleY: 0.5, opacity: 0, onComplete: done});
		},
	};
});