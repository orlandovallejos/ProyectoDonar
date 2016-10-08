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

        //Methods
        vm.buscar = buscar;

        activate();

        function activate() {

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

        function buscar() {
            ServerService.searchDonacion(vm.palabraClave, vm.categoriaSeleccionada)
                .then(function (response) {
                    console.log(response);

                    if (Object.prototype.toString.call(response) === '[object Array]') {
                        vm.donaciones = response;
                    }
                    else {
                        vm.donaciones = [];
                    }
                },
                function (responseError) {
                    console.log(responseError);
                });
        }
    }
})();