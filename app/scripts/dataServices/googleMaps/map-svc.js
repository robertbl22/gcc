'use strict';

angular.module('gccApp')
.service('GoogleMaps_MapSvc', function($window) {

	var self = this;

	self.maps = $window.google.maps

	self.createMap = function(mapCanvas, center) {
		return new self.maps.Map(mapCanvas, {
			center: center,
			zoom: 15
		});
	};

	self.removeBoundsPadding = function(bounds) {
		/* See:
		/* https://code.google.com/p/gmaps-api-issues/issues/detail?id=3117
		*/
		if (bounds) {
			var sw = bounds.getSouthWest();
			var ne = bounds.getNorthEast();

			var lat1 = sw.lat();
			var lng1 = sw.lng();
			var lat2 = ne.lat();
			var lng2 = ne.lng();

			var dx = (lng1 - lng2) / 2.;
			var dy = (lat1 - lat2) / 2.;
			var cx = (lng1 + lng2) / 2.;
			var cy = (lat1 + lat2) / 2.;

			/* work around a bug in google maps... */
			lng1 = cx + dx / 1.5;
			lng2 = cx - dx / 1.5;
			lat1 = cy + dy / 1.5;
			lat2 = cy - dy / 1.5;
			/* ////////////////////////////////////// */

			sw = new google.maps.LatLng(lat1,lng1);
			ne = new google.maps.LatLng(lat2,lng2);
			bounds = new google.maps.LatLngBounds(sw,ne);
			return bounds;
		}
	};

	return self;
	
});






