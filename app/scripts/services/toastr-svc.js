'use strict';

angular.module('gccApp')
.factory('ToastrSvc', function($window) {
	return $window.toastr;
});