'use strict';

angular.module('gccApp')
.service('GoogleMapSvc', function($window) {

	this.MapLabel = $window.MapLabel;
	this.maps = $window.google.maps;

	/********************************************
	/* Taken from:
	/* http://stackoverflow.com/questions/2177055/how-do-i-get-google-maps-to-show-a-whole-polygon
	********************************************/
	$window.google.maps.Polygon.prototype.getBounds = function() {
		var bounds = new $window.google.maps.LatLngBounds();
		var paths = this.getPaths();
		var path;
		for (var i = 0; i < paths.getLength(); i++) {
			path = paths.getAt(i);
			for (var ii = 0; ii < path.getLength(); ii++) {
				bounds.extend(path.getAt(ii));
			}
		}
		return bounds;
	};

	this.createMap = function(mapCanvas, center) {
		return new this.maps.Map(mapCanvas, {
			center: center,
			zoom: 15
		});
	};

	this.addShapeToMap = function(cfg) {
		var polygonOptions = this.getPolygonOptions(cfg.colorSet);
		var bounds = cfg.polygon.getBounds();
		var center = bounds.getCenter();
		cfg.polygon.setOptions(polygonOptions);
		cfg.map.fitBounds(bounds);
		cfg.polygon.setMap(cfg.map);
		this.addLabel(cfg.name, center, cfg.map, cfg.colorSet);
		return true;
	};

	this.getLabelOptions = function(text, center, map, ColorSet) {
		return {
			text: text,
			position: center,
			map: map,
			fontSize: 12,
			align: 'center',
			strokeWeight: 3,
			strokeColor: ColorSet.strokeColor,
			fontColor: ColorSet.textColor
		}
	};

	this.addLabel = function(name, center, map, ColorSet) {
		var options = this.getLabelOptions(name, center, map, ColorSet);
		new this.MapLabel(options);
	};

	this.getPolygonFromPath = function(path, ColorSet) {
		var latLngs = [];
		for (var i = 0; i < path.length; i++) {
			var latLng = new this.maps.LatLng(path[i].lat, path[i].lng);
			latLngs.push(latLng);
		};
		return new this.maps.Polygon({
			paths: latLngs,
			fillColor: ColorSet.fillColor,
			fillOpacity: ColorSet.fillOpacity,
			textColor: ColorSet.textColor,
			strokeColor: ColorSet.strokeColor,
			strokeWeight: ColorSet.strokeWeight,
			strokeOpacity: ColorSet.strokeOpacity
		});
	};

	this.getPolygonOptions = function(ColorSet) {
		return {
			//paths: latLngs,
			fillColor: ColorSet.fillColor,
			fillOpacity: ColorSet.fillOpacity,
			textColor: ColorSet.textColor,
			strokeColor: ColorSet.strokeColor,
			strokeWeight: ColorSet.strokeWeight,
			strokeOpacity: ColorSet.strokeOpacity
		};
	}

	this.addPolygonHover = function(polygon, ColorSet) {
		this.maps.event.addListener(polygon,'mouseover',function(){
			this.setOptions({fillColor: ColorSet.mouseover});
		});
		this.maps.event.addListener(polygon,'mouseout',function(){
			this.setOptions({fillColor: ColorSet.mouseout});
		});
	};

	this.addOfficeInfoWindow = function(map, itm, marker) {
		var infowindow = new this.maps.InfoWindow({
			content: '<strong>' + itm.NAME + '</strong><br/>' + itm.ADDRESS + '<br/>' + itm.CITY + ', GA&nbsp;&nbsp;' + itm.COUNTY_NAME
		});
		this.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	};

	this.addSiteInfoWindow = function(map, itm, latLng, polygon) {
		var content = '<strong>' + itm.NAME + '</strong><br/>' + itm.CITY + ', GA&nbsp;&nbsp;' + itm.COUNTY;
		var infowindow = new this.maps.InfoWindow({
			content: content,
			position: latLng
		});
		this.maps.event.addListener(polygon, 'click', function() {
			infowindow.open(map);
		});
	};

	var infoWindows = [];

	this.addCountyInfoWindow = function(map, countyName, latLng, polygon) {
		var content = '<strong>' + countyName + ' County, GA</strong>';
		var infoWindow = new this.maps.InfoWindow({
			content: content,
			position: latLng
		});
		infoWindows.push(infoWindow);
		this.maps.event.addListener(polygon, 'click', function() {
			angular.forEach(infoWindows, function(infoWindow){
				infoWindow.close(map);
			});
			infoWindow.open(map);
		});
		this.maps.event.addListener(map, 'click', function() {
			infoWindow.close(map);
		});
	};

	/*this.defaultPolygonOptions = {
		fillColor: '#FF0000',
		fillOpacity: 0.35,
		strokeColor: '#FF0000',
		strokeWeight: 1,
		strokeOpacity: 1,
		zIndex: 0
	};*/

	this.removeBoundsPadding = function(bounds) {
		// https://code.google.com/p/gmaps-api-issues/issues/detail?id=3117
		if (bounds) {
			var sw = bounds.getSouthWest();
			var ne = bounds.getNorthEast();

			var lat1 = sw.lat();
			var lng1 = sw.lng();
			var lat2 = ne.lat();
			var lng2 = ne.lng();

			var dx = (lng1 - lng2) / 2.;
			var dy = (lat1 - lat2) / 2.;
			var cx = (lng1 + lng2) / 2.;
			var cy = (lat1 + lat2) / 2.;

			  // work around a bug in google maps...///
			  lng1 = cx + dx / 1.5;
			  lng2 = cx - dx / 1.5;
			  lat1 = cy + dy / 1.5;
			  lat2 = cy - dy / 1.5;
			  /////////////////////////////////////////
			  
			  sw = new google.maps.LatLng(lat1,lng1);
			  ne = new google.maps.LatLng(lat2,lng2);
			  bounds = new google.maps.LatLngBounds(sw,ne);
			  return bounds;
			}
		}


});
