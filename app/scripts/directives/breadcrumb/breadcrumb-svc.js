'use strict';

/* NOTES */
/*

/corridor/:corridorId/county/:countyId/properties
Site Selection > Corridor Name > County Name > Properties

/corridor/:corridorId/county/:countyId/property/:propertyId
Site Selection > Corridor Name > County Name > Property Name

/search/results
Site Selection > Search Properties > Search Results

/bookmarks 
Site Selection > Bookmarked Properties

*/

angular.module('gccApp')
.factory('BreadcrumbSvc', function ($q, LocalDataSvc, PropertySvc) {

	var breadcrumbsArray = [{
		name: 'Site Selection',
		url: '#/'
	}];

	var makeCrumb = function(id, name, previousPath, sectionID) {
		// sectionID example: '/corridor/'
		return {
			name: name,
			url: previousPath + '/' + sectionID + '/' + id
		};
	};

	var getCorridorCrumb = function(corridorId, previousPath) {
		var deferred = $q.defer();
		LocalDataSvc.Corridors.get(corridorId).success(function(data) {
			deferred.resolve(function() {
				var crumb = makeCrumb(corridorId, data.shortname, previousPath, 'corridor');
				return crumb;
			}());
		});
		return deferred.promise;
	};

	var getCountyCrumb = function(countyId, previousPath) {
		var deferred = $q.defer();
		LocalDataSvc.Counties.get(countyId).success(function(data) {
			deferred.resolve(function() {
				var crumb = makeCrumb(countyId, data.name, previousPath, 'county');
				return crumb;
			}());
		});
		return deferred.promise;
	};

	var getPropertyCrumb = function(propertyType, propertyId, previousPath) {
		var deferred = $q.defer();
		PropertySvc.get(propertyType, propertyId).success(function(data) {
			deferred.resolve(function() {
				var crumb = makeCrumb(propertyId, data.name, previousPath, propertyType);
				return crumb;
			}());
		});
		return deferred.promise;
	};

	var spliceBookmarksCrumb = function(section) {
		breadcrumbsArray.splice(section, breadcrumbsArray.length, {
			name: 'Bookmarked Properties',
			url: '#/bookmarks'
		});
	};

	var spliceSearchCrumb = function(section) {
		breadcrumbsArray.splice(section, breadcrumbsArray.length, {
			name: 'Search Properties',
			url: '#/search'
		});
	};

	var spliceCorridorCrumb = function(section, corridorId) {
		getCorridorCrumb(corridorId)
		.then(function(crumb) {
			breadcrumbsArray.splice(section, breadcrumbsArray.length, crumb);
		});
	};

	var spliceCorridorAndCountyCrumbs = function(section, corridorId, subsection, countyId) {
		getCorridorCrumb(corridorId, '#')
		.then(function(crumb) {
			breadcrumbsArray.splice(section, breadcrumbsArray.length, crumb);
			getCountyCrumb(countyId, crumb.url)
			.then(function(crumb) {
				breadcrumbsArray.splice(subsection, breadcrumbsArray.length, crumb);
			});
		});
	};

	var spliceCorridorAndCountyAndPropertyCrumbs = function(section, corridorId, subsection, countyId, subsubsection, propertyType, propertyId) {
		getCorridorCrumb(corridorId, '#')
		.then(function(crumb) {
			breadcrumbsArray.splice(section, breadcrumbsArray.length, crumb);
			getCountyCrumb(countyId, crumb.url)
			.then(function(crumb) {
				breadcrumbsArray.splice(subsection, breadcrumbsArray.length, crumb);
				getPropertyCrumb(propertyType, propertyId, crumb.url)
				.then(function(crumb) {
					breadcrumbsArray.splice(subsubsection, breadcrumbsArray.length, crumb);
				});
			});
		});
	};

	var update = function(routeData) {
		var home=0,section=1,subsection=2,subsubsection=3;
		switch(routeData.originalPath) {
			case '/' :
			breadcrumbsArray.length = 1;
			break;
			case '/bookmarks' :
			spliceBookmarksCrumb(section);
			break;
			case '/search' :
			spliceSearchCrumb(section);
			break;
			case '/corridor/:corridorId' :
			var corridorId = routeData.params.corridorId;
			spliceCorridorCrumb(section, corridorId);
			break;
			case '/corridor/:corridorId/county/:countyId' :
			var corridorId = routeData.params.corridorId;
			var countyId = routeData.params.countyId;
			spliceCorridorAndCountyCrumbs(section, corridorId, subsection, countyId);
			break;
			case '/corridor/:corridorId/county/:countyId/office/:propertyId' :
			var corridorId = routeData.params.corridorId;
			var countyId = routeData.params.countyId;
			var propertyType = 'Office';
			var propertyId = routeData.params.propertyId;
			spliceCorridorAndCountyAndPropertyCrumbs(section, corridorId, subsection, countyId, subsubsection, propertyType, propertyId);
			break;
			case '/corridor/:corridorId/county/:countyId/industrial/:propertyId' :
			var corridorId = routeData.params.corridorId;
			var countyId = routeData.params.countyId;
			var propertyType = 'Industrial';
			var propertyId = routeData.params.propertyId;
			spliceCorridorAndCountyAndPropertyCrumbs(section, corridorId, subsection, countyId, subsubsection, propertyType, propertyId);
			break;
			case '/corridor/:corridorId/county/:countyId/site/:propertyId' :
			var corridorId = routeData.params.corridorId;
			var countyId = routeData.params.countyId;
			var propertyType = 'Site';
			var propertyId = routeData.params.propertyId;
			spliceCorridorAndCountyAndPropertyCrumbs(section, corridorId, subsection, countyId, subsubsection, propertyType, propertyId);
			break;
		}
	}

	return {
		breadcrumbs: breadcrumbsArray,
		update: update,
		previousPath: undefined,
		currentPath: undefined
	};

});