'use strict';

angular.module('gccApp')
.factory('SelectGeorgiaSvc', function($window, $q, $cacheFactory) {

	var _cache = $cacheFactory('SelectGeorgiaCache', {capacity: 20});

	var _gmaps = $window.gmaps;

	var _layerId = {
		OFFICES: 0,
		INDUSTRIAL: 1,
		SITE_REMAINING: 2,
		SITES: 3,
		GEORGIA: 4,
		AIRPORTS: 5,
		PORTS: 6,
		INTERMODAL: 7,
		RAILROADS: 8,
		WETLANDS: 9,
		FLOOD_ZONES: 10,
		INCENTIVE_ZONES: 11,
		CITIES: 12,
		COUNTIES: 13
	};

	var _getLayer = function(layerId) {
		var url = 'http://maps.selectgeorgia.com/arcgis/rest/services/GISPlanningLayers/MapServer';
		return new _gmaps.ags.Layer(url + '/' + layerId);
	};

	var _get = function(layerId, queryParams, cacheKey) {
		if(cacheKey) {
			return _getCached(layerId, queryParams, cacheKey);
		} else {
			return _getUncached(layerId, queryParams);
		}
	}

	var _getCached = function(layerId, queryParams, cacheKey) {
		var cachedObj = _cache.get(cacheKey);
		if(angular.isDefined(cachedObj)) {
			var defer = $q.defer();
			defer.resolve(cachedObj);
			return defer.promise;
		}
		var promise = _get(layerId, queryParams);
		return promise.then(function(data) {
			/* console.log('angular.equals(data, cachedObj) =', angular.equals(data, cachedObj)) */
			var cacheCopy = angular.copy(data);
			_cache.put(cacheKey, cacheCopy);
			return data;
		});
	};

	var _getUncached = function(layerId, queryParams) {
		var defer = $q.defer();
		var callback = function(data) {
			defer.resolve(data);
		};
		var errback = function(err) {
			defer.reject(err);
		};
		var layer = _getLayer(layerId);
		layer.query(queryParams, callback, errback);
		return defer.promise;
	};

	return {
		get: _get,
		layerId: _layerId
	}

});
