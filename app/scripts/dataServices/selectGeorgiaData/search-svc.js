'use strict';

angular.module('gccApp')
.factory('SelectGeorgia_SearchSvc', function(
	SelectGeorgiaSvc, 
	SearchParametersSvc, 
	SelectGeorgia_OfficesSvc, 
	SelectGeorgia_IndustrialSvc, 
	SelectGeorgia_SitesSvc
	) {

	this.getResults = function(searchParams) {
		var queryParams = _getQueryParams(searchParams);
		console.log('queryParams',queryParams)
		return SelectGeorgiaSvc.get(queryParams.layerId, queryParams);
	};

	function _getQueryParams(searchParams) {
		switch(searchParams.Property.Type) {
			case SearchParametersSvc.PropertyType.OFFICE :
			return _getOfficeConfig(searchParams);
			case SearchParametersSvc.PropertyType.INDUSTRIAL :
			return _getIndustrialConfig(searchParams);
			case SearchParametersSvc.PropertyType.SITE :
			return _getSiteConfig(searchParams);
			default: return '*';
		};
	};

	function _getOfficeConfig(searchParams) {
		return {
			returnGeometry: false,
			outFields: SelectGeorgia_OfficesSvc.listOutFields,
			layerId: SelectGeorgiaSvc.layerId.OFFICES,
			where: _getWhere(searchParams)
		};
	};

	function _getIndustrialConfig(searchParams) {
		;
		return {
			returnGeometry: false,
			outFields: SelectGeorgia_IndustrialSvc.listOutFields,
			layerId: SelectGeorgiaSvc.layerId.INDUSTRIAL,
			where: _getWhere(searchParams)
		};
	};

	function _getSiteConfig(searchParams) {
		
		return {
			returnGeometry: false,
			outFields: SelectGeorgia_SitesSvc.listOutFields,
			layerId: SelectGeorgiaSvc.layerId.SITES,
			where: _getWhere(searchParams)
		};
	};

	function _getWhere(searchParams) {
		var where = _getCityWhereClause(searchParams.Location.City);
		return where;
	};

	function _getCityWhereClause(city) {
		var where = 'CITY = \'' + city + '\'';
		return where;
	};

	return this;

});

