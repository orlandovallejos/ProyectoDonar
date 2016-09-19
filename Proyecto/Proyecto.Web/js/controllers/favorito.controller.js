(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('FavoritoController', FavoritoController);

    FavoritoController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function FavoritoController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = null;
        vm.favoritos = [];

        //Methods

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.getFavorites(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);
                        vm.favoritos = data;
                    });
            }
        }

        //Method definitions

    }
})();