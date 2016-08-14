(function(){
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
            getDonacion:getDonacion
        };

        return service;

        function homeGetDonaciones() {
            return $http.get('http://soydonar.com/webservices/webresources/necesidadesHome')
                .then(function (response) {
                    return response.data;
                });
        }

        function login(request) {
            //request = {
            //    username: 'juan@gmail.com',
            //    password: '1234'
            //};

            //Esto en realidad tiene que ser un post, pero esto es sólo de prueba:
            return $http.get('http://soydonar.com/webservices/webresources/Login/' + request.username + '&' + request.password)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(request) {

            //Esto en realidad tiene que ser un post, pero esto es sólo de prueba:
            return $http.get('http://soydonar.com/webservices/webresources/Register/' + request.username + '&' + request.password + '&' + request.password + '&' + request.name + '&' + request.lastname)
                .then(function (response) {
                    return response.data;
                });
        }

        function getDonacion(id) {

            //Este es un comentario.
            return $http.get('data/donar/home_donaciones.json')
                .then(function (response) {
                    return response.data;
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