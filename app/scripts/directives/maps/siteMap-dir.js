'use strict';

angular.module('gccApp')
.directive('siteMap', function(ColorSvc, GoogleMapsSvc) {
	return {
		restrict: 'A',
		template: '<div class="map"></div>',
		replace: true,
		scope: {
			lat: '@',
			lng: '@',
			name: '@',
			geometry: '='
		},
		link: function(scope, element, attrs) {

			scope.$watch('geometry', function() {
				if(scope.geometry){
					/* Wait until element is visible */
					/* Otherwise map will get messed up */
					scope.$watch(function() {
						return element.is(':visible'); 
					}, function() {
						var center = new GoogleMapsSvc.maps.LatLng(scope.lat, scope.lng);
						var map = GoogleMapsSvc.createMap(element[0], center);
						var shapeConfig = {
							colorSet : ColorSvc.RED,
							map : map,
							name : scope.name,
							center : center,
							polygon : scope.geometry
						};
						GoogleMapsSvc.polygon.addShapeToMap(shapeConfig);
					});
				}
			});
			
		}
	};
});
