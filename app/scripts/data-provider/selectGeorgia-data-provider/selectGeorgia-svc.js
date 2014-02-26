'use strict';

angular.module('gccApp')
.factory('SelectGeorgiaSvc', function CountySvc($http, $window, $q, $cacheFactory) {

	var cache = $cacheFactory('SelectGeorgiaCache', {capacity: 20});

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

	var _getCountiesListString = function(counties) {
		var countiesStr = '';
		for (var i = 0; i < counties.length; i++) {
			countiesStr += '\'' + counties[i].name + '\'';
			if(i < counties.length -1) {
				countiesStr += ', '
			}
		};
		return countiesStr;
	};

	var getLayer = function(layerId) {
		var url = 'http://maps.selectgeorgia.com/arcgis/rest/services/GISPlanningLayers/MapServer';
		return new _gmaps.ags.Layer(url + '/' + layerId);
	};

	var cachedGet = function(layerId, queryParams, cacheKey) {
		var cachedObj = cache.get(cacheKey);
		if(angular.isDefined(cachedObj)) {
			var defer = $q.defer();
			defer.resolve(cachedObj);
			return defer.promise;
		}
		var promise = get(layerId, queryParams);
		return promise.then(function(data) {
			console.log('angular.equals(data, cachedObj)', angular.equals(data, cachedObj))
			var cacheCopy = angular.copy(data);
			cache.put(cacheKey, cacheCopy);
			return data;
		});
	};

	var get = function(layerId, queryParams) {
		var defer = $q.defer();
		var callback = function(data) {
			defer.resolve(data);
		};
		var errback = function(err) {
			defer.reject(err);
		};
		var layer = getLayer(layerId);
		layer.query(queryParams, callback, errback);
		return defer.promise;
	};

	var getSite = function(propertyId) {
		var queryParams = getSiteQueryParams(propertyId);
		var layerId = _layerId.SITES;
		var queryKey = 'SITE_' + propertyId;
		return get(layerId, queryParams, queryKey);
	}

	var getCorridorQueryParams = function(counties) {//, overlayOptions) {
		var countiesStr = _getCountiesListString(counties);
		return {
			returnGeometry: false,
			where: 'NAME IN (' + countiesStr + ')',
			outFields: ['NAME'],
			//overlayOptions: overlayOptions,
			maxAllowableOffset: 0.0085
		};
	};

	var getSiteQueryParams = function(siteId) {//, overlayOptions) {
	return {
		returnGeometry: true,
		where: 'SITE_ID = \'' + siteId + '\'',
			//outFields: ['NAME', 'LATITUDE', 'LONGITUDE'],
			outFields: '*'
			//,overlayOptions: overlayOptions
		};
	};

	return {
		//corridor: {
			//getQueryParams: getCorridorQueryParams
		//},
		//county: {
			//getQueryParams: getCountyQueryParams
		//},
		site: {
			get: getSite,
			getQueryParams: getSiteQueryParams
		},
		get: cachedGet,
		layerId: _layerId
	};

});
