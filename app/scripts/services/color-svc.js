'use strict';

angular.module('gccApp')
.factory('ColorSvc', function() {

	var self = this;

	self.getColorSet = function(color, highlight, stroke, opacity) {
		if(angular.isUndefined(opacity)) {
			opacity = 0.45;
		}
		return {
			fillColor: color,
			fillOpacity: opacity,
			mouseover: highlight,
			mouseout: color,
			textColor: '#FFFFFF',
			strokeColor: stroke,
			strokeWeight: 1,
			strokeOpacity: 1,
			zIndex: 0
		};
	};

	self.RED = self.getColorSet('#FF0000', '#FC7777', '#BA0000', 0.15);

	self.TierColors = {
		1 : self.getColorSet('#FF7300', '#FFAE00', '#914100'),
		2 : self.getColorSet('#598C00', '#A2FF00', '#253B00'),
		3 : self.getColorSet('#BB00FF', '#D874FC', '#5F0082'),
		4 : self.getColorSet('#0055FF', '#78A5FF', '#002E8A')
	};

	return self;

});


// 1 : orange
// 2 : green
// 3 : purple
// 4 : blue		