'use strict';

angular.module('gccApp')
.factory('selectGeorgia_SearchSvc', function(SelectGeorgiaSvc, SearchParametersSvc, Search_ConfigBuilder) {
	var self = this;

	self.getResults = function(searchParams) {
		var queryParams = self._getQueryParams(searchParams);
		return SelectGeorgiaSvc.get(queryParams.layer.layerId, queryParams.layer);
	};

	self._getQueryParams = function(searchParams) {
		switch(searchParams.Property.Type) {
			case SearchParametersSvc.PropertyType.OFFICE :
			return Search_ConfigBuilder.getOffice(searchParams);
			case SearchParametersSvc.PropertyType.INDUSTRIAL :
			return Search_ConfigBuilder.getIndustrial(searchParams);
			case SearchParametersSvc.PropertyType.SITE :
			return Search_ConfigBuilder.getSite(searchParams);
		};
	};

	self._getObjectIdsFromFeatures = function(features) {
		var objectIds = [];
		angular.forEach(features, function(item) {
			objectIds.push(item.attributes.OBJECTID);
		});
		return objectIds;
	};

	/* This search has been disabled because Select Georgia does
	not have data for the corridors the the tables */
	self.getResults2 = function(searchParams) {
		var queryParams = self._getQueryParams(searchParams);
		if(queryParams.table.where.length > 0) {
			SelectGeorgiaSvc.get(queryParams.layer.layerId, queryParams.layer)
			.then(function(data) {
				var objectIds = self._getObjectIdsFromFeatures(data.features);
				queryParams.table.objectIds = objectIds;
				SelectGeorgiaSvc.get(queryParams.table.tableId, queryParams.table)
				.then(function(data) {
				});
			});
		} else {
			return SelectGeorgiaSvc.get(queryParams.layer.layerId, queryParams.layer);
		}
	};

	return self;
});



angular.module('gccApp')
.factory('Search_ConfigBuilder', function(
	SelectGeorgiaSvc,
	selectGeorgia_OfficesSvc,
	selectGeorgia_IndustrialSvc,
	selectGeorgia_SitesSvc,
	Search_ConditionBuilder
	) {

	this.getOffice = function(searchParams) {
		return {
			layer: this.layer.getOffice(searchParams),
			table: this.table.getOffice(searchParams)
		}
	};
	this.getIndustrial = function(searchParams) {
		return {
			layer: this.layer.getIndustrial(searchParams),
			table: this.table.getIndustrial(searchParams)
		}
	};
	this.getSite = function(searchParams) {
		return {
			layer: this.layer.getSite(searchParams),
			table: this.table.getSite(searchParams)
		}
	};

	this.layer = {
		getOffice: function(searchParams) {
			var searchFields = selectGeorgia_OfficesSvc.searchFields;
			var where = Search_ConditionBuilder.layer.getOffice(searchFields, searchParams);
			return {
				returnGeometry: false,
				outFields: selectGeorgia_OfficesSvc.layerOutFields,
				layerId: SelectGeorgiaSvc.layerId.OFFICES,
				where: where
			};
		},
		getIndustrial: function(searchParams) {
			var searchFields = selectGeorgia_IndustrialSvc.searchFields;
			var where = Search_ConditionBuilder.layer.getIndustrial(searchFields, searchParams);
			return {
				returnGeometry: false,
				outFields: selectGeorgia_IndustrialSvc.layerOutFields,
				layerId: SelectGeorgiaSvc.layerId.INDUSTRIAL,
				where: where
			};
		},
		getSite: function(searchParams) {
			var searchFields = selectGeorgia_SitesSvc.searchFields;
			var where = Search_ConditionBuilder.layer.getSite(searchFields, searchParams);
			return {
				returnGeometry: false,
				outFields: selectGeorgia_SitesSvc.layerOutFields,
				layerId: SelectGeorgiaSvc.layerId.SITES,
				where: where
			};
		}
	}

	this.table = {
		getOffice: function(searchParams) {
			var searchFields = selectGeorgia_OfficesSvc.searchFields;
			var where = Search_ConditionBuilder.table.getOffice(searchFields, searchParams);
			return {
				returnGeometry: false,
				returnIdsOnly: true,
				objectIds: [],
				tableId: SelectGeorgiaSvc.tableId.OFFICE_BUILDINGS_PROXIMITY,
				where: where
			};
		},
		getIndustrial: function(searchParams) {
			var searchFields = selectGeorgia_IndustrialSvc.searchFields;
			var where = Search_ConditionBuilder.table.getIndustrial(searchFields, searchParams);
			return {
				returnGeometry: false,
				returnIdsOnly: true,
				objectIds: [],
				tableId: SelectGeorgiaSvc.tableId.INDUSTRIAL_BUILDINGS_PROXIMITY,
				where: where
			};
		},
		getSite: function(searchParams) {
			var searchFields = selectGeorgia_SitesSvc.searchFields;
			var where = Search_ConditionBuilder.table.getSite(searchFields, searchParams);
			return {
				returnGeometry: false,
				returnIdsOnly: true,
				objectIds: [],
				tableId: SelectGeorgiaSvc.tableId.SITE_PROXIMITY,
				where: where
			};
		}
	}

	return this;

});