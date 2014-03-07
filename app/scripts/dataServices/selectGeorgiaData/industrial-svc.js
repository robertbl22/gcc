'use strict';

angular.module('gccApp')
.factory('SelectGeorgia_IndustrialSvc', function(SelectGeorgiaSvc, SelectGeorgia_CountiesSvc) {

	var self = this;

	self.currentPropertyName;
	
	self.getDetail = function(propertyId) {
		var queryParams = {
			returnGeometry: false,
			where: 'BUILDING_ID = \'' + propertyId + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.INDUSTRIAL;
		var queryKey = 'INDUSTRIAL_' + propertyId;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	self.getByCounty = function(countyId) {
		var countyName = SelectGeorgia_CountiesSvc.countyIdToCountyName(countyId);
		return _getByCountyName(countyName);
	};

	self.getCountyCities = function(countyId) {
		var countyName = SelectGeorgia_CountiesSvc.countyIdToCountyName(countyId);
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY_NAME = \'' + countyName + '\'',
			outFields: 'COUNTY_NAME, CITY'
		};
		var layerId = SelectGeorgiaSvc.layerId.INDUSTRIAL;
		var queryKey = 'INDUSTRIAL_COUNTY_CITIES_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	var _getByCountyName = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY_NAME = \'' + countyName + '\'',
			outFields: self.layerOutFields
		};
		var layerId = SelectGeorgiaSvc.layerId.INDUSTRIAL;
		var queryKey = 'INDUSTRIAL_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	self.searchFields = {
		Property: {
			Type: 		'Industrial',
			LayerId: 	SelectGeorgiaSvc.layerId.INDUSTRIAL,
			Id: 		'BUILDING_ID',
			Listing: 	'SALE_LEASE',
			SqFt: 		'BUILDING_SIZE'
		},
		Proximity: {
			TableId: 	SelectGeorgiaSvc.tableId.SITE_PROXIMITY,
			Airport: 	'DISTANCE_AIRPORT',
			Port: 		'DISTANCE_PORT',
			Intermodal: 'DISTANCE_INTERMODAL'
		},
		Location: {
			Corridor: 	'',
			Tier: 		-1,
			County: 	'COUNTY_NAME',
			City: 		'CITY'
		}
	};

	self.layerOutFields = [
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

	/*self.tableOutFields = [
	'OBJECTID',
	'BUILDING_ID',
	'DISTANCE_AIRPORT',
	'DISTANCE_PORT',
	'DISTANCE_INTERMODAL' 
	];*/

	return self;

});
