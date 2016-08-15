(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$rootScope', '$stateParams', '$scope', 'user_data', 'SessionStorageService'];

    function DonacionController($rootScope, $stateParams, $scope, user_data, SessionStorageService) {
        var vm = this;

        //Variables
        vm.user_data = user_data[0];
        vm.user_data_contacts = user_data[0].contact;
        vm.isCreatedUser = false;
        vm.comentario = '';
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
            dineroRecaudado: 1357
        };

        //Methods
        vm.addComment = addComment;

        activate();

        function activate() {


            var usuario = SessionStorageService.get('usuario');
            if (usuario && usuario.usuario === vm.donacion.usuario) {
                vm.isCreatedUser = true;
            }
        }

        //Method definitions
        function addComment() {

            var usuario = SessionStorageService.get('usuario');
            var request = {
                comentario: vm.comentario,
                usuario: usuario.usuario,
                fecha: new Date()
            };
            ServerService.addComment(request)
                .success(function (response) {
                    console.log(response);
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

        vm.user_data = user_data[0];
        vm.user_data_contacts = user_data[0].contact;

        // languages
        var langData = vm.user_languages_options = [
            { id: 1, title: 'English', value: 'gb' },
            { id: 2, title: 'French', value: 'fr' },
            { id: 3, title: 'Chinese', value: 'cn' },
            { id: 4, title: 'Dutch', value: 'nl' },
            { id: 5, title: 'Italian', value: 'it' },
            { id: 6, title: 'Spanish', value: 'es' },
            { id: 7, title: 'German', value: 'de' },
            { id: 8, title: 'Polish', value: 'pl' }
        ];
        vm.user_languages_config = {
            plugins: {
                'remove_button': {
                    label: ''
                }
            },
            render: {
                option: function (langData, escape) {
                    return '<div class="option">' +
                        '<i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' +
                        '<span>' + escape(langData.title) + '</span>' +
                        '</div>';
                },
                item: function (langData, escape) {
                    return '<div class="item"><i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' + escape(langData.title) + '</div>';
                }
            },
            valueField: 'value',
            labelField: 'title',
            searchField: 'title',
            create: false,
            placeholder: 'Select Language...'
        };

        // user role
        vm.user_role_config = {
            valueField: 'value',
            labelField: 'title',
            create: false,
            maxItems: 1,
            placeholder: 'Select...'
        };

        vm.user_role_options = [
            {
                "value": "admin",
                "title": "Admin"
            },
            {
                "value": "super_admin",
                "title": "Super Admin"
            },
            {
                "value": "editor",
                "title": "Editor"
            },
            {
                "value": "author",
                "title": "Author"
            },
            {
                "value": "none",
                "title": "None"
            }
        ];

        // groups
        vm.all_groups = groups_data;

        var $user_groups = $('#user_groups'),
            $all_groups = $('#all_groups'),
            $user_groups_control = $('#user_groups_control'),
            serialize_user_group = function () {
                var serialized_data = $user_groups.data("sortable").serialize();
                $user_groups_control.val(JSON.stringify(serialized_data));
            };

        UIkit.sortable($user_groups, {
            group: '.groups_connected',
            handleClass: 'sortable-handler'
        });

        UIkit.sortable($all_groups, {
            group: '.groups_connected',
            handleClass: 'sortable-handler'
        });

        // serialize user group on change
        $user_groups.on('change.uk.sortable', function () {
            serialize_user_group();
        });

        // serialize group on init
        serialize_user_group();

        // submit button
        $('#user_edit_submit').on('click', function (e) {
            e.preventDefault();
            var data = JSON.stringify($scope.user_data, null, 2),
                user_name = user_data[0].name;

            UIkit.modal.alert('<p>Data for ' + user_name + ':</p><pre>' + data + '</pre>');
        })

    }


})();