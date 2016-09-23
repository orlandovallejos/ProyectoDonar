(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('PendienteController', PendienteController);

    PendienteController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function PendienteController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = null;
        vm.PendientesDonante = [];
        vm.PendientesDonatario = [];

        //Methods
        vm.deletePendienteDonante = deletePendienteDonante;
        vm.deletePendienteDonatario = deletePendienteDonatario;
        vm.savePendienteDonante = savePendienteDonante;
        vm.savePendienteDonatario = savePendienteDonatario;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.getPendienteDonatario(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);
                        vm.PendientesDonatario = data;
                    });

                ServerService.getPendienteDonante(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);
                        vm.PendientesDonante = data;
                    });
            }
            else {
                $state.go('restricted.home');
            }
        }

        //Method definitions
        function deletePendienteDonante() {
        }

        function deletePendienteDonatario() {

        }

        function savePendienteDonante(id_donacion) {
            ServerService.savePendienteDonante(id_donacion)
                .then(function (data) {
                    console.log(data);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se confirmó el envío!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    ServerService.getPendienteDonante(vm.usuarioLogueado.usuario)
                        .then(function (data) {
                            console.log(data);
                            vm.PendientesDonante = data;
                        });
                });
        }

        function savePendienteDonatario(id_donacion) {
            ServerService.savePendienteDonatario(id_donacion)
                .then(function (data) {
                    console.log(data);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se confirmó la recepción!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    ServerService.getPendienteDonatario(vm.usuarioLogueado.usuario)
                        .then(function (data) {
                            console.log(data);
                            vm.PendientesDonatario = data;
                        });
                });
        }
    }
})();