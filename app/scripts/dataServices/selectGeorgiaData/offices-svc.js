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
		var layerId = SelectGeorgiaSvc.layerId.OFFICES;
		var queryKey = 'OFFICE_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	}





	return this;

});
