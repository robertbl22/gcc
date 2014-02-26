'use strict';

angular.module('gccApp')
.animation('.rb-crossfade', function () {
  return {
    enter: function (element, done) {
      element.parent()[0].style.position = 'relative';
      //element.context.parentNode.style.position = 'relative';
      element[0].style.position = 'absolute';
      //element.context.style.position = 'absolute';
      TweenMax.fromTo(element[0], 0.5, {opacity: 0}, {opacity:1, onComplete:done});
    },
    leave: function (element, done) {
      TweenMax.fromTo(element[0], 0.5, {opacity: 1}, {opacity:0, onComplete:done});
    }
  };
});