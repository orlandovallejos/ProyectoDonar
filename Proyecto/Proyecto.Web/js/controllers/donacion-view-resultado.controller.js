(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('DonacionViewResultadoController', DonacionViewResultadoController);

    DonacionViewResultadoController.$inject = ['fileUpload', '$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout'];

    function DonacionViewResultadoController(fileUpload, $http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = {};
        vm.donacion = {};
        vm.categorias = [];
        vm.categorias_config = {};
        vm.tipo_config = {};
        vm.tipo_options = [];
        vm.isNew = true;
        vm.imagen = {};
        vm.images = [];
        vm.videos = [];

        //Methods:

        activate();

        function activate() {

            ServerService.getDonacion($stateParams.id)
                .then(function (data) {
                    vm.donacion = data;

                    ServerService.getFilesInFolder('resultado-' + $stateParams.id)
                        .then(function (data) {
                            vm.images = data;
                        });

                    ServerService.getResultado($stateParams.id)
                        .then(function (data) {
                            vm.isNew = false;
                            vm.resultado = data;

                            //Valido la no existencia de la imagen:
                            if (vm.donacion.imagen_path && vm.donacion.imagen_path.indexOf('.') === -1) {
                                vm.donacion.imagen_path = 'prueba.png';
                            }

                            //Valido la conversion del nro que viene desde el server:
                            if (vm.donacion.dineroTotal && vm.donacion.dineroTotal.replace(/[^.,0-9]/ig, '').length > 0) {
                                vm.donacion.dineroTotal = parseFloat(vm.donacion.dineroTotal);
                            }
                        })
                        .catch(function () {
                            //Si entra por acá es porque no hay resultado, entonces hay que agregar uno nuevo:
                            vm.isNew = true;
                            vm.resultado = {};
                        });
                });

            ServerService.donacionesPorNecesidad($stateParams.id)
                .then(function (dataAportes) {
                    vm.aportes = dataAportes;
                });
        }
    }
})();