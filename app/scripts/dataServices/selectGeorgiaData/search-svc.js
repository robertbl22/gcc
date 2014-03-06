'use strict';

angular.module('gccApp')
.factory('SelectGeorgia_SearchSvc', function(
	SelectGeorgiaSvc,
	SearchParametersSvc,
	SelectGeorgia_OfficesSvc,
	SelectGeorgia_IndustrialSvc,
	SelectGeorgia_SitesSvc,
	SearchConditionBuilder
	) {

	var self = this;

	self.getResults = function(searchParams) {
		var queryParams = self._getQueryParams(searchParams);
		console.log('queryParams',queryParams)
		return SelectGeorgiaSvc.get(queryParams.layerId, queryParams);
	};

	self._getQueryParams = function(searchParams) {
		switch(searchParams.Property.Type) {
			case SearchParametersSvc.PropertyType.OFFICE :
			return self._getOfficeConfig(searchParams);
			case SearchParametersSvc.PropertyType.INDUSTRIAL :
			return self._getIndustrialConfig(searchParams);
			case SearchParametersSvc.PropertyType.SITE :
			return self._getSiteConfig(searchParams);
			default: return '*';
		};
	};

	self._getOfficeConfig = function(searchParams) {
		var searchFields = SelectGeorgia_OfficesSvc.searchFields;
		var where = SearchConditionBuilder.getOfficeWhere(searchFields, searchParams);
		return {
			returnGeometry: false,
			outFields: SelectGeorgia_OfficesSvc.listOutFields,
			layerId: SelectGeorgiaSvc.layerId.OFFICES,
			where: where
		};
	};

	self._getIndustrialConfig = function(searchParams) {
		var searchFields = SelectGeorgia_IndustrialSvc.searchFields;
		var where = SearchConditionBuilder.getIndustrialWhere(searchFields, searchParams);
		return {
			returnGeometry: false,
			outFields: SelectGeorgia_IndustrialSvc.listOutFields,
			layerId: SelectGeorgiaSvc.layerId.INDUSTRIAL,
			where: where
		};
	};

	self._getSiteConfig = function(searchParams) {
		var searchFields = SelectGeorgia_SitesSvc.searchFields;
		var where = SearchConditionBuilder.getSiteWhere(searchFields, searchParams);
		return {
			returnGeometry: false,
			outFields: SelectGeorgia_SitesSvc.listOutFields,
			layerId: SelectGeorgiaSvc.layerId.SITES,
			where: where
		};
	};

	return self;

});

