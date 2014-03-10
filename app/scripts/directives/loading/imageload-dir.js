'use strict';

angular.module('gccApp')
.directive('imageload', function(TweenMaxSvc) {
    return {
        restrict: 'C',
        scope: {},
        link: function(scope, element, attrs) {
            var img = element.find('img');
            img[0].style.opacity = 0;
            var loader = element.append('<div class="loading-bar"></div>')
            img.bind('load', function() {
            	TweenMaxSvc.fromTo(
                    img[0], 0.3, 
                    {opacity: 0}, 
                    {opacity:1, onComplete:loader.remove }
                );
            });
        }
    };
});