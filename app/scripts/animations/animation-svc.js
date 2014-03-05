'use strict';

angular.module('gccApp')
.factory('AnimationSvc', function() {
	return {
		enter: {
			freezeLayout: function(cfg) {
				if(cfg.elementsToHide) {
					cfg.elementsToHide.hide();
				}
				cfg.parent.css('position', 'relative');
				cfg.element.css('position', 'absolute');
			},
			unfreezeLayout: function(cfg) {
				if(cfg.elementsToHide) {
					cfg.elementsToHide.fadeIn();
				}
				cfg.parent.css('position', 'static');
				cfg.element.css('position', 'static');
				cfg.callback();
			}
		},
		leave: {
			freezeLayout: function(cfg) {
				if(cfg.elementsToHide) {
					cfg.elementsToHide.hide().delay(200).fadeIn();
				}
				cfg.parent.css('position', 'relative');
				cfg.element.css('position', 'absolute');
			},
			unfreezeLayout: function(cfg) {
				cfg.parent.css('position', 'static');
				cfg.element.css('position', 'static');
				cfg.callback();
			}
		}
	};
});