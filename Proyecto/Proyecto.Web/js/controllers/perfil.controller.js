(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('PerfilController', PerfilController);

    PerfilController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function PerfilController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = null;
        vm.usuarioPerfil = null;
        vm.favoritos = [];

        //Methods
        vm.save = save;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.getInfoUsuario(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);
                        vm.usuarioPerfil = data;

                        $('.dropify').dropify({
                            messages: {
                                default: 'Imagen default',
                                replace: 'Haga click para reemplazar',
                                remove: 'Eliminar',
                                error: 'Hubo un error'
                            },
                            defaultFile: 'http://www.soydonar.com/imagenes/usuarios/' + vm.usuarioPerfil.imagen_path
                        })
                            .on('dropify.afterClear', function (event, element) {
                                $scope.imagen = null;
                            });
                    });
            }
            else {
                $state.go('restricted.home');
            }
        }

        //Method definitions
        function save() {
            var file = $scope.imagen;
            var fileName = vm.usuarioPerfil.imagen_path;
            if (file) {
                fileName = file.name;
            }

            var request = {
                usuario: vm.usuarioPerfil.usuario,
                contrasenia: vm.usuarioPerfil.contrasenia,
                nombre: vm.usuarioPerfil.nombre,
                apellido: vm.usuarioPerfil.apellido,
                sexo: 'masculino',
                nacionalidad: vm.usuarioPerfil.nacionalidad,
                residencia: vm.usuarioPerfil.residencia,
                // telefono: '44867832',
                // facebook: '/mgary@gmail.com',
                // twitter: '@mgaray',
                imagen_path: fileName,
                fecha_nacimiento: '2019-08-30'
            };

            SessionStorageService.set('usuario', request);
            ServerService.guardarUsuario(request)
                .then(function () {
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se guardó correctamente!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                });
        }
    }
})();