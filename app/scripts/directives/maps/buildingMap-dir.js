'use strict';

angular.module('gccApp')
.directive('buildingMap', function(GoogleMapsSvc) {
	return {
		restrict: 'A',
		template: '<div class="map"></div>',
		replace: true,
		scope: {
			lat: '@',
			lng: '@',
			name: '@'
		},
		link: function(scope, element, attrs) {

			scope.$watch('lat', function() {
				if(scope.lat){
					/* Wait until element is visible */
					/* Otherwise map will get messed up */
					scope.$watch(function() {
						return element.is(':visible'); 
					}, function() {
						var latLng = new GoogleMapsSvc.maps.LatLng(scope.lat, scope.lng);
						var map = GoogleMapsSvc.createMap(element[0], latLng);
						var markerConfig = {
							position: latLng,
							map: map,
							title: scope.name,
							icon: 'images/icon-office.png'
						};
						var marker = GoogleMapsSvc.marker.addMarkerToMap(markerConfig);
						GoogleMapsSvc.infoWindow.addMarkerInfoWindow(map, scope.name, marker);
					});
				}
			});

		}
	};
});
