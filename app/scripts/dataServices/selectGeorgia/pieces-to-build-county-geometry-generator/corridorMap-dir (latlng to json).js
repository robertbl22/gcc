'use strict';

angular.module('gccApp')
.directive('corridorMap', function(LocalDataSvc, SelectGeorgiaSvc, GoogleMapsSvc, ToastrSvc) {
	return {
		restrict: 'A',
		template: '<div style="height: 350px; border: solid 1px lightgray; border-radius:2px;"></div>',
		replace: true,
		scope: {
			corridorId: '@'
		},
		link: function(scope, element, attrs) {

			LocalDataSvc.Corridors.get(scope.corridorId).success(function(data) {
				/* Get local corridor counties */
				var counties = data.counties;
				/* var overlayOptions = GoogleMapsSvc.defaultPolygonOptions; *./
				var queryParams = SelectGeorgiaSvc.corridor.getQueryParams(counties);//, overlayOptions);
			var layerId = SelectGeorgiaSvc.layerId.COUNTIES;

			/* Get SelectGeorgia county geometry */
			SelectGeorgiaSvc.get(layerId, queryParams)
			.then(decoratedSuccessCallback(counties))
			['catch'](errorCallback);
		});

			var decoratedSuccessCallback = function(counties) {

				return function(agsData) {
					/* Draw Google Map */

					var mapCanvas = element[0];
					var currentPath = '#/corridor/' + scope.corridorId + '/county/';
					var latLng = new GoogleMapsSvc.maps.LatLng(0,0);
					var mapOptions = {
						center: latLng,
						zoom: 5
					};
					var map = new GoogleMapsSvc.maps.Map(mapCanvas, mapOptions);
					var agsCounties = agsData.features;
					var bounds = new GoogleMapsSvc.maps.LatLngBounds();

					angular.forEach(agsCounties, function(agsCounty){
						var agsCountyName = agsCounty.attributes.NAME;
						var origpolygon = agsCounty.geometry[0];

						
						var pathArray = origpolygon.getPaths().getAt(0).getArray();
						
						var newPathArray = [];
						for (var i = 0; i < pathArray.length; i++) {
							newPathArray.push({
								lat : pathArray[i].d,
								lng : pathArray[i].e
							})
						};
						
						var encPaths = angular.toJson(newPathArray, false);
						/* Alternative method:
						var encPaths = GoogleMapsSvc.maps.geometry.encoding.encodePath(pathArray);
						*/

						var decPaths = angular.fromJson(encPaths);
						/* Alternative method:
						var decPaths = GoogleMapsSvc.maps.geometry.encoding.decodePath(encPaths);
						*/

						var latLngs = [];
						for (var i = 0; i < decPaths.length; i++) {
							
							var latLng = new GoogleMapsSvc.maps.LatLng(decPaths[i].lat, decPaths[i].lng);
							
							latLngs.push(latLng)
						};
						

						var polygon = new GoogleMapsSvc.maps.Polygon({
							paths: latLngs
						});

						polygon.countyName = agsCountyName;

						var polygonBounds = polygon.getBounds();
						bounds.extend(polygonBounds.getNorthEast());
						bounds.extend(polygonBounds.getSouthWest());
						var cntr = polygonBounds.getCenter();

						polygon.setMap(map);
						var labelOptions = GoogleMaps.labels.getLabelOptions(agsCountyName, cntr, map);
						new GoogleMapsSvc.MapLabel(labelOptions);
						GoogleMapsSvc.maps.event.addListener(polygon, 'click', function(evt) {
							var polygon = this;
							var url = currentPath + polygon.countyName.toLowerCase();
							document.location = url;
						});
						GoogleMapsSvc.addPolygonHover(polygon);
					});
					bounds = GoogleMapsSvc.removeBoundsPadding(bounds);
						map.fitBounds(bounds);
					};

					};

					var errorCallback = function(typeError) {
						ToastrSvc.error('Sorry, an error occurred while loading the map.');
					};

					}
					};
});

