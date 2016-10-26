(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('DonacionResultadoController', DonacionResultadoController);

    DonacionResultadoController.$inject = ['fileUpload', '$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout'];

    function DonacionResultadoController(fileUpload, $http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout) {
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
        vm.save = save;
        vm.subirImagen = subirImagen;
        vm.getYTLink = getYTLink;
        vm.subirVideo = subirVideo;

        activate();

        function activate() {
            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (!vm.usuarioLogueado || !$stateParams.id) {
                $state.go('restricted.home');
            }

            ServerService.getDonacion($stateParams.id)
                .then(function (data) {
                    vm.donacion = data;
                    if (vm.usuarioLogueado && vm.usuarioLogueado.usuario !== data.usuario) {
                        UIkit.notify({
                            message: '<i class="uk-icon-times-circle"></i> No tiene permisos para editar esta necesidad.',
                            status: 'danger',
                            timeout: 5000,
                            pos: 'top-right'
                        });

                        $state.go('restricted.home');

                        return;
                    }

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
        }

        function save() {

            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            var request = {
                titulo: vm.resultado.titulo,
                resultado: vm.resultado.resultado,
                fecha: fecha
            };

            if (vm.isNew) {
                request.id_nec = $stateParams.id;
            }
            else {
                console.log(vm.resultado);
                request.id = vm.resultado.id;
            }

            if (!request.titulo || !request.resultado) {
                UIkit.notify({
                    message: '<i class="uk-icon-times-circle"></i> El título y el resultado son requeridos',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-right'
                });

                return;
            }

            ServerService.guardarResultado(request)
                .then(function (response) {
                    console.log(response);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha guardado con éxito!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Hubo un error!',
                        status: 'danger',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                });
        }

        function subirImagen() {

            $timeout(function () {
                UIkit.notify({
                    message: '<i class="uk-icon-check"></i> Imagen guardada!',
                    status: 'success',
                    timeout: 1000,
                    pos: 'top-right'
                });

                ServerService.getFilesInFolder('resultado-' + $stateParams.id)
                    .then(function (data) {
                        vm.images = data;
                    });
            }, 3000);
        }

        function getYTLink(src) {
            //return 'https://www.youtube.com/v/' + src + '?rel=0';
            return src.replace("watch?v=", "v/");;
        };

        function subirVideo() {
            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            var request = {
                url: vm.video.url,
                comentario: vm.video.descripcion,
                fecha: fecha,
                usuario: vm.usuarioLogueado.usuario,
                id_necesidad: vm.donacion.id_necesidad,
                titulo: vm.video.titulo
            };

            ServerService.guardarVideo(request)
                .then(function (response) {
                    console.log(response);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha guardado el video!',
                        status: 'success',
                        //timeout: 5000,
                        pos: 'top-right'
                    });
                })
                .catch(function (responseError) {
                    console.log(responseError);
                });
        }

        $scope.subirImagen = subirImagen;
    }
})();