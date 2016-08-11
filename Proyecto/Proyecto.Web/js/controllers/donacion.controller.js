(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$rootScope', '$scope', 'user_data', 'SessionStorageService', '$stateParams'];
    function DonacionController($rootScope, $scope, user_data, SessionStorageService, $stateParams) {
        var vm = this;

        vm.user_data = user_data[0];

        vm.user_data_contacts = user_data[0].contact;
    }
})();