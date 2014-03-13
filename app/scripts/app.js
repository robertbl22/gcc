'use strict';

var app = angular.module('gccApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'LocalStorageModule',
  'ui.router',
  'ui.utils',
  'ui.bootstrap'
]);
/* jshint unused: false */ /* for element, app */

/* ///////////////////////////////////////////
IMPORTANT NOTE:
You will see the use of ['catch'] on promise objects.
This is being done because < IE10 (or is that IE9?)
rejects the use of javascript reserved words.
*/