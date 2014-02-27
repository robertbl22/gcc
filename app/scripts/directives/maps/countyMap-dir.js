'use strict';

angular.module('gccApp')
.directive('countyMap', function(LocalDataSvc, ColorSvc, GoogleMapSvc) {
	return {
		restrict: 'A',
		template: '<div class="map"></div>',
		replace: true,
		scope: {
			countyId: '@'
		},
		link: function(scope, element, attrs) {

			LocalDataSvc.Counties.get(scope.countyId).success(function(data) {
				drawGoogleMap(data, element[0]);
			});

			var drawGoogleMap = function(county, mapCanvas) {
				/* Create Map */
				var map = new GoogleMapSvc.maps.Map(mapCanvas, {
					center: new GoogleMapSvc.maps.LatLng(0,0),
					zoom: 5
				});
				
				var bounds = new GoogleMapSvc.maps.LatLngBounds();

				/* Add County */
				var colorSet = ColorSvc.TierColors[county.tier];
				var polygon = GoogleMapSvc.getPolygonFromPath(county.geometry, colorSet);
				polygon.setMap(map);
				var polygonBounds = polygon.getBounds();
				bounds.extend(polygonBounds.getNorthEast());
				bounds.extend(polygonBounds.getSouthWest());
				var center = polygonBounds.getCenter();
				//GoogleMapSvc.addCountyInfoWindow(map, county.name, center, polygon);
				GoogleMapSvc.addLabel(county.name, center, map, colorSet);
				//addBehaviors(polygon, scope.corridorId, county.id, colorSet);

				bounds = GoogleMapSvc.removeBoundsPadding(bounds);
				map.fitBounds(bounds);
			};

		}
	};
});
