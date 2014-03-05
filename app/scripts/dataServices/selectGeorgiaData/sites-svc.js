'use strict';

angular.module('gccApp')
.factory('SelectGeorgia_SitesSvc', function(SelectGeorgiaSvc, SelectGeorgia_CountiesSvc) {

	this.currentPropertyName;
	
	this.getDetail = function(siteId) {
		var queryParams = {
			returnGeometry: true,
			where: 'SITE_ID = \'' + siteId + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.SITES;
		var queryKey = 'SITE_' + siteId;
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
			outFields: this.listOutFields
		};
		var layerId = SelectGeorgiaSvc.layerId.SITES;
		var queryKey = 'SITES_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	this.listOutFields = [
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

	return this;

});
