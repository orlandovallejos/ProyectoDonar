(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('MapaController', MapaController);

    MapaController.$inject = ['$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout', 'NgMap'];

    function MapaController($http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout, NgMap) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = {};

        //Methods:
        vm.mostrarPosicion = mostrarPosicion;

        activate();

        function activate() {
            //Key:  AIzaSyAwC6bRAW_7P_epNfEg517L2VJF6K6R7MM 
            // vm.usuarioLogueado = SessionStorageService.get('usuario');
            // if (!vm.usuarioLogueado) {
            //     $state.go('restricted.home');
            // }
        }

        function mostrarPosicion() {
            NgMap.getMap()
                .then(function (map) {
                    console.log(map.getCenter());
                    console.log('markers', map.markers);
                    console.log('shapes', map.shapes);

                    console.log('latitud: ', map.markers[0].position.lat());
                    console.log('longitud: ', map.markers[0].position.lng());

                    // map.markers.forEach(function (e, i, a) {
                    //     console.log('latitud: ', e.position.lat());
                    //     console.log('longitud: ', e.position.lng());
                    // });
                });
        }
    }
})();