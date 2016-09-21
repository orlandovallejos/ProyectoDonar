(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'ServerService', '$window', 'SessionStorageService'];

    function HomeController($scope, $rootScope, ServerService, $window, SessionStorageService) {
        var vm = this;

        vm.donaciones = [];
        vm.tipo_config = {};
        vm.tipo_options = [];
        vm.categoriaSeleccionada = {};

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
    }
})();