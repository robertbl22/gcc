'use strict';

angular.module('gccApp')
.service('GoogleMaps_MarkerSvc', function(GoogleMaps_MapSvc) {

	return {
		addMarkerToMap: function(cfg) {
			var marker = new GoogleMaps_MapSvc.maps.Marker(cfg);
			return marker;
		}
	};

});