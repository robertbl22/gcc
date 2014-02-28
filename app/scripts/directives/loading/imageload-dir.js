'use strict';

angular.module('gccApp')
.directive('imageload', function(TweenMaxSvc) {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attrs) {
        	element[0].style.opacity = 0;
            element.bind('load', function() {
            	TweenMaxSvc.fromTo(element[0], 0.3, {opacity: 0}, {opacity:1});
            });
        }
    };
});