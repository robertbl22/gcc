'use strict';

var app = angular.module('gccApp');

app.factory('CountiesSvc', function($http) {
	return {
		get: function(CountyId) {
			if(CountyId) {
				return $http.get('scripts/data/counties/' + CountyId + '.json', {cache: true});
			}
			else {
				return $http.get('scripts/data/counties.json', {cache: true});
			}
		}
	};
});

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

app.factory('AggregatedCountySvc', function($http, $q, CountiesSvc, GPCountySvc) {
	/* 
	Merges app's county data with Georgia Power's data.
	*/
	return {
		get: function(CountyId) {
			return CountiesSvc.get(CountyId, {cache: true})
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

/*app.factory('FusionCountySvc', function($http) {
	return {
		get: function(CountyName) {
			var url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20*%20FROM%201EFHrj7EGO1SsrtWFei1tjjhV9A7JWWKgcVNFDQ%20WHERE%20%27County%20Name%27%20CONTAINS%20IGNORING%20CASE%20%27' + CountyName + '%27&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ';
			return $http.get(url, {cache: true});
		}
	};
});*/
