'use strict';

angular.module('gccApp')
.service('GoogleMaps_PolygonSvc', function(GoogleMaps_MapSvc, GoogleMaps_LabelSvc) {

	/********************************************
	/* Taken from:
	/* http://stackoverflow.com/questions/2177055/how-do-i-get-google-maps-to-show-a-whole-polygon
	********************************************/
	GoogleMaps_MapSvc.maps.Polygon.prototype.getBounds = function() {
		var self = this;
		var bounds = new GoogleMaps_MapSvc.maps.LatLngBounds();
		var paths = self.getPaths();
		var path;
		for (var i = 0; i < paths.getLength(); i++) {
			path = paths.getAt(i);
			for (var ii = 0; ii < path.getLength(); ii++) {
				bounds.extend(path.getAt(ii));
			}
		}
		return bounds;
	};

	this.addPolygonHover = function(polygon, ColorSet) {
		GoogleMaps_MapSvc.maps.event.addListener(polygon,'mouseover',function(){
			this.setOptions({fillColor: ColorSet.mouseover});
		});
		GoogleMaps_MapSvc.maps.event.addListener(polygon,'mouseout',function(){
			this.setOptions({fillColor: ColorSet.mouseout});
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

	this.addShapeToMap = function(cfg) {
		var polygonOptions = this.getPolygonOptions(cfg.colorSet);
		var bounds = cfg.polygon.getBounds();
		var center = bounds.getCenter();
		cfg.polygon.setOptions(polygonOptions);
		cfg.map.fitBounds(bounds);
		cfg.polygon.setMap(cfg.map);
		GoogleMaps_LabelSvc.addLabel(cfg.name, center, cfg.map, cfg.colorSet);
		return true;
	};

	this.getPolygonFromPath = function(path, ColorSet) {
		var latLngs = [];
		for (var i = 0; i < path.length; i++) {
			var latLng = new GoogleMaps_MapSvc.maps.LatLng(path[i].lat, path[i].lng);
			latLngs.push(latLng);
		};
		return new GoogleMaps_MapSvc.maps.Polygon({
			paths: latLngs,
			fillColor: ColorSet.fillColor,
			fillOpacity: ColorSet.fillOpacity,
			textColor: ColorSet.textColor,
			strokeColor: ColorSet.strokeColor,
			strokeWeight: ColorSet.strokeWeight,
			strokeOpacity: ColorSet.strokeOpacity
		});
	};

	return this;

});