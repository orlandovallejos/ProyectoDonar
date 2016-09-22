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