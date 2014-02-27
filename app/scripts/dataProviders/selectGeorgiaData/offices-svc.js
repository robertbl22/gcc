'use strict';

angular.module('gccApp')
.factory('OfficesSvc', function(SelectGeorgiaSvc) {

	this.currentPropertyName;
	
	this.get = function(propertyId) {
		var queryParams = {
			returnGeometry: false,
			where: 'BUILDING_ID = \'' + propertyId + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.OFFICES;
		var queryKey = 'OFFICE_' + propertyId;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	this.getByCounty = function(countyName) {
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
