'use strict';

var app = angular.module('gccApp');

app.controller('MainCtrl', function ($scope, BookmarksSvc, BreadcrumbSvc) {
	$scope.BookmarksIndex = BookmarksSvc.index;
	$scope.ControlName = 'MainCtrl';
	
	$scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
		BreadcrumbSvc.currentPath = absNewUrl;
		BreadcrumbSvc.previousPath = absOldUrl;
	});
	
});

app.value('GpRestSvcConfig', {
	'ServiceRoot' : 'http://maps.selectgeorgia.com/arcgis/rest/services/GISPlanningLayers/MapServer/',
	getPropertyKey : function(PropertyType, FilterBy) {
		var key = {};
		key.type = 0;
		key.field = 'COUNTY_NAME';
		switch(FilterBy) {
			case 'CountyId' : 
			if(PropertyType==='Site'){
				key.field = 'COUNTY';
			} else {
				key.field = 'COUNTY_NAME';
			}
			break;
			case 'PropertyId': 
			if(PropertyType==='Site'){
				key.field = 'SITE_ID';
			} else {
				key.field = 'BUILDING_ID';
			}
			break;
		}
		switch(PropertyType) {
			case 'Office' : key.type = 0; break;
			case 'Industrial' : key.type = 1; break;
			case 'Site' : key.type = 3; break;
		}
		return key;
	}

});