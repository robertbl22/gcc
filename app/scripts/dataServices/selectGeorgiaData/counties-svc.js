'use strict';

angular.module('gccApp')
.factory('sgCountiesSvc', function($q, SelectGeorgiaSvc) {
	
	this.get = function(countyId) {
		var countyName = this.countyIdToCountyName(countyId);
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
		var countyName = this.countyIdToCountyName(countyId);
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

	this.countyIdToCountyName = function(countyId) {
		var countyName = countyId.replace('-', ' ');
		countyName = _capitalize(countyName);
		return countyName;
	};

	var _capitalize = function(str)
	{
		var pieces = str.split(" ");
		for ( var i = 0; i < pieces.length; i++ )
		{
			var j = pieces[i].charAt(0).toUpperCase();
			pieces[i] = j + pieces[i].substr(1);
		}
		return pieces.join(" ");
	}

	return this;

});



