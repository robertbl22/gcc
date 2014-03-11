'use strict';

angular.module('gccApp')
.service('GoogleMaps_LabelSvc', function($window) {

	this.MapLabel = $window.MapLabel;

	this.getLabelOptions = function(text, center, map, ColorSet) {
		return {
			text: text,
			position: center,
			map: map,
			fontSize: 12,
			align: 'center',
			strokeWeight: 3,
			strokeColor: ColorSet.strokeColor,
			fontColor: ColorSet.textColor
		}
	};

	/* Browser feature detection */
	function _isCanvasSupported(){
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	}

	this.addLabel = function(name, center, map, ColorSet) {
		var options = this.getLabelOptions(name, center, map, ColorSet);
		if(_isCanvasSupported()) {
			new this.MapLabel(options);
		}
	};

	return this;

});