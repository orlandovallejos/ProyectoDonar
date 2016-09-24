(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('DonacionAddEditController', DonacionAddEditController);

    DonacionAddEditController.$inject = ['fileUpload', '$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function DonacionAddEditController(fileUpload, $http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
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

        //Methods:
        vm.save = save;
        vm.subirImagen = subirImagen;

        activate();

        function activate() {
            $('#input-file-a-galeria').dropify({
                messages: {
                    default: 'Imagen default',
                    replace: 'Haga click para reemplazar',
                    remove: 'Eliminar',
                    error: 'Hubo un error'
                }
            })
                .on('dropify.afterClear', function (event, element) {
                    $scope.imagenGaleria = null;
                });

            vm.usuarioLogueado = SessionStorageService.get('usuario');

            if ($stateParams.id) {
                vm.isNew = false;

                ServerService.getDonacion($stateParams.id)
                    .then(function (data) {
                        console.log(data);
                        vm.donacion = data;

                        if (vm.usuarioLogueado && vm.usuarioLogueado.usuario === vm.donacion.usuario) {
                            vm.isCreatedUser = true;
                        }

                        if (vm.donacion.imagen_path) {
                            $('.dropify').dropify({
                                messages: {
                                    default: 'Imagen default',
                                    replace: 'Haga click para reemplazar',
                                    remove: 'Eliminar',
                                    error: 'Hubo un error'
                                },
                                defaultFile: 'http://www.soydonar.com/imagenes/necesidades/' + vm.donacion.imagen_path
                            })
                                .on('dropify.afterClear', function (event, element) {
                                    $scope.imagen = null;
                                });
                        }
                        else {
                            $('.dropify').dropify({
                                messages: {
                                    default: 'Imagen default',
                                    replace: 'Haga click para reemplazar',
                                    remove: 'Eliminar',
                                    error: 'Hubo un error'
                                },
                                defaultFile: 'http://www.soydonar.com/imagenes/necesidades/prueba.png'
                            })
                                .on('dropify.afterClear', function (event, element) {
                                    $scope.imagen = null;
                                });
                        }
                    });
            }
            else {
                if (!vm.usuarioLogueado) {
                    $state.go('restricted.home');
                }

                vm.donacion.avatar = vm.usuarioLogueado.imagen_path;
                vm.donacion.cant_likes = 0;
                vm.donacion.cant_fotos = 0;
                vm.donacion.cant_favs = 0;
                vm.isCreatedUser = true;

                $('.dropify').dropify({
                    messages: {
                        default: 'Imagen default',
                        replace: 'Haga click para reemplazar',
                        remove: 'Eliminar',
                        error: 'Hubo un error'
                    },
                    defaultFile: 'http://www.soydonar.com/imagenes/necesidades/prueba.png'
                })
                    .on('dropify.afterClear', function (event, element) {
                        $scope.imagen = null;
                    });
            }

            ServerService.getCategorias()
                .then(function (response) {
                    vm.categorias = [];

                    for (var i = 0; i < response.length; i++) {
                        vm.categorias.push({ id: response[i], title: response[i] });
                    }

                    vm.tipo_options = [];
                    for (var i = 0; i < response.length; i++) {
                        vm.tipo_options.push({ value: response[i], title: response[i] });
                    }
                },
                function (responseError) {
                    console.log(responseError);
                });

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

            vm.tipo_config = {
                valueField: 'value',
                labelField: 'title',
                create: false,
                maxItems: 1,
                placeholder: 'Seleccionar...'
            };
        }

        function save() {

            var file = $scope.imagen;
            var uploadUrl = "../subir_imagen.php";
            var folder = 'necesidades';//$stateParams.id.toString(); //TODO: Revisar esto porque no funciona cuando la necesidad es nueva.
            var fileName = vm.donacion.imagen_path;
            if (file) {
                fileName = file.name;
                fileUpload.uploadFileToUrl(file, uploadUrl, folder)
                    .success(function () {
                        console.log("Acaba de subir la imagen");
                    })
                    .error(function () {
                        console.log("Error al subir la imagen");
                    });
            }

            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            var request = {
                titulo: vm.donacion.titulo,
                necesidad: vm.donacion.necesidad,
                fecha_creacion: fecha,
                fecha_fin: vm.donacion.fecha_fin || null,
                telefono: vm.donacion.telefono,
                facebook: vm.donacion.facebook,
                twitter: vm.donacion.twitter,
                usuario: vm.usuarioLogueado.usuario,
                direccion: vm.donacion.direccion,
                email: vm.donacion.email,
                categoria: vm.donacion.categoria,
                imagen_path: fileName,
                dineroTotal: vm.donacion.dineroTotal,
                dineroRecaudado: vm.donacion.dineroRecaudado,
                usuario_mp: vm.donacion.usuario_mp
            };

            if (!vm.isNew) {
                request.id_necesidad = $stateParams.id;
            }

            ServerService.saveDonacion(request)
                .then(function (response) {
                    console.log(response);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha guardado con éxito!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                },
                function (responseError) {
                    console.log(responseError);
                });
        }

        function subirImagen() {
            var file = $scope.imagenGaleria;
            var uploadUrl = "../subir_imagen.php";
            var folder = 'galeria/' + $stateParams.id;
            var fileName = null;
            if (file) {
                fileName = file.name;
                fileUpload.uploadFileToUrl(file, uploadUrl, folder)
                    .success(function () {
                        console.log("Acaba de subir la imagen");

                        //Esto sirve para listar las imagenes:
                        var fd = new FormData();
                        fd.append('folder', folder);
                        $http.post('../get_files.php', fd, {
                            transformRequest: angular.identity,
                            headers: { 'Content-Type': undefined, 'Process-Data': false }
                        })
                            .success(function (response) {
                                console.log("Lista la imagen");
                                console.log(response);
                            })
                            .error(function (responseError) {
                                console.log("Error al listar la imagen");
                                console.log(responseError);
                            });
                    })
                    .error(function () {
                        console.log("Error al subir la imagen");
                    });
            }
        }
    }
})();




angular
    .module('donarApp').directive('fileModel', ['$parse', '$http', function ($parse, $http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                var carpeta = null;
                if (attrs.fileCarpeta) {
                    carpeta = attrs.fileCarpeta;
                }

                element.bind('change', function () {
                    scope.$apply(function () {
                        var file = null;
                        if (element[0].type && element[0].type === 'file') {
                            modelSetter(scope, element[0].files[0]);
                            file = element[0].files[0];
                        }
                        else {
                            var fileInput = element[0].children[1];
                            modelSetter(scope, fileInput.files[0]);
                            file = fileInput.files[0];
                        }

                        if (carpeta && file) {
                            var fd = new FormData();
                            fd.append('file', file);
                            fd.append('folder', carpeta);
                            $http.post('../subir_imagen.php', fd, {
                                transformRequest: angular.identity,
                                headers: { 'Content-Type': undefined, 'Process-Data': false }
                            })
                                .success(function (response) {
                                    console.log("Lista la imagen");
                                    console.log(response);
                                })
                                .error(function (responseError) {
                                    console.log("Error al listar la imagen");
                                    console.log(responseError);
                                });
                        }

                    });
                });
            }
        };
    }]);

// We can write our own fileUpload service to reuse it in the controller
angular
    .module('donarApp').service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl, folder) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('folder', folder);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Process-Data': false }
            });
        }
    }]);