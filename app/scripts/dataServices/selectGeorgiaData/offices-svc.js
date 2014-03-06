'use strict';

angular.module('gccApp')
.factory('SelectGeorgia_OfficesSvc', function(SelectGeorgiaSvc, SelectGeorgia_CountiesSvc) {

	this.currentPropertyName;
	
	this.getDetail = function(propertyId) {
		var queryParams = {
			returnGeometry: false,
			where: 'BUILDING_ID = \'' + propertyId + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.OFFICES;
		var queryKey = 'OFFICE_' + propertyId;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	this.getByCounty = function(countyId) {
		var countyName = SelectGeorgia_CountiesSvc.countyIdToCountyName(countyId);
		return _getByCountyName(countyName);
	};

	this.getCountyCities = function(countyId) {
		var countyName = SelectGeorgia_CountiesSvc.countyIdToCountyName(countyId);
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY_NAME = \'' + countyName + '\'',
			outFields: 'COUNTY_NAME, CITY'
		};
		var layerId = SelectGeorgiaSvc.layerId.OFFICES;
		var queryKey = 'OFFICE_COUNTY_CITIES_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	var _getByCountyName = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY_NAME = \'' + countyName + '\'',
			outFields: this.listOutFields
		};
		var layerId = SelectGeorgiaSvc.layerId.OFFICES;
		var queryKey = 'OFFICE_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	this.searchFields = {
		Property: {
			Type: 		'Office',
			LayerId: 	SelectGeorgiaSvc.layerId.OFFICES,
			Id: 		'BUILDING_ID',
			Listing:	'SALE_LEASE',
			SqFt: 		'BUILDING_SIZE',
			Acres: 		'LOT_SIZE'
		},
		Proximity: {
			TableId: 	SelectGeorgiaSvc.tableId.OFFICE_BUILDINGS_PROXIMITY,
			Airport: 	'DISTANCE_AIRPORT',
			Atlanta: 	'DISTANCE_ATLANTA',
			Interstate: 'DISTANCE_INTERSTATE',
			Highway: 	'DISTANCE_HIGHWAY'
		},
		Location: {
			Corridor: 	'',
			Tier: 		-1,
			County: 	'COUNTY_NAME',
			City: 		'CITY'
		}
	};

	this.listOutFields = [
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
	];

	return this;

});
