'use strict';

/*
IMPORTANT NOTE:
'localData_' methods return $http promise with 'success()' and 'error()'.
'selectGeorgia_' methods return a $q promise with 'then()' and 'catch()'.
*/

angular.module('gccApp')
.factory('DataService', function(
	/*jshint camelcase: false */
	localData_CorridorsSvc,
	localData_CountiesSvc,
	selectGeorgia_CountiesSvc,
	selectGeorgia_OfficesSvc,
	selectGeorgia_IndustrialSvc,
	selectGeorgia_SitesSvc,
	selectGeorgia_SearchSvc
	) {

	return {
		county: {
			getAll:					localData_CountiesSvc.getAll,
			getOverview:			localData_CountiesSvc.getOverview,
			countyNameToCountyId:	localData_CountiesSvc.countyNameToCountyId,
			getDetail:				selectGeorgia_CountiesSvc.getDetail,
			getPropertiesCount:		selectGeorgia_CountiesSvc.getPropertiesCount
		},
		corridor: {
			getAll:					localData_CorridorsSvc.getAll,
			getOverview:			localData_CorridorsSvc.getOverview,
			getByCounty:			localData_CorridorsSvc.getByCounty
		},
		office: {
			currentPropertyName:	selectGeorgia_OfficesSvc.currentPropertyName,
			getDetail:				selectGeorgia_OfficesSvc.getDetail,
			getByCounty:			selectGeorgia_OfficesSvc.getByCounty,
			getCountyCities:		selectGeorgia_OfficesSvc.getCountyCities,
			layerOutFields:			selectGeorgia_OfficesSvc.layerOutFields
		},
		industrial: {
			currentPropertyName:	selectGeorgia_IndustrialSvc.currentPropertyName,
			getDetail:				selectGeorgia_IndustrialSvc.getDetail,
			getByCounty:			selectGeorgia_IndustrialSvc.getByCounty,
			getCountyCities:		selectGeorgia_IndustrialSvc.getCountyCities,
			layerOutFields:			selectGeorgia_IndustrialSvc.layerOutFields
		},
		site: {
			currentPropertyName:	selectGeorgia_SitesSvc.currentPropertyName,
			getDetail:				selectGeorgia_SitesSvc.getDetail,
			getByCounty:			selectGeorgia_SitesSvc.getByCounty,
			getCountyCities:		selectGeorgia_SitesSvc.getCountyCities,
			layerOutFields:			selectGeorgia_SitesSvc.layerOutFields
		},
		search: {
			getResults:				selectGeorgia_SearchSvc.getResults
		}
	};

});