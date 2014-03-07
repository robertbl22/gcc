'use strict';

angular.module('gccApp')
.factory('SearchLocationSvc', function($q, DataService, SearchParametersSvc) {

	this.getCities = function(propertyType, countyName) {
		if(countyName != '') {
			return _getCountyCities(propertyType, countyName)
		} else {
			var defer = $q.defer();
			defer.resolve({features:[]});
			return defer.promise;
		}
	};

	this.isCountyInArray = function(currentItem, collection) {
		for (var i = collection.length - 1; i >= 0; i--) {
			if(collection[i].name === currentItem) {
				return true;
			};
		};
		return false;
	};

	this.isCityInArray = function(currentItem, collection) {
		for (var i = collection.length - 1; i >= 0; i--) {
			if(collection[i].attributes.CITY === currentItem) {
				return true;
			};
		};
		return false;
	};

	this.getCounties = function(corridorName) {
		if(corridorName != '') {
			return _getCorridorCounties(corridorName);
		} else {
			return _getAllCounties();
		};
	};

	function _getCountyCities(propertyType, countyName) {
		var ds = _getCitiesDataSource(propertyType);
		var promise = ds.getCountyCities(countyName);
		return promise;
	};

	function _getCitiesDataSource(propertyType) {
		switch(propertyType) {
			case SearchParametersSvc.PropertyType.OFFICE: return DataService.office;
			case SearchParametersSvc.PropertyType.SITE: return DataService.site;
			default: return DataService.industrial;
		}
	};

	function _getAllCounties() {
		var defer = $q.defer();
		DataService.county.getAll()
		.success(function(data) {
			defer.resolve(data);
		})
		.error(function() {
			defer.reject();
		});
		return defer.promise;
	};

	function _getCorridorCounties(corridorName) {
		var defer = $q.defer();
		DataService.corridor.getOverview(corridorName)
		.success(function(data) {
			defer.resolve(data.counties);
		})
		.error(function() {
			defer.reject();
		});
		return defer.promise;
	};
	return this;
});