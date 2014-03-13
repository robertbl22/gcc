'use strict';

var app = angular.module('gccApp');

app.animation('.rb-zoom-in', ['AnimationSvc', function (AnimationSvc) {
	return {
		enter: function (element, done) {
			var opts = {
				element: element,
				parent: element.parent(),
				//elementsToHide: $('.rb-hide-while-transition-animating'),
				callback: done
			};

			AnimationSvc.enter.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.6, {
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

			//AnimationSvc.leave.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.8, {
				//top: 0,
				//scaleX: 1,
				//scaleY: 1,
				opacity: 1
			}, {
				//top: -200,
				//scaleX: 0.2,
				//scaleY: 0.2,
				opacity: 0,
				onComplete: done //function() {
					//AnimationSvc.leave.unfreezeLayout(opts);
				//}
			});
		}
	};
}]);



app.animation('.rb-zoom-out', ['AnimationSvc', function (AnimationSvc) {
	return {
		enter: function (element, done) {
			var opts = {
				element: element,
				parent: element.parent(),
				//elementsToHide: $('.rb-hide-while-transition-animating'),
				callback: done
			};

			//AnimationSvc.leave.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.8, {
				//top: 0,
				//scaleX: 1,
				//scaleY: 1,
				opacity: 0
			}, {
				//top: -200,
				//scaleX: 0.2,
				//scaleY: 0.2,
				opacity: 1,
				onComplete: done //function() {
					//AnimationSvc.leave.unfreezeLayout(opts);
				//}
			});
		},
		leave: function (element, done) {
			var opts = {
				element: element,
				parent: element.parent(),
				//elementsToHide: $('.rb-hide-while-transition-animating'),
				callback: done
			};

			AnimationSvc.enter.freezeLayout(opts);
			TweenMax.fromTo(element[0], 0.6, {
				top: 0,
				scaleX: 1,
				scaleY: 1,
				opacity: 1
			}, {
				top: -100,
				scaleX: 0.5,
				scaleY: 0.5,
				opacity: 0,
				onComplete: function() {
					AnimationSvc.enter.unfreezeLayout(opts);
				}
			});
		},
	};
}]);