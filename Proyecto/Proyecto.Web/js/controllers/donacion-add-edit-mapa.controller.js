(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('DonacionAddEditMapaController', DonacionAddEditMapaController);

    DonacionAddEditMapaController.$inject = ['fileUpload', '$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout', 'NgMap'];

    function DonacionAddEditMapaController(fileUpload, $http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout, NgMap) {
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
        vm.video = {};

        //Methods:
        vm.save = save;
        vm.subirImagen = subirImagen;
        vm.getYTLink = getYTLink;
        vm.subirVideo = subirVideo;

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
            if (!vm.usuarioLogueado) {
                $state.go('restricted.home');
            }

            if ($stateParams.id) {
                vm.isNew = false;

                ServerService.getDonacion($stateParams.id)
                    .then(function (data) {
                        console.log(data);
                        vm.donacion = data;

                        if (vm.usuarioLogueado && vm.usuarioLogueado.usuario !== vm.donacion.usuario) {
                            UIkit.notify({
                                message: '<i class="uk-icon-times-circle"></i> No tiene permisos para editar esta necesidad.',
                                status: 'danger',
                                timeout: 5000,
                                pos: 'top-right'
                            });

                            $state.go('restricted.home');
                            vm.isCreatedUser = false;

                            return;
                        }

                        //Valido la no existencia de la imagen:
                        if (vm.donacion.imagen_path && vm.donacion.imagen_path.indexOf('.') === -1) {
                            vm.donacion.imagen_path = 'prueba.png';
                        }

                        //Valido la conversion del nro que viene desde el server:
                        if (vm.donacion.dineroTotal && vm.donacion.dineroTotal.replace(/[^.,0-9]/ig, '').length > 0) {
                            vm.donacion.dineroTotal = parseFloat(vm.donacion.dineroTotal);
                        }

                        //Maps magic:
                        //This should come from server:
                        vm.donacion.latitud = -34.66492800516767;
                        vm.donacion.longitud = -58.57205388302003;

                        ServerService.getFilesInFolder('galeria-' + $stateParams.id)
                            .then(function (data) {
                                vm.images = data;
                            });

                        ServerService.getVideos($stateParams.id)
                            .then(function (data) {
                                vm.videos = data;
                            });

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

                // vm.blog_articles = [];
                // $http({ method: 'GET', url: 'data/blog_articles.json' })
                //     .then(function (data) {
                //         vm.blog_articles = data.data;
                //         console.log('Videos:');
                //         console.log(data.data);
                //     });
            }
            else {

                vm.donacion.avatar = vm.usuarioLogueado.imagen_path;
                vm.donacion.cant_likes = 0;
                vm.donacion.cant_fotos = 0;
                vm.donacion.cant_favs = 0;
                vm.isCreatedUser = true;

                navigator.geolocation.getCurrentPosition(
                    function (pos) {
                        var crd = pos.coords;

                        vm.donacion.latitud = crd.latitude;
                        vm.donacion.longitud = crd.longitude;
                    },
                    function error(err) {
                        console.warn('ERROR(' + err.code + '): ' + err.message);

                        //Posicion por defecto en caso de que los mapas no funcionen.
                        vm.donacion.latitud = -34.60832672898665;
                        vm.donacion.longitud = -58.37232587093507;
                    },
                    {
                        enableHighAccuracy: false,
                        timeout: 2000,
                        maximumAge: 6000000
                    });

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
            var fileName = vm.donacion.imagen_path || 'prueba.png';
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

            NgMap.getMap()
                .then(function (map) {
                    vm.donacion.latitud = map.markers[0].position.lat();
                    vm.donacion.longitud = map.markers[0].position.lng();

                    console.log(vm.donacion);

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

                    if (!request.titulo || !request.necesidad || !request.usuario) {
                        UIkit.notify({
                            message: '<i class="uk-icon-times-circle"></i> El título y la necesidad son requeridos',
                            status: 'danger',
                            timeout: 5000,
                            pos: 'top-right'
                        });

                        return;
                    }

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

                ServerService.getFilesInFolder('galeria-' + $stateParams.id)
                    .then(function (data) {
                        vm.images = data;
                    });
            }, 3000);
        }

        function getYTLink(src) {
            //return 'https://www.youtube.com/v/' + src + '?rel=0';
            return src.replace("watch?v=", "embed/");
            //https://www.youtube.com/embed/VIDEO_ID
            //"https://www.youtube.com/watch?v=czmulJ9NBP0"
        };

        function subirVideo() {
            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            if (!vm.video.descripcion) {
                vm.video.descripcion = '';
            }

            if (!vm.video.titulo) {
                vm.video.titulo = '';
            }

            if (!vm.video.url) {
                vm.video.url = '';
            }

            var request = {
                url: vm.video.url,
                comentario: vm.video.descripcion,
                fecha: fecha,
                usuario: vm.usuarioLogueado.usuario,
                id_necesidad: vm.donacion.id_necesidad,
                titulo: vm.video.titulo
            };

            var tituloLimpio = vm.video.titulo.replace(/[ ]/ig, '');
            var descripcionLimpio = vm.video.descripcion.replace(/[ ]/ig, '');
            var urlLimpio = vm.video.url.replace(/[ ]/ig, '');
            if (tituloLimpio.length === 0 || descripcionLimpio.length === 0 || urlLimpio.length === 0) {
                UIkit.notify({
                    message: '<i class="uk-icon-times-circle"></i> El título, la descripcion y la URL son requeridos',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-right'
                });

                return;
            }

            ServerService.guardarVideo(request)
                .then(function (response) {
                    console.log(response);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha guardado el video!',
                        status: 'success',
                        //timeout: 5000,
                        pos: 'top-right'
                    });

                    vm.video.titulo = '';
                    vm.video.descripcion = '';
                    vm.video.url = '';
                })
                .catch(function (responseError) {
                    console.log(responseError);
                });
        }

        $scope.subirImagen = subirImagen;
    }
})();