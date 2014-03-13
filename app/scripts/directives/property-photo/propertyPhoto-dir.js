'use strict',

angular.module('gccApp')
.directive('propertyPhoto', function ($modal) {
	return {
		templateUrl: 'scripts/directives/property-photo/propertyPhoto-dir.html',
		restrict: 'A',
		scope: {
			photoSrc: '@',
			name: '@'
		},
		link: function(scope, element, attrs) {
			scope.openModal = function(tierId) {
				$modal.open({
					templateUrl: 'scripts/directives/property-photo/modal.html',
					controller: ModalInstanceCtrl,
					resolve: {
						items: function() {
							return {
								'photoSrc': scope.photoSrc,
								'name': scope.name
							}
						}
					}
				});
			};
			var ModalInstanceCtrl = ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
				$scope.photoSrc = items.photoSrc;
				$scope.name = items.name;
				$scope.closeModal = function() {
					$modalInstance.dismiss('cancel');
				};
			}];
		}
	}
});