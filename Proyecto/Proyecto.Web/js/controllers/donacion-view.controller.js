(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'user_data', 'SessionStorageService', 'ServerService', 'NgMap', '$sce'];

    function DonacionController($window, $rootScope, $state, $stateParams, $scope, user_data, SessionStorageService, ServerService, NgMap, $sce) {
        var vm = this;

        //Variables
        vm.user_data = user_data[0];
        vm.user_data_contacts = user_data[0].contact;
        vm.isCreatedUser = false;
        vm.comentario = '';
        vm.usuarioLogueado = null;
        vm.images = [];
        vm.videos = [];

        //Methods
        vm.addComment = addComment;
        vm.editar = editar;
        vm.pagarMercadoPago = pagarMercadoPago;
        vm.addFavorite = addFavorite;
        vm.donarCosas = donarCosas;
        vm.getYTLink = getYTLink;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');

            ServerService.getDonacion($stateParams.id)
                .then(function (data) {
                    console.log(data);
                    vm.donacion = data;

                    //Valido la no existencia de la imagen:
                    if (vm.donacion.imagen_path && vm.donacion.imagen_path.indexOf('.') === -1) {
                        vm.donacion.imagen_path = 'prueba.png';
                    }

                    if (vm.usuarioLogueado && vm.usuarioLogueado.usuario === vm.donacion.usuario) {
                        vm.isCreatedUser = true;
                    }

                    if (!isNaN(parseInt(vm.donacion.dineroRecaudado)) && !isNaN(parseInt(vm.donacion.dineroTotal))) {
                        vm.donacion.dineroTotal = parseInt(vm.donacion.dineroRecaudado);
                    }

                    //Maps magic:
                    //This should come from server:
                    // vm.donacion.latitud = -34.66492800516767;
                    // vm.donacion.longitud = -58.57205388302003;

                    ServerService.getFilesInFolder('galeria-' + $stateParams.id)
                        .then(function (dataImages) {
                            vm.images = dataImages;
                        });

                    ServerService.getVideos($stateParams.id)
                        .then(function (dataVideo) {
                            vm.videos = dataVideo;
                        });
                });
        }

        //Method definitions
        function addComment() {

            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;

            var fecha = anio + '-' + mes + '-' + dia;

            var request = {
                id_necesidad: $stateParams.id,
                comentario: vm.comentario,
                usuario: vm.usuarioLogueado.usuario,
                fecha: fecha
            };

            if (vm.comentario) {
                var comentarioLimpio = vm.comentario.replace(/[ ]/ig, '');
                if (comentarioLimpio.length === 0) {
                    UIkit.notify({
                        message: '<i class="uk-icon-times-circle"></i> El comentario es requerido',
                        status: 'danger',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    return;
                }
            }
            else {
                UIkit.notify({
                    message: '<i class="uk-icon-times-circle"></i> El comentario es requerido',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-right'
                });

                return;
            }

            ServerService.addComment(request)
                .then(function (response) {
                    console.log(response);
                    request.imagen_path = vm.usuarioLogueado.imagen_path;
                    vm.donacion.lista_coment.push(request);
                    vm.comentario = '';
                },
                function (responseError) {
                    console.log(responseError);
                });
        }

        function editar() {
            $state.go('restricted.donacion-edit', { id: $stateParams.id });
        }

        function pagarMercadoPago() {
            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            if (vm.usuarioLogueado) {
                var request = {
                    donante: vm.usuarioLogueado.usuario,
                    id_necesidad: vm.donacion.id_necesidad,
                    fecha: fecha,
                    aporte_monetario: vm.donacionMonetaria,
                    aporte_donacion: '',
                    donatario: vm.donacion.usuario
                };

                // ServerService.crearDonacionMP(request)
                //     .then(function(response) {
                //         console.log(response);

                //         vm.donacionMonetaria = '';
                //         UIkit.notify({
                //             message: '<i class="uk-icon-check"></i> Donación concretada!',
                //             status: 'success',
                //             timeout: 5000,
                //             pos: 'top-right'
                //         });
                //     },
                //     function(responseError) {
                //         console.log(responseError);
                //     });
            }

            vm.mercadoPagoURL = $sce.trustAsResourceUrl("https://www.mercadopago.com.ar/money-transfer?dummyVar=" + (new Date()).getTime());
            //$window.open('https://www.mercadopago.com.ar/money-transfer', '_blank');
        }

        function donarCosas() {

            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            if (vm.usuarioLogueado) {
                var request = {
                    donante: vm.usuarioLogueado.usuario,
                    id_necesidad: vm.donacion.id_necesidad,
                    fecha: fecha,
                    aporte_donacion: vm.donacionDeCosas,
                    donatario: vm.donacion.usuario
                };

                if (vm.donacionDeCosas) {
                    var donacionDeCosasLimpia = vm.donacionDeCosas.replace(/[ ]/ig, '');
                    if (donacionDeCosasLimpia.length === 0) {
                        UIkit.notify({
                            message: '<i class="uk-icon-times-circle"></i> La donación es requerida',
                            status: 'danger',
                            timeout: 5000,
                            pos: 'top-right'
                        });

                        return;
                    }
                }
                else {
                    UIkit.notify({
                        message: '<i class="uk-icon-times-circle"></i> La donación es requerida',
                        status: 'danger',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    return;
                }


                ServerService.crearDonacionMP(request)
                    .then(function (response) {
                        console.log(response);

                        vm.donacionDeCosas = '';
                        UIkit.notify({
                            message: '<i class="uk-icon-check"></i> Donación concretada!',
                            status: 'success',
                            timeout: 5000,
                            pos: 'top-right'
                        });
                    },
                    function (responseError) {
                        console.log(responseError);
                    });
            }
        }

        function addFavorite() {
            ServerService.addFavorite(vm.donacion.id_necesidad, vm.usuarioLogueado.usuario)
                .then(function (response) {
                    console.log(response);
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se agregó a la lista de favoritos!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                },
                function (responseError) {
                    console.log(responseError);
                });
        }

        function getYTLink(src) {
            //return 'https://www.youtube.com/v/' + src + '?rel=0';
            return src.replace("watch?v=", "embed/");
            //https://www.youtube.com/embed/VIDEO_ID
            //"https://www.youtube.com/watch?v=czmulJ9NBP0"
        };
    }
})();