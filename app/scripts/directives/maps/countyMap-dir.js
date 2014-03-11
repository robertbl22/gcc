'use strict';

angular.module('gccApp')
.directive('countyMap', function(DataService, ColorSvc, GoogleMapsSvc) {
	return {
		restrict: 'A',
		template: '<div class="map"></div>',
		replace: true,
		scope: {
			countyId: '@'
		},
		link: function(scope, element, attrs) {

			DataService.county.getOverview(scope.countyId).success(function(data) {
				drawGoogleMap(data, element[0]);
			});

			var drawGoogleMap = function(county, mapCanvas) {
				/* Create Map */
				var map = new GoogleMapsSvc.maps.Map(mapCanvas, {
					center: new GoogleMapsSvc.maps.LatLng(0,0),
					zoom: 5
				});
				
				var bounds = new GoogleMapsSvc.maps.LatLngBounds();

				/* Add County */
				var colorSet = ColorSvc.TierColors[county.tier];
				var polygon = GoogleMapsSvc.polygon.getPolygonFromPath(county.geometry, colorSet);
				polygon.setMap(map);
				var polygonBounds = polygon.getBounds();
				bounds.extend(polygonBounds.getNorthEast());
				bounds.extend(polygonBounds.getSouthWest());
				var center = polygonBounds.getCenter();
				//GoogleMapsSvc.infoWindow.addCountyInfoWindow(map, county.name, center, polygon);
				GoogleMapsSvc.label.addLabel(county.name, center, map, colorSet);
				//addBehaviors(polygon, scope.corridorId, county.id, colorSet);

				bounds = GoogleMapsSvc.removeBoundsPadding(bounds);
				map.fitBounds(bounds);
			};

		}
	};
});
