'use strict';

angular.module('gccApp')
.directive('countyMap', function(GoogleMapSvc, SelectGeorgiaSvc, ToastrSvc) {
	return {
		restrict: 'A',
		template: '<div style="height: 350px; border: solid 1px lightgray; border-radius:2px;"></div>',
		replace: true,
		scope: {
			countyId: '@'
		},
		link: function(scope, element, attrs) {

			var mapCanvas = element[0];

			var agsQueryParams = {
				returnGeometry: true,
				where: 'LOWER(NAME) = \'' + scope.countyId + '\'',
				outFields: ['NAME','JOB_TAX_CREDIT_TIER'],
				overlayOptions: GoogleMapSvc.defaultPolygonOptions,
				maxAllowableOffset: 0.004
			};

			var successCallback = function(data) {
				if(data.features.length > 0) {
					var feat = data.features[0];
					var attrs = feat.attributes;
					var latLng = new GoogleMapSvc.maps.LatLng(0,0);
					var mapOptions = {
						center: latLng,
						zoom: 5
					};
					var map = new GoogleMapSvc.maps.Map(mapCanvas, mapOptions);
					var polygon = feat.geometry[0];


					var pathArray = polygon.getPaths().getAt(0).getArray();
					var newPathArray = [];
					for (var i = 0; i < pathArray.length; i++) {
						newPathArray.push({
							lat : pathArray[i].d,
							lng : pathArray[i].e
						})
					};
					var encPaths = angular.toJson(newPathArray, false);
					//var encPaths = GoogleMapSvc.maps.geometry.encoding.encodePath(pathArray);

					var bounds = polygon.getBounds();
					bounds = GoogleMapSvc.removeBoundsPadding(bounds);
					map.fitBounds(bounds);
					polygon.setMap(map);
					var cntr = bounds.getCenter();
					GoogleMapSvc.addCountyInfoWindow(map, attrs, cntr, polygon);
				} else {
					errorCallback(-1);
				}
			};

			var errorCallback = function(typeError) {
				ToastrSvc.error('Sorry, an error occurred while loading the map.');
			};

			var layerId = SelectGeorgiaSvc.layerId.COUNTIES;
			SelectGeorgiaSvc.get(layerId, agsQueryParams).then(successCallback)['catch'](errorCallback);
			
		}
	};
});
