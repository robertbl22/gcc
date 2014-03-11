'use strict';

angular.module('gccApp')
.factory('CorridorsSvc', function() {

	var _getCountiesListString = function(counties) {
		var countiesStr = '';
		for (var i = 0; i < counties.length; i++) {
			countiesStr += '\'' + counties[i].name + '\'';
			if(i < counties.length -1) {
				countiesStr += ', '
			}
		};
		return countiesStr;
	};

	var getCorridorQueryParams = function(counties) {
		var countiesStr = _getCountiesListString(counties);
		return {
			returnGeometry: false,
			where: 'NAME IN (' + countiesStr + ')',
			outFields: ['NAME'],
			maxAllowableOffset: 0.0085
		};
	};

});
