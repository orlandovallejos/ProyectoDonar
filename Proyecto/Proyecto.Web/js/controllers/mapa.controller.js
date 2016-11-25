(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('MapaController', MapaController);

    MapaController.$inject = ['$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout', 'NgMap'];

    function MapaController($http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout, NgMap) {
        var vm = this;

        //Variables
        //vm.map = {};

        //Methods:
        vm.mostrarPosicion = mostrarPosicion;
        vm.mapaClick = mapaClick;
        vm.showDetail = showDetail;
        vm.hideDetail = hideDetail;
        vm.clicked = clicked;

        activate();

        function activate() {
            //Key:  AIzaSyAwC6bRAW_7P_epNfEg517L2VJF6K6R7MM 

            NgMap.getMap().then(function (map) {
                console.log('map', map);
                vm.map = map;
            });

            vm.donaciones =
                [
                    { id: 1, name: 'donacion test 1', position: [-34.66492800516767, -58.57205388302003] },
                    { id: 2, name: 'donacion test 2', position: [-34.672782153026866, -58.58262062072754] },
                    { id: 3, name: 'donacion test 3', position: [-34.66565241857749, -58.55682849884033] },
                    { id: 4, name: 'donacion test 4', position: [-34.67669971615515, -58.57403755187988] },
                    { id: 5, name: 'donacion test 5', position: [-34.66981738748909, -58.59433650970459] }
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
            console.log(ll.lat() + ' - ' + ll.lng());
        }

        function showDetail(e, donacion) {
            vm.donacion = donacion;
            vm.map.showInfoWindow('foo-iw', donacion.id.toString());
        };

        function hideDetail() {
            vm.map.hideInfoWindow('foo-iw');
        };

        function clicked(don) {
            console.log(don);
        }
    }
})();