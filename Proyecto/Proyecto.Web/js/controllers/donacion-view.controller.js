(function() {
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
        vm.color_header = '';

        //Methods
        vm.addComment = addComment;
        vm.editar = editar;
        vm.pagarMercadoPago = pagarMercadoPago;
        vm.addFavorite = addFavorite;
        vm.donarCosas = donarCosas;
        vm.getYTLink = getYTLink;
        vm.addLike = addLike;
        vm.donarVoluntariado = donarVoluntariado;

        activate();

        function activate() {

            var colors = ['#1976d2','#c83f34','#964387','#474194','#4caf50','#13b5c7','#f5b31c','#e279ae','#559c5b','#dac826']
            var indexColor = Math.floor((Math.random() * 10));
            vm.color_header = colors[indexColor];  

            vm.usuarioLogueado = SessionStorageService.get('usuario');

            ServerService.getDonacion($stateParams.id)
                .then(function(data) {
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

                        vm.donacion.dineroTotal = (parseInt(vm.donacion.dineroRecaudado) > parseInt(vm.donacion.dineroTotal)) ? vm.donacion.dineroRecaudado : vm.donacion.dineroTotal;
                    }

                    //Maps magic:
                    //This should come from server:
                    // vm.donacion.latitud = -34.66492800516767;
                    // vm.donacion.longitud = -58.57205388302003;

                    if (vm.donacion.email) {
                        vm.donacion.email = vm.donacion.email.replace(/ /g, '');
                    }

                    if (vm.donacion.telefono) {
                        vm.donacion.telefono = vm.donacion.telefono.replace(/ /g, '');
                    }

                    if (vm.donacion.facebook) {
                        vm.donacion.facebook = vm.donacion.facebook.replace(/ /g, '');
                    }

                    if (vm.donacion.twitter) {
                        vm.donacion.twitter = vm.donacion.twitter.replace(/ /g, '');
                    }

                    if (vm.donacion.usuario_mp) {
                        vm.donacion.usuario_mp = vm.donacion.usuario_mp.replace(/ /g, '');
                    }

                    vm.estaActiva = true;
                    if (vm.donacion.fecha_fin) {
                        var _date = new Date();
                        var _fechaFin = new Date(vm.donacion.fecha_fin);

                        if (_fechaFin >= _date) {
                            vm.estaActiva = true;
                        }
                        else {
                            vm.estaActiva = false;
                        }
                    }
                    //

                    ServerService.getFilesInFolder('galeria-' + $stateParams.id)
                        .then(function(dataImages) {
                            vm.images = dataImages;
                        });

                    ServerService.getVideos($stateParams.id)
                        .then(function(dataVideo) {
                            vm.videos = dataVideo;
                        });
                });

            ServerService.donacionesPorNecesidad($stateParams.id)
                .then(function(dataAportes) {
                    vm.aportes = dataAportes;
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
                .then(function(response) {
                    console.log(response);
                    request.imagen_path = vm.usuarioLogueado.imagen_path;
                    vm.donacion.lista_coment.push(request);
                    vm.comentario = '';
                },
                function(responseError) {
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

            if (isNaN(vm.donacionMonetaria) || vm.donacionMonetaria <= 0) {
                UIkit.notify({
                    message: '<i class="uk-icon-times-circle"></i> La donación tiene que ser un número positivo.',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-right'
                });
                return;
            }

            if (vm.usuarioLogueado) {
                var request = {
                    donante: vm.usuarioLogueado.usuario,
                    id_necesidad: vm.donacion.id_necesidad,
                    fecha: fecha,
                    aporte_monetario: vm.donacionMonetaria,
                    aporte_donacion: '',
                    donatario: vm.donacion.usuario
                };

                ServerService.crearDonacionMP(request)
                    .then(function(response) {
                        console.log(response);

                        vm.donacionMonetaria = '';
                        // UIkit.notify({
                        //     message: '<i class="uk-icon-check"></i> Donación concretada!',
                        //     status: 'success',
                        //     timeout: 5000,
                        //     pos: 'top-right'
                        // });

                        UIkit.modal("#modal_overflow").show();
                        vm.mercadoPagoURL = $sce.trustAsResourceUrl("https://www.mercadopago.com.ar/money-transfer?dummyVar=" + (new Date()).getTime());
                    },
                    function(responseError) {
                        console.log(responseError);
                    });
            }
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
                    .then(function(response) {
                        console.log(response);

                        vm.donacionDeCosas = '';
                        UIkit.notify({
                            message: '<i class="uk-icon-check"></i> Donación concretada!',
                            status: 'success',
                            timeout: 5000,
                            pos: 'top-right'
                        });
                    },
                    function(responseError) {
                        console.log(responseError);
                    });
            }
        }

        function addFavorite() {
            ServerService.addFavorite(vm.donacion.id_necesidad, vm.usuarioLogueado.usuario)
                .then(function(response) {
                    console.log(response);
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se agregó a la lista de favoritos!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                },
                function(responseError) {
                    console.log(responseError);
                });
        }

        function addLike() {
            ServerService.addLike(vm.donacion.id_necesidad, vm.usuarioLogueado.usuario)
                .then(function(response) {
                    console.log(response);
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se agregó el like!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                },
                function(responseError) {
                    console.log(responseError);
                });
        }

        function getYTLink(src) {
            //return 'https://www.youtube.com/v/' + src + '?rel=0';
            return src.replace("watch?v=", "embed/");
            //https://www.youtube.com/embed/VIDEO_ID
            //"https://www.youtube.com/watch?v=czmulJ9NBP0"
        };

        function donarVoluntariado() {

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
                    aporte_donacion: 'Voluntario!',
                    donatario: vm.donacion.usuario
                };

                ServerService.crearDonacionMP(request)
                    .then(function(response) {
                        console.log(response);

                        vm.donacionDeCosas = '';
                        UIkit.notify({
                            message: '<i class="uk-icon-check"></i> Voluntariado ofrecido! \nContactate para saber en qué ayudar',
                            status: 'success',
                            timeout: 5000,
                            pos: 'top-right'
                        });
                    },
                    function(responseError) {
                        UIkit.notify({
                            message: '<i class="uk-icon-times-circle"></i> Hubo un error',
                            status: 'danger',
                            timeout: 5000,
                            pos: 'top-right'
                        });
                        console.log(responseError);
                    });
            }
        }
    }
})();