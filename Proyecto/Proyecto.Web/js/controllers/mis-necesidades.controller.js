(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('MisNecesidadesController', MisNecesidadesController);

    MisNecesidadesController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function MisNecesidadesController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
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

                ServerService.getMisDonaciones(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);

                        if (Object.prototype.toString.call(data) === '[object Array]') {
                            vm.necesidades = data;
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