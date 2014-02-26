'use strict';

var app = angular.module('gccApp')
.filter('yesno',
  [ '$filter', '$locale',
  function(filter, locale) {

    return function(YorN) {
      if(YorN === 'Y') { 
        return 'Yes';
      }
      return 'No';
};
} 
]);