'use strict';

angular.module('gccApp')
.directive('corridorMap', function($location, CountyZoomSvc, DataService, ColorSvc, GoogleMapSvc) {
	return {
		restrict: 'A',
		template: '<div class="map"></div>',
		replace: true,
		scope: {
			corridorId: '@'
		},
		link: function(scope, element, attrs) {

			DataService.corridor.getOverview(scope.corridorId).success(function(data) {
				drawGoogleMap(data.counties, element[0]);
			});

			var drawGoogleMap = function(counties, mapCanvas) {
				/* Create Map */
				var map = new GoogleMapSvc.maps.Map(mapCanvas, {
					center: new GoogleMapSvc.maps.LatLng(0,0),
					zoom: 5
				});
				
				
				var bounds = new GoogleMapSvc.maps.LatLngBounds();

				/* Add Counties */
				angular.forEach(counties, function(county) {
					var colorSet = ColorSvc.TierColors[county.tier];
					var polygon = GoogleMapSvc.getPolygonFromPath(county.geometry, colorSet);
					polygon.setMap(map);
					var polygonBounds = polygon.getBounds();
					bounds.extend(polygonBounds.getNorthEast());
					bounds.extend(polygonBounds.getSouthWest());
					var center = polygonBounds.getCenter();
					GoogleMapSvc.addLabel(county.name, center, map, colorSet);
					addBehaviors(polygon, scope.corridorId, county.id, colorSet);
				});

				bounds = GoogleMapSvc.removeBoundsPadding(bounds);
				map.fitBounds(bounds);
			};

			var addBehaviors = function(polygon, corridorId, countyId, PolygonColors) {
				//var currentPath = '#/' + corridorId + '/';
				GoogleMapSvc.maps.event.addListener(polygon, 'click', function(evt) {
					scope.$apply(CountyZoomSvc.zoom(corridorId, countyId));
					scope.$apply($location.path('/' + corridorId + '/' + countyId));
				});
				GoogleMapSvc.addPolygonHover(polygon, PolygonColors);
			};

		}
	};
});

