'use strict';

angular.module('gccApp')
.factory('sgCountiesSvc', function(SelectGeorgiaSvc) {
	
	this.get = function(countyName) {
		var queryParams = {
			returnGeometry: false,
			where: 'NAME = \'' + countyName + '\'',
			outFields: '*'
		};
		var layerId = SelectGeorgiaSvc.layerId.COUNTIES;
		var queryKey = 'COUNTY_' + countyName;
		return SelectGeorgiaSvc.get(layerId, queryParams, queryKey);
	};

	return this;

});
