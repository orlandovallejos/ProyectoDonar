(function() {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$rootScope', '$scope', 'user_data', 'SessionStorageService', '$stateParams'];

    function DonacionController($rootScope, $scope, user_data, SessionStorageService, $stateParams) {
        var vm = this;

        //Variables
        vm.user_data = user_data[0];
        vm.user_data_contacts = user_data[0].contact;
        vm.isCreatedUser = false;
        vm.donacion = {
            id_necesidad: 1,
            titulo: 'Una mano para Sarita',
            necesidad: 'Reiciendis laboriosam rerum maiores eveniet voluptate iusto perferendis ut quis doloremque quia eligendi perspiciatis quibusdam ut aspernatur dicta temporibus corporis dolor sequi eum et et a minima sapiente quam quia cum libero soluta et aut ad quia non doloremque quo pariatur neque nihil magni incidunt necessitatibus facere porro dicta est reprehenderit eos quos distinctio consectetur sit sint commodi voluptatem et vel eum optio nulla est aut consectetur dolores omnis incidunt rerum autem sed a sit qui deserunt maxime incidunt voluptatem et consequatur qui magni est deserunt est necessitatibus velit ut in fugiat blanditiis nostrum officiis nesciunt deserunt odio id adipisci rem nam non quia illum sed similique vel perspiciatis.',
            fecha_creacion: '2016-08-16',
            fecha_fin: '2016-08-26',
            cant_likes: 156,
            usuario: 'orlando@donar.com',
            categoria: 'monetaria',
            comentarios_cant: 100, //Este es al vicio.
            imagen_path: 'prueba.png',
            lista_coment: [{
                "id_comentario": "1",
                "comentario": "este es un comentario de prueba",
                "fecha": "2016-08-10 14:26",
                "pos": "5",
                "neg": "0",
                "usuario": "juan@gmail.com"
            }, {
                "id_comentario": "2",
                "comentario": "este es un comentario de prueba 2",
                "fecha": "2016-08-10 13:56",
                "pos": "5",
                "neg": "0",
                "usuario": "juan@gmail.com"
            }],



            //Estas propiedades faltan agregar al objeto:
            email: 'sarita@gmail.com',
            telefono: '15-3456-2345',
            facebook: '/AyudemosASarita',
            twitter: '@Sarita',
            fotos: 50,
            favoritos: 340,
            avatar: '/assets/img/temp/face.jpg',
            direccion:'Arieta 123, San justo, CP 1753, Bs As, Argentina'
        };

        activate();

        function activate() {
            var usuario = SessionStorageService.get('usuario');
            if (usuario && usuario.usuario === vm.donacion.usuario) {
                vm.isCreatedUser = true;
            }
        }

        //Methods

    }
})();