'use strict';

angular.module('gccApp')
.animation('.rb-slide', function (AnimationSvc) {
	return {
		enter: function (element, done) {
			var opts = {
				element: element,
				parent: element.parent(),
				/* Note, we hide the submit button 
				while animating so that it won't jump */
				elementsToHide: $('.rb-hide-while-transition-animating'),
				callback: done
			};

			AnimationSvc.enter.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.5, {
				top: 25,
				opacity: 0
			}, {
				top: 0,
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
				elementsToHide: $('.rb-hide-while-transition-animating'),
				callback: done
			};

			AnimationSvc.leave.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.5, {
				top: 0,
				opacity: 1
			}, {
				top:  25,
				opacity: 0,
				onComplete: function() {
					AnimationSvc.leave.unfreezeLayout(opts);
				}
			});
		}
	};
});
