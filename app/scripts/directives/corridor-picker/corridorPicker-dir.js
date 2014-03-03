'use strict';

angular.module('gccApp')
.directive('corridorPicker', function ($stateParams) {
	return {
		templateUrl: 'scripts/directives/corridor-picker/corridorPicker.html',
		restrict: 'A',
		controller: 'CorridorPickerCtrl',
		link: function(scope, element, attrs) {

			var img = element.find('#GeorgiaMap');

			var mapsterOptions = {
				singleSelect : true,
				fillColor : 'FF7300',
				stroke : true,
				strokeColor : 'FFFFFF',
				strokeWidth : 1,
				clickNavigate : true,
				showToolTip : true
			};

			img.mapster(mapsterOptions);

			scope.$on('$stateChangeSuccess', function () {
				if($stateParams.corridorId) {
					var areaId = '#' + $stateParams.corridorId;
					$(areaId).mapster('select');
				} else {
					$('#i-16, #341-alliance, #srp, #i-95').mapster('deselect');
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
			
			$(window).on('resize', resizeImageMap); //, 50);

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

