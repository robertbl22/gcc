'use strict';

angular.module('gccApp')
.directive('tiersIndicator', function ($modal) {
	return {
		templateUrl: 'scripts/directives/tiers-indicator/tiersIndicator-dir.html',
		restrict: 'A',
		replace: true,
		scope: {
			tiers: '=',
			tier: '='
		},
		link: function(scope, element, attrs) {
			scope.openModal = function(tierId) {
				$modal.open({
					templateUrl: 'scripts/directives/tiers-indicator/' + tierId + '.html',
					controller: ModalInstanceCtrl
				});
			};
			var ModalInstanceCtrl = ['$scope', '$modalInstance', function ($scope, $modalInstance) {
				$scope.closeModal = function() {
					$modalInstance.dismiss('cancel');
				};
			}];
		}
	};
});



