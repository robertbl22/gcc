'use strict';

angular.module('gccApp')
.animation('.rb-zoom', function (AnimationSvc) {
	return {
		enter: function (element, done) {
			var opts = {
				element: element,
				parent: element.parent(),
				//elementsToHide: $('.rb-hide-while-transition-animating'),
				callback: done
			};

			AnimationSvc.enter.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.5, {
				top: -100,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0
			}, {
				top: 0,
				scaleX: 1,
				scaleY: 1,
				opacity: 1,
				onComplete: function() {
					AnimationSvc.enter.unfreezeLayout(opts);
				}
			});
		},
		leave: function (element, done) {
			var opts = {
				element: element,
				parent: element.parent(),
				//elementsToHide: $('.rb-hide-while-transition-animating'),
				callback: done
			};

			AnimationSvc.leave.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.7, {
				top: 0,
				scaleX: 1,
				scaleY: 1,
				opacity: 1
			}, {
				top: -200,
				scaleX: 0.2,
				scaleY: 0.2,
				opacity: 0,
				onComplete: function() {
					AnimationSvc.leave.unfreezeLayout(opts);
				}
			});
		},
	};
});