(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('MapaController', MapaController);

    MapaController.$inject = ['$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout'];

    function MapaController($http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = {};

        //Methods:
        vm.save = save;

        activate();

        function activate() {
            //Key:  AIzaSyAwC6bRAW_7P_epNfEg517L2VJF6K6R7MM 
            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (!vm.usuarioLogueado) {
                $state.go('restricted.home');
            }
        }

        function save() {

        }
    }
})();