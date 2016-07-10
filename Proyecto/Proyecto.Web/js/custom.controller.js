/*
 *  Altair Admin angularjs
 *  controller
 */
(function () {
    "use strict";

    angular
    .module('altairApp')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope'];

    function HomeController($scope, $rootScope) {
        console.log('estoy desde el controller');

    }
})();