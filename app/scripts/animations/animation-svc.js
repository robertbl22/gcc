'use strict';

angular.module('gccApp')
.factory('AnimationSvc', function() {

	var _freeze = {
		'position': 'absolute', 
		'top': 0
	};
	var _restore = {
		'position': 'static', 
		'top': 'auto'
	};

	return {
		enter: {
			freezeLayout: function(cfg) {
				
				if(cfg.elementsToHide) {
					cfg.elementsToHide.hide();
				}
				cfg.element.css(_freeze);
				cfg.parent.css('position', 'relative');
			},
			unfreezeLayout: function(cfg) {
				
				if(cfg.elementsToHide) {
					cfg.elementsToHide.fadeIn(1000);
				}
				cfg.parent.css('position', 'static');
				cfg.element.css(_restore);
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