'use strict';

var app = angular.module('gccApp');

app.factory('PropertySvc', function($http, GpRestSvcConfig) {
	var cfg = GpRestSvcConfig;
	return {
		get: function(PropertyType, FilterValue, FilterFieldName) {
			if(PropertyType && FilterValue) {
				var propkey = cfg.getPropertyKey(PropertyType, FilterFieldName);
				var qs = '&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson&callback=JSON_CALLBACK';
				var url = cfg.ServiceRoot + propkey.type + '/query?where=LOWER%28' + propkey.field + '%29%3D%27' + FilterValue + '%27' + qs;
				return $http.jsonp(url, {cache: true});
			}
		}
	}
});

app.factory('GPPropertyCountSvc', function($http, GpRestSvcConfig) {
	var cfg = GpRestSvcConfig;
	return {
		get: function(CountyId, PropertyType) {
			var propkey = cfg.getPropertyKey(PropertyType, 'CountyId');
			var endpoint = cfg.ServiceRoot;
			var qs = '&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson&callback=JSON_CALLBACK';
			if(CountyId) {
				var url = endpoint + propkey.type + '/query?where=LOWER%28' + propkey.field + '%29%3D%27' + CountyId + '%27' + qs;
				return $http.jsonp(url, {cache: true});
			}
		}
	}
});

app.factory('GPPropertiesCountSvc', function($q, GPPropertyCountSvc) {
	return {
		get: function(CountyId) {
			var officeCount = GPPropertyCountSvc.get(CountyId, 'Office');
			var industrialCount = GPPropertyCountSvc.get(CountyId, 'Industrial');
			var siteCount = GPPropertyCountSvc.get(CountyId, 'Site');
			return $q.all([
				officeCount.then(function(val){
					return val.data.count; 
				}),
				industrialCount.then(function(val){
					return val.data.count; 
				}),
				siteCount.then(function(val){
					return val.data.count; 
				})
				])
			.then(function(vals){
				return {
					offices: vals[0],
					industrial: vals[1],
					sites: vals[2],
				}; 
			});
		}
	}
});