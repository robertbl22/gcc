'use strict';

angular.module('gccApp')
.animation('.rb-crossfade', function (AnimationSvc) {
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
				opacity: 0
			}, {
				opacity: 1,
				onComplete: function() {
					AnimationSvc.enter.unfreezeLayout(opts);
				}
			});
		},
		leave: function (element, done) {
			/*var opts = {
				element: element,
				parent: element.parent(),
				elementsToHide: $('.rb-hide-while-transition-animating'),
				callback: done
			};*/

			//AnimationSvc.leave.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.3, {
				opacity: 1
			}, {
				opacity: 0,
				onComplete: done //function() {
					//AnimationSvc.leave.unfreezeLayout(opts);
				//}
			});
		}
	};
});