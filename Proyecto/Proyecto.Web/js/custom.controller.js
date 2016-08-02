/*
 *  Altair Admin angularjs
 *  controller
 */
(function () {
    "use strict";

    angular
    .module('donarApp')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope'];

    function HomeController($scope, $rootScope) {
        console.log('estoy desde el controller');

    }
})();