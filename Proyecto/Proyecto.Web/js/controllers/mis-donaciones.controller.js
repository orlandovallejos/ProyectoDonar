(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('MisDonacionesController', MisDonacionesController);

    MisDonacionesController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function MisDonacionesController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = null;
        vm.favoritos = [];

        //Methods
        vm.edit = edit;
        vm.resultado = resultado;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.donacionesConcretadas(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);

                        if (Object.prototype.toString.call(data) === '[object Array]') {
                            vm.necesidades = data;

                            vm.necesidades.forEach(function (e, i, a) {
                                //Valido la no existencia de la imagen:
                                if (e.imagen_path && e.imagen_path.indexOf('.') === -1) {
                                    e.imagen_path = 'prueba.png';
                                }
                            });
                        }
                        else {
                            vm.necesidades = [];
                        }
                    });
            }
            else {
                $state.go('restricted.home');
            }
        }

        //Method definitions
        function edit(idNecesidad) {
            $state.go('restricted.donacion-edit', { id: idNecesidad });
        }

        function resultado(idNecesidad) {
            $state.go('restricted.donacion-resultado', { id: idNecesidad });
        }
    }
})();