'use strict';

/*
IMPORTANT NOTE:
'LocalData_' methods return $http promise with 'success()' and 'error()'.
'SelectGeorgia_' methods return a $q promise with 'then()' and 'catch()'.
*/

angular.module('gccApp')
.factory('DataService', function( 
	LocalData_CorridorsSvc, 
	LocalData_CountiesSvc, 
	SelectGeorgia_CountiesSvc,
	SelectGeorgia_OfficesSvc, 
	SelectGeorgia_IndustrialSvc, 
	SelectGeorgia_SitesSvc
	) {

	return {
		county: {
			getAll: 				LocalData_CountiesSvc.getAll,
			getOverview: 			LocalData_CountiesSvc.getOverview,
			getDetail: 				SelectGeorgia_CountiesSvc.getDetail,
			getPropertiesCount: 	SelectGeorgia_CountiesSvc.getPropertiesCount
		},
		corridor: {
			getAll: 				LocalData_CorridorsSvc.getAll,
			getOverview: 			LocalData_CorridorsSvc.getOverview,
			getByCounty: 			LocalData_CorridorsSvc.getByCounty
		},
		office: {
			currentPropertyName: 	SelectGeorgia_OfficesSvc.currentPropertyName,
			getDetail: 				SelectGeorgia_OfficesSvc.getDetail,
			getByCounty: 			SelectGeorgia_OfficesSvc.getByCounty,
			getCountyCities: 		SelectGeorgia_OfficesSvc.getCountyCities
		},
		industrial: {
			currentPropertyName: 	SelectGeorgia_IndustrialSvc.currentPropertyName,
			getDetail: 				SelectGeorgia_IndustrialSvc.getDetail,
			getByCounty: 			SelectGeorgia_IndustrialSvc.getByCounty,
			getCountyCities: 		SelectGeorgia_IndustrialSvc.getCountyCities
		},
		site: {
			currentPropertyName: 	SelectGeorgia_SitesSvc.currentPropertyName,
			getDetail: 				SelectGeorgia_SitesSvc.getDetail,
			getByCounty: 			SelectGeorgia_SitesSvc.getByCounty,
			getCountyCities: 		SelectGeorgia_SitesSvc.getCountyCities
		}
	};

});