(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'ServerService', '$window', 'SessionStorageService'];

    function HomeController($scope, $rootScope, ServerService, $window, SessionStorageService) {
        var vm = this;

        //Variables
        vm.donaciones = [];
        vm.tipo_config = {};
        vm.tipo_options = [];

        vm.palabraClave = '';
        vm.categoriaSeleccionada = '';
        vm.usuarioLogueado = {};

        //Methods
        vm.buscar = buscar;
        vm.addLike = addLike;

        activate();
        //activate2();

        function activate2() {
            function isPalindrome(input) {
                if (!input || typeof input !== 'string')
                    throw 'Not a string.';
                var string = input.replace(/[^0-9a-zA-Z]+/ig, '').toLowerCase();
                var reverse = string.split('').reverse().join('');

                return string === reverse;

            }

            function longestPalindrome(input) {
                if (!input || typeof input !== 'string')
                    throw 'Not a string.';
                var words = input.split(' ');
                var lengths = [];

                lengths = words.filter(function (e, i, a) {
                    return isPalindrome(e);
                });

                lengths.sort(function (a, b) {
                    return b.length - a.length;
                });

                return lengths[0];
            }

            console.log(isPalindrome('A man, a plan, a cat, a ham, a yak, a yam, a hat, a canal-Panama!')); // returns true
            console.log(longestPalindrome('neuquen manam notApalindrome')); // returns 'neuquen,'


            //Now im gonna test Closures:
            function wrongClosureId(arrayActores) {
                var i;
                for (i = 0; i < arrayActores.length; i++) {
                    arrayActores[i].id = function () {
                        return i;
                    };
                }

                return arrayActores;
            }

            function goodClosureId(arrayActores) {
                var i;
                for (i = 0; i < arrayActores.length; i++) {
                    arrayActores[i].id = (function (j) {
                        return function () {
                            return j;
                        } ();
                    })(i);
                }
            }

            var aActores = [{ nombre: 'stallone', id: 0 }, { nombre: 'brad pitt', id: 0 }, { nombre: 'matt damon', id: 0 }];
            var bActores = [{ nombre: 'stallone', id: 0 }, { nombre: 'brad pitt', id: 0 }, { nombre: 'matt damon', id: 0 }];

            wrongClosureId(aActores);
            goodClosureId(bActores);

            console.log('aActores[0].id()');
            console.log(aActores[0].id());
            console.log('bActores');
            console.log(bActores);
            ///////////////////////////////////////////////////////////////////////////////////////
            //Given a string of size N an a number K. Find the greatest substring with K different characters.


            function verificarPalabra(palabraParam, cantidadK) {
                var palabras = palabraParam.replace(/[^0-9a-zA-Z,]+/ig, '').toLowerCase();
                var k = cantidadK;
                var palabrasArray = palabras.split(',');
                var palabrasConCantidad = [];

                palabrasArray.forEach(function (e, i, a) {
                    var arrayLetras = e.split('');
                    var arrayCant = [];
                    arrayLetras.forEach(function (element, index, array) {

                        if (arrayCant.indexOf(element) === -1) {
                            //No encontró la letra, entonces la agrego:
                            arrayCant.push(element);
                        }
                    });

                    if (arrayCant.length === k) {
                        palabrasConCantidad.push({ palabra: e, cantidad: arrayCant.length });
                    }
                });

                if (palabrasConCantidad.length > 0) {
                    palabrasConCantidad.sort(function (a, b) {
                        return b.palabra.length - a.palabra.length;
                    });

                    console.log('La palabra mas larga con K(' + k + ') elementos es: ' + palabrasConCantidad[0].palabra);
                }
                else {
                    console.log('No hay palabras con K(' + k + ') diferentes letras ');
                }
            }

            verificarPalabra('papas, casa, masaaaaaaAAAAAa', 3);
            verificarPalabra('papas, casa, masaaaaaaaaaa', 4);
            verificarPalabra('papas, casa, masaaaaaaaaaaenrjwnerj', 3);

            ///////////////////////////////////////////////////////////////////////////////////////
        }

        function activate() {
            vm.usuarioLogueado = SessionStorageService.get('usuario');

            vm.tipo_config = {
                valueField: 'value',
                labelField: 'title',
                create: false,
                maxItems: 1,
                placeholder: 'Categoría'
            };

            ServerService.homeGetDonaciones()
                .then(function (data) {
                    console.log(data);
                    vm.donaciones = data;

                    vm.donaciones.forEach(function (e, i, a) {
                        //Valido la no existencia de la imagen:
                        if (e.imagen_path && e.imagen_path.indexOf('.') === -1) {
                            e.imagen_path = 'prueba.png';
                        }

                        e.estaActiva = true;
                        e.fecha_texto = getFormattedDate(new Date(e.fecha_creacion));
                        if (e.fecha_fin) {
                            var _date = new Date();
                            var _fechaFin = new Date(e.fecha_fin);

                            e.fecha_texto_fin = getFormattedDate(_fechaFin);
                            if (_fechaFin >= _date) {
                                e.estaActiva = true;
                            }
                            else {
                                e.estaActiva = false;
                            }
                        }
                    });
                });

            ServerService.getCategorias()
                .then(function (response) {


                    vm.tipo_options = [];
                    //vm.tipo_options.push({ value: '', title: 'Todas' });

                    for (var i = 0; i < response.length; i++) {
                        vm.tipo_options.push({ value: response[i], title: response[i] });
                    }
                },
                function (responseError) {
                    console.log(responseError);
                });
        }

        function getFormattedDate(date) {
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return day + '/' + month + '/' + year;
        }

        function buscar() {
            ServerService.searchDonacion(vm.palabraClave, vm.categoriaSeleccionada)
                .then(function (response) {
                    console.log(response);

                    if (Object.prototype.toString.call(response) === '[object Array]') {
                        vm.donaciones = response;

                        vm.donaciones.forEach(function (e, i, a) {
                            //Valido la no existencia de la imagen:
                            if (e.imagen_path && e.imagen_path.indexOf('.') === -1) {
                                e.imagen_path = 'prueba.png';
                            }

                            e.estaActiva = true;
                            e.fecha_texto = getFormattedDate(new Date(e.fecha_creacion));
                            if (e.fecha_fin) {
                                var _date = new Date();
                                var _fechaFin = new Date(e.fecha_fin);

                                e.fecha_texto_fin = getFormattedDate(_fechaFin);
                                if (_fechaFin >= _date) {
                                    e.estaActiva = true;
                                }
                                else {
                                    e.estaActiva = false;
                                }
                            }
                        });
                    }
                    else {
                        vm.donaciones = [];
                    }
                },
                function (responseError) {
                    console.log(responseError);
                });
        }

        function addLike(id_necesidad) {
            ServerService.addLike(id_necesidad, vm.usuarioLogueado.usuario)
                .then(function (response) {

                    vm.donaciones.forEach(function (e, i, a) {
                        if (e.id_necesidad == id_necesidad) {
                            var cant = parseInt(e.cant_likes);
                            cant++;
                            e.cant_likes = cant;
                        }
                    });

                    console.log(response);
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se agregó el like!',
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