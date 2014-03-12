'use strict';

angular.module('gccApp')
.factory('selectGeorgia_SitesSvc', function(SelectGeorgiaSvc, selectGeorgia_CountiesSvc) {

	var self = this;

	self.currentPropertyName;
	
	self.getDetail = function(siteId) {
		var queryParams = {
			returnGeometry: true,
			where: 'SITE_ID = \'' + siteId + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.SITES;
		var queryKey = 'SITE_' + siteId;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	self.getByCounty = function(countyId) {
		var countyName = selectGeorgia_CountiesSvc.countyIdToCountyName(countyId);
		return _getByCountyName(countyName);
	};

	self.getCountyCities = function(countyId) {
		var countyName = selectGeorgia_CountiesSvc.countyIdToCountyName(countyId);
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY = \'' + countyName + '\'',
			outFields: 'COUNTY, CITY'
		};
		var layerId = SelectGeorgiaSvc.layerId.SITES;
		var queryKey = 'SITE_COUNTY_CITIES_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	var _getByCountyName = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY = \'' + countyName + '\'',
			outFields: self.layerOutFields
		};
		var layerId = SelectGeorgiaSvc.layerId.SITES;
		var queryKey = 'SITES_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	self.searchFields = {
		Property: {
			Type: 		'Site',
			LayerId: 	SelectGeorgiaSvc.layerId.SITES,
			Id: 		'SITE_ID',
			Listing: 	'SALE_LEASE',
			Acres: 		'TOTAL_ACRES'
		},
		Proximity: {
			TableId: 	SelectGeorgiaSvc.tableId.INDUSTRIAL_BUILDINGS_PROXIMITY,
			Airport: 	'DISTANCE_AIRPORT',
			Port: 		'DISTANCE_PORT',
			Intermodal: 'DISTANCE_INTERMODAL'
		},
		Location: {
			Corridor: 	'',
			Tier: 		-1,
			County: 	'COUNTY',
			City: 		'CITY'
		}
	};

	self.layerOutFields = [
	'OBJECTID',
	'SITE_ID',
	'NAME',
	'LINK',
	'CITY',
	'ZIP_CODE',
	'SALE_LEASE',
	'ZONING_DESCRIPTION',
	'REMAINING_ACRES',
	'RAIL_SERVED',
	'SEWER_ON_SITE',
	'WATER_ON_SITE'
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
