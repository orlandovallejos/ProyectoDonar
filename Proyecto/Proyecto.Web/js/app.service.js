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

    ServerService.$inject = ['$http'];
    function ServerService($http) {
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
            guardarVideo: guardarVideo
        };

        return service;

        function homeGetDonaciones() {
            return $http.get('http://soydonar.com/webservices/webresources/necesidadesHome')
                .then(function (response) {
                    return response.data;
                });
        }

        function login(request) {
            return $http.get('http://soydonar.com/webservices/webresources/Login/' + request.username + '&' + request.password)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(request) {
            return $http.get('http://soydonar.com/webservices/webresources/Register/' + request.username + '&' + request.password + '&' + request.password + '&' + request.name + '&' + request.lastname)
                .then(function (response) {
                    return response.data;
                });
        }

        function getDonacion(id) {
            return $http.get('http://soydonar.com/webservices/webresources/NecesidadInfo/' + id)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
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
                },
                function (responseError) {
                    console.log(responseError);
                    return responseError;
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
                        return response.data;
                    },
                    function (responseError) {
                        console.log(responseError);
                        return responseError;
                    });
            }
            else {
                return $http.post('http://soydonar.com/webservices/webresources/crearNecesidad/alta', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Donacion add');
                        console.log(response);
                        return response.data;
                    },
                    function (responseError) {
                        console.log(responseError);
                        return responseError;
                    });
            }

        }

        function getCategorias() {
            return $http.get('http://soydonar.com/webservices/webresources/verCategorias/')
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function addFavorite(idNecesidad, idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/addFav/' + idNecesidad + '&' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function getFavorites(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/verFavoritos/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function deleteFav(idDonacion, idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/DeleteFav/' + idDonacion + '&' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
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
                },
                function (responseError) {
                    console.log(responseError);
                    return responseError;
                });
        }

        function crearDonacionMP(request) {
            // var request = {
            //     donante: 'paolaservis@yahoo.com',
            //     id_necesidad: '67',
            //     fecha: '2000-05-07',
            //     aporte_monetario: '100',
            //     aporte_donacion: '',
            //     donatario: 'juan@gmail.com'
            // };

            return $http.post('http://soydonar.com/webservices/webresources/CrearDonacion/alta', JSON.stringify(request))
                .then(function (response) {
                    console.log('Donacion edit');
                    console.log(response);
                    return response.data;
                },
                function (responseError) {
                    console.log(responseError);
                    return responseError;
                });
        }

        function getPendienteDonante(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/pendientes/donante/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function getPendienteDonatario(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/pendientes/donatario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function savePendienteDonante(id_donacion) {
            return $http.get('http://soydonar.com/webservices/webresources/donacionGuardarEstado/donante/' + id_donacion)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function savePendienteDonatario(id_donacion) {
            return $http.get('http://soydonar.com/webservices/webresources/donacionGuardarEstado/donatario/' + id_donacion)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function getInfoUsuario(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/infoUsuario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function guardarUsuario(request) {
            return $http.post('http://soydonar.com/webservices/webresources/editUsuario/edit', JSON.stringify(request))
                .then(function (response) {
                    console.log('Usuario edit');
                    console.log(response);
                    return response.data;
                },
                function (responseError) {
                    console.log(responseError);
                    return responseError;
                });
        }

        function getMisDonaciones(idUsuario) {
            return $http.get('http://www.soydonar.com/webservices/webresources/necesidadesPorUsuario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function getFilesInFolder(folder) {
            return $http.get('http://soydonar.com/webservices/webresources/obtenerarchivos/' + folder)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function guardarVideo(request) {
            // var request = {
            //     id_video: '001',
            //     url: 'https://youtu.be/ghABkLllJ74',
            //     comentario: 'Este es un comentario de prueba',
            //     fecha: '2016-09-24',
            //     usuario: '100',
            //     id_necesidad: '2',
            //     titulo: '[PRUEBA] Ladrillos'
            // };

            return $http.post('http://www.soydonar.com/webservices/webresources/CargarVideos', JSON.stringify(request))
                .then(function (response) {
                    console.log('Guardar video');
                    console.log(response);
                    return response.data;
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return responseError;
                });
        }
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