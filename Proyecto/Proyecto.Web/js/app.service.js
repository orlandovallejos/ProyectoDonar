(function () {
    'use strict';

    angular
        .module('donarApp')
        .service('detectBrowser', [
            '$window',
            function ($window) {
                // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
                return function () {
                    var userAgent = $window.navigator.userAgent,
                        browsers = {
                            chrome: /chrome/i,
                            safari: /safari/i,
                            firefox: /firefox/i,
                            ie: /internet explorer/i
                        };

                    for (var key in browsers) {
                        if (browsers[key].test(userAgent)) {
                            return key;
                        }
                    }
                    return 'unknown';
                }
            }
        ])
        .service('preloaders', [
            '$rootScope',
            '$timeout',
            'utils',
            function ($rootScope, $timeout, utils) {
                $rootScope.content_preloader_show = function (style, container) {
                    var $body = $('body');
                    if (!$body.find('.content-preloader').length) {
                        var image_density = utils.isHighDensity() ? '@2x' : '';

                        var preloader_content = (typeof style !== 'undefined' && style == 'regular')
                            ? '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="32" height="32">'
                            : '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="32" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';

                        var thisContainer = (typeof container !== 'undefined') ? container : $body;

                        thisContainer.append('<div class="content-preloader">' + preloader_content + '</div>');
                        $timeout(function () {
                            $('.content-preloader').addClass('preloader-active');
                        });
                    }
                };
                $rootScope.content_preloader_hide = function () {
                    var $body = $('body');
                    if ($body.find('.content-preloader').length) {
                        // hide preloader
                        $('.content-preloader').removeClass('preloader-active');
                        // remove preloader
                        $timeout(function () {
                            $('.content-preloader').remove();
                        }, 500);
                    }
                };

            }
        ])
        .factory('ServerService', ServerService)
        .factory('SessionStorageService', SessionStorageService);

    ServerService.$inject = ['$http', '$q'];
    function ServerService($http, $q) {
        var service = {
            homeGetDonaciones: homeGetDonaciones,
            login: login,
            register: register,
            getDonacion: getDonacion,
            addComment: addComment,
            saveDonacion: saveDonacion,
            getCategorias: getCategorias,
            addFavorite: addFavorite,
            getFavorites: getFavorites,
            deleteFav: deleteFav,
            searchDonacion: searchDonacion,
            crearDonacionMP: crearDonacionMP,
            // deletePendienteDonante = deletePendienteDonante,
            // deletePendienteDonatario = deletePendienteDonatario,
            getPendienteDonante: getPendienteDonante,
            getPendienteDonatario: getPendienteDonatario,
            savePendienteDonante: savePendienteDonante,
            savePendienteDonatario: savePendienteDonatario,
            getInfoUsuario: getInfoUsuario,
            guardarUsuario: guardarUsuario,
            getMisDonaciones: getMisDonaciones,
            getFilesInFolder: getFilesInFolder,
            guardarVideo: guardarVideo,
            getVideos: getVideos,
            guardarResultado: guardarResultado,
            getResultado: getResultado,
            mostrarNotificaciones: mostrarNotificaciones,
            deleteNotificacion: deleteNotificacion,
            donacionesConcretadas: donacionesConcretadas
        };

        return service;

        function parsearError(responseError) {
            var errores = {
                699: 'Usuario o contraseña invalida',
                700: 'Usuario nulo',
                701: 'Usuario mayor a 35',
                702: 'El usuario ya existe',
                703: 'Contaseña no puede ser vacía o mayor a 8 caracteres',
                704: 'Nombre nulo o mayor a 20',
                705: 'Apellido nulo o mayor a 30',
                706: 'Nacionalidad nula',
                707: 'Nacionalidad mayor a 30',
                708: 'Residencia nula',
                709: 'Residancia mayor a 50',
                710: 'El mail no es un valor correcto',
                711: 'No existen necesidades',
                713: 'En el registro no coinciden las pass',
                714: 'Error inesperado',
                715: 'El usuario no existe',
                716: 'Teléfono mayor a 13',
                717: 'Facebook mayor a 25',
                718: 'Twitter  mayor a 16',
                719: 'Fecha nacimiento mayor a 10',
                720: 'Necesidad nula',
                721: 'Necesidad mayor a 1000',
                722: 'No existen donaciones pendientes',
                723: 'Fecha creacion de nec nula',
                724: 'Fecha creacion de nec mayor a 10',
                725: 'Fecha fin de nec mayor a 10',
                726: 'Titulo nec nulo',
                727: 'Titulo mayor a 25',
                728: 'Direccion  nula',
                729: 'Direccion mayor a 50',
                730: 'Email nulo',
                731: 'Día y horario mayor a 50',
                732: 'Usuario_mp mayor a 40',
                733: 'Dinero total mayor a 12',
                734: 'Comentario demasiado extenso',
                735: 'Aporte donacion extenso',
                736: 'Resultado nulo',
                737: 'Resultado mayor a 200',
                738: 'Titulo nulo',
                739: 'Titulo mayor a 100',
                740: 'Fecha nula',
                741: 'Id de necesidad nulo',
                742: 'No hay resultado',
                743: 'No hay donaciones concretadas',
                744: 'No hay donaciones no concretadas',
                745: 'Monto recaudado nulo',
                746: 'Error al guardar una notificacion'
            };

            if (responseError && responseError.status) {
                return errores[responseError.status];
            }

            return responseError;
        }

        function homeGetDonaciones() {
            return $http.get('http://soydonar.com/webservices/webresources/necesidadesHome')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error homeGetDonaciones');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function login(request) {
            return $http.get('http://soydonar.com/webservices/webresources/Login/' + request.username + '&' + request.password)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error login');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function register(request) {
            return $http.get('http://soydonar.com/webservices/webresources/Register/' + request.username + '&' + request.password + '&' + request.password + '&' + request.name + '&' + request.lastname)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error register');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function getDonacion(id) {
            return $http.get('http://soydonar.com/webservices/webresources/NecesidadInfo/' + id)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error getDonacion');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function addComment(request) {

            console.log('Entra al servicio de comentario:');
            console.log(request);

            return $http.post('http://soydonar.com/webservices/webresources/Comment/post1', JSON.stringify(request))
                .then(function (response) {
                    console.log('Comentario');
                    console.log(response);
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error addComment');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function saveDonacion(request) {

            console.log('Entra al servicio de save de donacion:');
            console.log(request);

            if (request.id_necesidad) {
                return $http.post('http://soydonar.com/webservices/webresources/editNecesidad/edit', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Donacion edit');
                        console.log(response);
                        return $q.resolve(response.data);
                    })
                    .catch(function (responseError) {
                        console.log('Error edit saveDonacion');
                        console.log(responseError);
                        return $q.reject(parsearError(responseError));
                    });
            }
            else {
                return $http.post('http://soydonar.com/webservices/webresources/crearNecesidad/alta', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Donacion add');
                        console.log(response);
                        return $q.resolve(response.data);
                    })
                    .catch(function (responseError) {
                        console.log('Error add saveDonacion');
                        console.log(responseError);
                        return $q.reject(parsearError(responseError));
                    });
            }
        }

        function getCategorias() {
            return $http.get('http://soydonar.com/webservices/webresources/verCategorias/')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error getCategorias');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function addFavorite(idNecesidad, idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/addFav/' + idNecesidad + '&' + idUsuario)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error addFavorite');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function getFavorites(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/verFavoritos/' + idUsuario)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error getFavorites');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function deleteFav(idDonacion, idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/DeleteFav/' + idDonacion + '&' + idUsuario)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error deleteFav');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function searchDonacion(filtro, categoria) {
            var request = {
                tipo: 'all',
                clave: filtro,
                categoria: (categoria && categoria != '') ? categoria : 'todas'
            };
            return $http.post('http://soydonar.com/webservices/webresources/filtro/Nec', JSON.stringify(request))
                .then(function (response) {
                    console.log('Search');
                    console.log(response);
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error searchDonacion');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function crearDonacionMP(request) {
            return $http.post('http://soydonar.com/webservices/webresources/CrearDonacion/alta', JSON.stringify(request))
                .then(function (response) {
                    console.log('Donacion edit');
                    console.log(response);
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error crearDonacionMP');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function getPendienteDonante(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/pendientes/donante/' + idUsuario)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error getPendienteDonante');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function getPendienteDonatario(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/pendientes/donatario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error getPendienteDonatario');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function savePendienteDonante(id_donacion) {
            return $http.get('http://soydonar.com/webservices/webresources/donacionGuardarEstado/donante/' + id_donacion)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error savePendienteDonante');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function savePendienteDonatario(id_donacion) {
            return $http.get('http://soydonar.com/webservices/webresources/donacionGuardarEstado/donatario/' + id_donacion)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error savePendienteDonatario');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function getInfoUsuario(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/infoUsuario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error getInfoUsuario');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function guardarUsuario(request) {
            return $http.post('http://soydonar.com/webservices/webresources/editUsuario/edit', JSON.stringify(request))
                .then(function (response) {
                    console.log('Usuario edit');
                    console.log(response);
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log('Error guardarUsuario');
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function getMisDonaciones(idUsuario) {
            return $http.get('http://www.soydonar.com/webservices/webresources/necesidadesPorUsuario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (responseError) {
                        console.log('Error getMisDonaciones');
                        console.log(responseError);
                        return $q.reject(parsearError(responseError));
                    });
        }

        function getFilesInFolder(folder) {
            var fd = new FormData();
            fd.append('folder', folder.replace(/[-]/g, '/'));
            $http.post('../crear_carpeta.php', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Process-Data': false }
            })
                .success(function (response) {
                    // console.log("Carpeta creada");
                    // console.log(response);
                })
                .error(function (responseError) {
                    // console.log("Error al crear la carpeta");
                    // console.log(responseError);
                });

            return $http.get('http://soydonar.com/webservices/webresources/obtenerarchivos/' + folder)
                .then(function (response) {
                    return $q.resolve(response.data);
                },
                function (responseError) {
                    return $q.reject(parsearError(responseError));
                });
        }

        function guardarVideo(request) {
            return $http.post('http://www.soydonar.com/webservices/webresources/CargarVideos2/carga', JSON.stringify(request))
                .then(function (response) {
                    console.log('Guardar video');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function getVideos(id_necesidad) {
            return $http.get('http://www.soydonar.com/webservices/webresources/verVideos/' + id_necesidad)
                .then(function (response) {
                    console.log('Get videos');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function guardarResultado(request) {
            if (!request.id) {
                return $http.post('http://www.soydonar.com/webservices/webresources/addResultado/alta', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Add resultado');
                        console.log(response);
                        return $q.resolve(response.data);
                    })
                    .catch(function (responseError) {
                        console.log(responseError);
                        return $q.reject(parsearError(responseError));
                    });
            }
            else {
                return $http.post('http://www.soydonar.com/webservices/webresources/editResultado', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Edit resultado');
                        console.log(response);
                        return $q.resolve(response.data);
                    })
                    .catch(function (responseError) {
                        console.log(responseError);
                        return $q.reject(parsearError(responseError));
                    });
            }
        }

        function getResultado(id_necesidad) {
            return $http.get('http://www.soydonar.com/webservices/webresources/verResultado/' + id_necesidad)
                .then(function (response) {
                    console.log('Get resultado');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function mostrarNotificaciones(usuario) {
            return $http.get('http://www.soydonar.com/webservices/webresources/MostrarNotificaciones/' + usuario)
                .then(function (response) {
                    console.log('Get notificaciones');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function deleteNotificacion(id_notificacion) {
            return $http.get('http://www.soydonar.com/webservices/webresources/DeleteNotificacion/' + id_notificacion)
                .then(function (response) {
                    console.log('delete notificaciones');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }

        function donacionesConcretadas(usuario) {
            return $http.get('http://soydonar.com/webservices/webresources/DonacionesConcretadas/' + usuario)
                .then(function (response) {
                    console.log('Get notificaciones');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(parsearError(responseError));
                });
        }
        //
    }

    SessionStorageService.$inject = ['$window'];
    function SessionStorageService($window) {
        var service = {
            set: set,
            get: get,
            remove: remove,
            clear: clear
        };

        return service;

        function set(key, value) {
            $window.sessionStorage.setItem(key, JSON.stringify(value));
        }

        function get(key) {
            return JSON.parse($window.sessionStorage.getItem(key));
        }

        function remove(key) {
            $window.sessionStorage.removeItem(key);
        }

        function clear() {
            $window.sessionStorage.clear();
        }
    }
})();