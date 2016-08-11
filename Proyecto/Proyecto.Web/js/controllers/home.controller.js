(function () {
    "use strict";

    angular
    .module('donarApp')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'ServerService', '$window', 'SessionStorageService'];

    function HomeController($scope, $rootScope, ServerService, $window, SessionStorageService) {
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