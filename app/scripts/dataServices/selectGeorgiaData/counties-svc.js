'use strict';

angular.module('gccApp')
.factory('SelectGeorgia_CountiesSvc', function($q, SelectGeorgiaSvc) {
	
	this.getDetail = function(countyId) {
		var countyName = _countyIdToCountyName(countyId);
		var queryParams = {
			returnGeometry: false,
			where: 'NAME = \'' + countyName + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.COUNTIES;
		var queryKey = 'COUNTY_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	var _getSitesCount = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			returnCountOnly: true,
			where: 'COUNTY = \'' + countyName + '\'',
			outFields: ''
		};
		var layerId = SelectGeorgiaSvc.layerId.SITES;
		var queryKey = 'SITES_COUNT_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	var _getIndustrialCount = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			returnCountOnly: true,
			where: 'COUNTY_NAME = \'' + countyName + '\'',
			outFields: ''
		};
		var layerId = SelectGeorgiaSvc.layerId.INDUSTRIAL;
		var queryKey = 'INDUSTRIAL_COUNT_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	var _getOfficesCount = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			returnCountOnly: true,
			where: 'COUNTY_NAME = \'' + countyName + '\'',
			outFields: ''
		};
		var layerId = SelectGeorgiaSvc.layerId.OFFICES;
		var queryKey = 'SITES_COUNT_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	this.getPropertiesCount = function(countyId) {
		var countyName = _countyIdToCountyName(countyId);
		var officeCount = _getOfficesCount(countyName);
		var industrialCount = _getIndustrialCount(countyName);
		var siteCount = _getSitesCount(countyName);
		return $q.all([
			officeCount.then(function(data){
				return data.count; 
			}),
			industrialCount.then(function(data){
				return data.count; 
			}),
			siteCount.then(function(data){
				return data.count; 
			})
			])
		.then(function(vals){
			return {
				offices: vals[0],
				industrial: vals[1],
				sites: vals[2],
			}; 
		});
	};

	var _countyIdToCountyName = function(countyId) {
		var countyName;
		if(countyId){
			countyName = countyId.replace('-', ' ');
			countyName = _capitalize(countyName);
		};
		return countyName;
	};

	this.countyIdToCountyName = _countyIdToCountyName;

	var _capitalize = function(str)
	{
		var pieces = str.split(" ");
		for ( var i = 0; i < pieces.length; i++ )
		{
			var j = pieces[i].charAt(0).toUpperCase();
			pieces[i] = j + pieces[i].substr(1);
		}
		var newStr = pieces.join(" ");
		if(newStr==='Mcintosh') {
			newStr = 'McIntosh';
		}
		return newStr;
	}

	return this;

});



