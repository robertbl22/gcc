'use strict';

angular.module('gccApp')
.factory('SitesSvc', function(SelectGeorgiaSvc) {

	this.currentPropertyName;
	
	this.get = function(siteId) {
		var queryParams = {
			returnGeometry: true,
			where: 'SITE_ID = \'' + siteId + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.SITES;
		var queryKey = 'SITE_' + siteId;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	this.getByCounty = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			where: 'COUNTY = \'' + countyName + '\'',
			outFields: [
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
			]
		};
		var layerId = SelectGeorgiaSvc.layerId.SITES;
		var queryKey = 'SITES_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	}

	return this;

});
