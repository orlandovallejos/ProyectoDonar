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
        vm.deleteFav = deleteFav;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.getFavorites(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);

                        if (Object.prototype.toString.call(data) === '[object Array]') {
                            vm.favoritos = data;
                            vm.favoritos.forEach(function (e, i, a) {
                                //Valido la no existencia de la imagen:
                                if (e.imagen_path && e.imagen_path.indexOf('.') === -1) {
                                    e.imagen_path = 'prueba.png';
                                }
                            });
                        }
                        else {
                            vm.favoritos = [];
                        }
                    });
            }
            else {
                $state.go('restricted.home');
            }
        }

        //Method definitions
        function deleteFav(idNecesidad) {
            ServerService.deleteFav(idNecesidad, vm.usuarioLogueado.usuario)
                .then(function () {
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se eliminó el favorito!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    ServerService.getFavorites(vm.usuarioLogueado.usuario)
                        .then(function (data) {
                            console.log(data);
                            vm.favoritos = data;
                        });
                });
        }
    }
})();