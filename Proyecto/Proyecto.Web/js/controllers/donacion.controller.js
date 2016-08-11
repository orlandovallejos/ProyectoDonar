(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$rootScope', '$scope', 'user_data', 'SessionStorageService'];
    function DonacionController($rootScope, $scope, user_data, SessionStorageService) {
        var vm = this;

        console.log(user_data);
        vm.user_data = user_data[0];

        vm.user_data_contacts = user_data[0].contact;

    }


})();