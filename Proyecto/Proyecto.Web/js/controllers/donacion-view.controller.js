(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'user_data', 'SessionStorageService', 'ServerService'];

    function DonacionController($window, $rootScope, $state, $stateParams, $scope, user_data, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.user_data = user_data[0];
        vm.user_data_contacts = user_data[0].contact;
        vm.isCreatedUser = false;
        vm.comentario = '';
        vm.usuarioLogueado = null;
        //vm.donacion = {
        //    id_necesidad: 1,
        //    titulo: 'Una mano para Sarita',
        //    necesidad: 'Reiciendis laboriosam rerum maiores eveniet voluptate iusto perferendis ut quis doloremque quia eligendi perspiciatis quibusdam ut aspernatur dicta temporibus corporis dolor sequi eum et et a minima sapiente quam quia cum libero soluta et aut ad quia non doloremque quo pariatur neque nihil magni incidunt necessitatibus facere porro dicta est reprehenderit eos quos distinctio consectetur sit sint commodi voluptatem et vel eum optio nulla est aut consectetur dolores omnis incidunt rerum autem sed a sit qui deserunt maxime incidunt voluptatem et consequatur qui magni est deserunt est necessitatibus velit ut in fugiat blanditiis nostrum officiis nesciunt deserunt odio id adipisci rem nam non quia illum sed similique vel perspiciatis.',
        //    fecha_creacion: '2016-08-16',
        //    fecha_fin: '2016-08-26',
        //    cant_likes: 156,
        //    usuario: 'juan@gmail.com',
        //    categoria: 'monetaria',
        //    comentarios_cant: 100, //Este es al vicio.
        //    imagen_path: 'prueba.png',
        //    lista_coment: [{
        //        "id_comentario": "1",
        //        "comentario": "este es un comentario de prueba",
        //        "fecha": "2016-08-10 14:26",
        //        "pos": "5",
        //        "neg": "0",
        //        "usuario": "juan@gmail.com"
        //    }, {
        //        "id_comentario": "2",
        //        "comentario": "este es un comentario de prueba 2",
        //        "fecha": "2016-08-10 13:56",
        //        "pos": "5",
        //        "neg": "0",
        //        "usuario": "juan@gmail.com"
        //    }],



        //    //Estas propiedades faltan agregar al objeto:
        //    email: 'sarita@gmail.com',
        //    telefono: '15-3456-2345',
        //    facebook: '/AyudemosASarita',
        //    twitter: '@Sarita',
        //    fotos: 50,
        //    favoritos: 340,
        //    avatar: 'juan@gmail.com.jpg',
        //    direccion: 'Arieta 123, San justo, CP 1753, Bs As, Argentina',
        //    dineroTotal: 5000,
        //    dineroRecaudado: 1357
        //};

        //Methods
        vm.addComment = addComment;
        vm.editar = editar;
        vm.pagarMercadoPago = pagarMercadoPago;
        vm.addFavorite = addFavorite;
        vm.donarCosas = donarCosas;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');

            ServerService.getDonacion($stateParams.id)
                .then(function (data) {
                    console.log(data);
                    vm.donacion = data;

                    if (vm.usuarioLogueado && vm.usuarioLogueado.usuario === vm.donacion.usuario) {
                        vm.isCreatedUser = true;
                    }
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

                ServerService.crearDonacionMP(request)
                    .then(function (response) {
                        console.log(response);

                        vm.donacionMonetaria = '';
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

            $window.open('https://www.mercadopago.com.ar/money-transfer', '_blank');
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
    }
})();