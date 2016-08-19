(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$rootScope', '$stateParams', '$scope', 'user_data', 'SessionStorageService', 'ServerService'];

    function DonacionController($rootScope, $stateParams, $scope, user_data, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.user_data = user_data[0];
        vm.user_data_contacts = user_data[0].contact;
        vm.isCreatedUser = false;
        vm.comentario = '';
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

        activate();

        function activate() {
            ServerService.getDonacion($stateParams.id)
                .then(function (data) {
                    console.log(data);
                    vm.donacion = data;

                    var usuario = SessionStorageService.get('usuario');
                    if (usuario && usuario.usuario === vm.donacion.usuario) {
                        vm.isCreatedUser = true;
                    }
                });
        }

        //Method definitions
        function addComment() {

            var usuario = SessionStorageService.get('usuario');
            var request = {
                id_necesidad:$stateParams.id,
                comentario: vm.comentario,
                usuario: usuario.usuario,
                fecha: '2016-08-02'
            };
            ServerService.addComment(request)
                .then(function (response) {
                    console.log(response);

                    vm.donacion.lista_coment.push(request);
                    vm.comentario = '';
                });
        }
    }
})();


(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('DonacionAddEditController', DonacionAddEditController);

    DonacionAddEditController.$inject = ['$rootScope', '$state', '$stateParams', '$scope', 'user_data', 'groups_data'];

    function DonacionAddEditController($rootScope, $state, $stateParams, $scope, user_data, groups_data) {
        var vm = this;

        //Variables
        vm.donacion = {
            id_necesidad: 1,
            titulo: 'Una mano para Sarita',
            necesidad: 'Reiciendis laboriosam rerum maiores eveniet voluptate iusto perferendis ut quis doloremque quia eligendi perspiciatis quibusdam ut aspernatur dicta temporibus corporis dolor sequi eum et et a minima sapiente quam quia cum libero soluta et aut ad quia non doloremque quo pariatur neque nihil magni incidunt necessitatibus facere porro dicta est reprehenderit eos quos distinctio consectetur sit sint commodi voluptatem et vel eum optio nulla est aut consectetur dolores omnis incidunt rerum autem sed a sit qui deserunt maxime incidunt voluptatem et consequatur qui magni est deserunt est necessitatibus velit ut in fugiat blanditiis nostrum officiis nesciunt deserunt odio id adipisci rem nam non quia illum sed similique vel perspiciatis.',
            fecha_creacion: '2016-08-16',
            fecha_fin: '2016-08-26',
            cant_likes: 156,
            usuario: 'juan@gmail.com',
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
            direccion: 'Arieta 123, San justo, CP 1753, Bs As, Argentina',
            dineroTotal: 5000,
            dineroRecaudado: 1357,
            categorias: [1, 2, 3]
        };


        //vm.user_data = user_data[0];
        //console.log(user_data);
        //vm.user_data_contacts = user_data[0].contact;

        //Categorias
        var langData = vm.categorias = [
            { id: 1, title: 'Ropa', value: 'gb' },
            { id: 2, title: 'Alimentos', value: 'fr' },
            { id: 3, title: 'Dinero', value: 'cn' },
            { id: 4, title: 'Utiles escolares', value: 'nl' },
            { id: 5, title: 'Tecnologia', value: 'it' },
            { id: 6, title: 'Voluntariado', value: 'es' },
            { id: 7, title: 'Frazadas', value: 'de' },
            { id: 8, title: 'Muebles', value: 'pl' }
        ];
        vm.categorias_config = {
            plugins: {
                'remove_button': {
                    label: ''
                }
            },
            render: {
                option: function (langData, escape) {
                    return '<div class="option">' +
                        '<i class="item-icon"></i>' +
                        '<span>' + escape(langData.title) + '</span>' +
                        '</div>';
                },
                item: function (langData, escape) {
                    return '<div class="item"><i class="item-icon"></i>' + escape(langData.title) + '</div>';
                }
            },
            valueField: 'id',
            labelField: 'title',
            searchField: 'title',
            create: false,
            placeholder: 'Seleccionar categoria...'
        };

        $('.dropify').dropify({
            messages: {
                default: 'Imagen default',
                replace: 'Haga click para reemplazar',
                remove: 'Eliminar',
                error: 'Hubo un error'
            }
        });

        vm.tipo_config = {
            valueField: 'value',
            labelField: 'title',
            create: false,
            maxItems: 1,
            placeholder: 'Seleccionar...'
        };

        vm.tipo_options = [
            {
                "value": "monetaria",
                "title": "Monetaria"
            },
            {
                "value": "voluntariado",
                "title": "Voluntariado"
            },
            {
                "value": "donacion",
                "title": "Donacion"
            }
        ];

        // submit button
        $('#user_edit_submit').on('click', function (e) {
            e.preventDefault();
            var data = JSON.stringify($scope.user_data, null, 2),
                user_name = user_data[0].name;

            UIkit.modal.alert('<p>Data for ' + user_name + ':</p><pre>' + data + '</pre>');
        })
    }
})();