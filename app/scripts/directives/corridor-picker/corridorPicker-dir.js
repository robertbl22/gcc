'use strict';

angular.module('gccApp')
.directive('corridorPicker', function ($stateParams, CorridorHighlightSvc) {
	return {
		templateUrl: 'scripts/directives/corridor-picker/corridorPicker.html',
		restrict: 'A',
		controller: 'CorridorPickerCtrl',
		link: function(scope, element, attrs) {

			var img = element.find('#GeorgiaMap');
			var currentSelectedAreaId = undefined;

			var mapsterOptions = {
				singleSelect : true,
				fillColor : 'FF7300',
				stroke : true,
				strokeColor : 'FFFFFF',
				strokeWidth : 1,
				clickNavigate : true,
				showToolTip : true,
				mapKey: 'data-key'
			};

			img.mapster(mapsterOptions);

			scope.highlightCorridor = function(corridorId) {CorridorHighlightSvc.highlightCorridor(corridorId);};

			var watched = function(){ return CorridorHighlightSvc.highlightedCorridorId; };
			scope.$watch(watched, function(newVal, oldVal, scope) {
				if(newVal) {
					img.mapster('highlight', false);
					img.mapster('highlight', newVal);
				} else {
					img.mapster('highlight', false);
				}
			});

			scope.$on('$stateChangeSuccess', function () {
				if($stateParams.corridorId) {
					var areaId = '#' + $stateParams.corridorId;
					$(areaId).mapster('select');
					currentSelectedAreaId = areaId;
				} else {
					if(currentSelectedAreaId != undefined) {
						$(currentSelectedAreaId).mapster('deselect');
					}
				}
			});

			/*
			/////////////////// REMOVED ////////////////////
			The throttle mentioned below caused a problem.
			////////////////////////////////////////////////
			NOTE: We use a throttled 'resize' event override 
			because IE will fire events a crazy number 
			of times until the browser crashes.
			jquery.unevent.js
			*/
			/*$(window).on('resize', resizeImageMap, 50);*/
			
			$(window).on('resize', resizeImageMap);

			function resizeImageMap() {
				img.mapster('resize', element.width(), '', 0);
			};

			function getMapWidth() {
				var colWidth = element.width();
				var newWidth = Math.floor(colWidth * 0.9);
				return newWidth;
			};

		}
	};
});

