'use strict';

angular.module('gccApp')
.animation('.rb-fade', function() {
	return {
		enter: function (element, done) {
			TweenMax.fromTo(element[0], 0.5, {
				opacity: 0
			}, {
				opacity: 1,
				onComplete: done
			});
		},
		leave: function (element, done) {
			TweenMax.fromTo(element[0], 0.7, {
				opacity: 1
			}, {
				opacity: 0,
				onComplete: done
			});
		}
	};
});