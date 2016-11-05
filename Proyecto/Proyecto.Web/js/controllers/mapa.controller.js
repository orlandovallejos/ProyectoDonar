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
        vm.mapaClick = mapaClick;

        activate();

        function activate() {
            //Key:  AIzaSyAwC6bRAW_7P_epNfEg517L2VJF6K6R7MM 
            // vm.usuarioLogueado = SessionStorageService.get('usuario');
            // if (!vm.usuarioLogueado) {
            //     $state.go('restricted.home');
            // }

            vm.positions =
                [
                    { lat: -34.66492800516767, lng: -58.57205388302003 },
                    { lat: -34.672782153026866, lng: -58.58262062072754 },
                    { lat: -34.66565241857749, lng: -58.55682849884033 },
                    { lat: -34.67669971615515, lng: -58.57403755187988 },
                    { lat: -34.66981738748909, lng: -58.59433650970459 }
                ];
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

        function mapaClick(event) {
        var ll = event.latLng;
        console.log(ll.lat()+' - '+ ll.lng());
      }
    }
})();