/*
 *  Altair Admin angularjs
 *  controller
 */
(function () {
    "use strict";

    angular
    .module('donarApp')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'ServerService'];

    function HomeController($scope, $rootScope, ServerService) {
        var vm = this;

        vm.donaciones = [];

        activate();

        function activate() {
            ServerService.homeGetDonaciones()
            .then(function (data) {
                vm.donaciones = data;
            });
        }
    }
})();