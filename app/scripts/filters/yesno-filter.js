'use strict';

angular.module('gccApp')
.filter('yesno',
	[ '$filter', '$locale',
	function(filter, locale) {

		return function(YorN) {
			if(YorN === 'Y') {
				return 'Yes';
			} else if(YorN === 'N') {
				return 'No';
			}
			return 'n/a';
		};
	}
]);