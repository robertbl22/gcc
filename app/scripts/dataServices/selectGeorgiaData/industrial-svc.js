'use strict';

angular.module('gccApp')
.factory('IndustrialSvc', function(SelectGeorgiaSvc, sgCountiesSvc) {

	this.currentPropertyName;
	
	this.get = function(propertyId) {
		var queryParams = {
			returnGeometry: false,
			where: 'BUILDING_ID = \'' + propertyId + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.INDUSTRIAL;
		var queryKey = 'INDUSTRIAL_' + propertyId;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	this.getByCountyId = function(countyId) {
		var countyName = sgCountiesSvc.countyIdToCountyName(countyId);
		return _getByCountyName(countyName);
	};

	this.getCountyCities = function(countyId) {
		var countyName = sgCountiesSvc.countyIdToCountyName(countyId);
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY = \'' + countyName + '\'',
			outFields: 'CITY'
		};
		var layerId = SelectGeorgiaSvc.layerId.COUNTIES;
		var queryKey = 'INDUSTRIAL_COUNTY_CITIES_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	var _getByCountyName = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY_NAME = \'' + countyName + '\'',
			outFields: [
			'OBJECTID',
			'BUILDING_ID',
			'NAME',
			'PHOTO_LINK',
			'ADDRESS',
			'CITY',
			'ZIP_CODE',
			'SALE_LEASE',
			'YEAR_BUILT',
			'SPACE_AVAILABLE'
			]
		};
		var layerId = SelectGeorgiaSvc.layerId.INDUSTRIAL;
		var queryKey = 'INDUSTRIAL_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	}

	return this;

});
