'use strict';

var app = angular.module('gccApp');

app.factory('GPCountySvc', function($http) {
	return {
		get: function(CountyId) {
			//console.log('GPCountySvc.get() firing! Setting isLoaded to "loading data"');
			//LoadingSvc.isLoading = 'loading data';
			if(CountyId) {
				var url = 'http://maps.selectgeorgia.com/arcgis/rest/services/GISPlanningLayers/MapServer/13/query?where=LOWER%28NAME%29%3D%27' + CountyId + '%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson&callback=JSON_CALLBACK'
				return $http.jsonp(url, {cache: true});
			}
		}
	};
});

app.factory('AggregatedCountySvc', function($http, $q, LocalDataSvc, GPCountySvc) {
	/* 
	Merges app's county data with Georgia Power's data.
	*/
	return {
		get: function(CountyId) {
			return LocalDataSvc.Counties.get(CountyId, {cache: true})
			.success(function(response) {
				GPCountySvc.get(CountyId, {cache: true})
				.success(function(response2) {
					if(response2.features.length > 0) {
						var county = response2.features[0].attributes;
						for (var attrname in county) {
							response[attrname] = county[attrname];
						}
					} // TODO: Add data failure handler
					response.fieldAliases = response2.fieldAliases;
					return response;
				});
			});

		}
	};
});

app.factory('GPCountyGeometrySvc', function($http) {
	return {
		get: function(CountyId) {
			var url = 'http://maps.selectgeorgia.com/arcgis/rest/services/GISPlanningLayers/MapServer/13/query?where=LOWER%28NAME%29%3D%27' + CountyId + '%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=NAME&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson&callback=JSON_CALLBACK';
			return $http.jsonp(url, {cache: true});
		}
	};
});
