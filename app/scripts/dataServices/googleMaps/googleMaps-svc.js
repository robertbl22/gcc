'use strict';

angular.module('gccApp')
.service('GoogleMapsSvc', function(
	GoogleMaps_MapSvc,
	GoogleMaps_MarkerSvc,
	GoogleMaps_InfoWindowSvc, 
	GoogleMaps_LabelSvc, 
	GoogleMaps_PolygonSvc,
	GoogleMaps_DistanceSvc) {

	return {
		maps: GoogleMaps_MapSvc.maps,
		createMap: GoogleMaps_MapSvc.createMap,
		removeBoundsPadding: GoogleMaps_MapSvc.removeBoundsPadding,

		marker: GoogleMaps_MarkerSvc,
		infoWindow: GoogleMaps_InfoWindowSvc,
		label: GoogleMaps_LabelSvc,
		polygon: GoogleMaps_PolygonSvc,
		distance: GoogleMaps_DistanceSvc
	}

});






