'use strict';

angular.module('gccApp')
.directive('siteMap', function(ColorSvc, GoogleMapSvc, SelectGeorgiaSvc, ToastrSvc) {
	return {
		restrict: 'A',
		template: '<div class="map"></div>',
		replace: true,
		scope: {
			siteId: '@'
		},
		link: function(scope, element, attrs) {

			

			/* Get values needed for query */
			var overlayOptions = GoogleMapSvc.defaultPolygonOptions;
			var queryParams = SelectGeorgiaSvc.site.getQueryParams(scope.siteId, overlayOptions);
			var layerId = SelectGeorgiaSvc.layerId.SITES;
			var queryKey = 'SITE_' + scope.siteId;

			SelectGeorgiaSvc.get(layerId, queryParams, queryKey)
			.then(function(data){

				/* Wait until element is visible */
				/* Otherwise map will get messed up */
				scope.$watch(function() { 
					return element.is(':visible'); 
				}, function() {

					/* Get mapping properties */
					var site = data.features[0];
					var lat = site.attributes.LATITUDE;
					var lng = site.attributes.LONGITUDE;
					var center = new GoogleMapSvc.maps.LatLng(lat, lng);

					/* Create map */
					var map = GoogleMapSvc.createMap(element[0], center);

					/* Draw shape */
					var shapeConfig = {
						colorSet : ColorSvc.RED,
						map : map,
						name : site.attributes.NAME,
						center : center,
						polygon : site.geometry[0]
					};
					GoogleMapSvc.addShapeToMap(shapeConfig);

				});
			})
			.catch(function(e){
				ToastrSvc.error('Sorry, there was an error while loading the map.');
			});
			

		}
	};
});
