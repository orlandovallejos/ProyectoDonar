(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('GeoMapaController', GeoMapaController);

    GeoMapaController.$inject = ['$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout', 'NgMap'];

    function GeoMapaController($http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout, NgMap) {
        var vm = this;

        //Variables
        //vm.map = {};


        //Methods:
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

                //console.log('markers', map.markers);

                if (vm.map.markers[0].position.lat() == 0 && vm.map.markers[0].position.lng() == 0) {
                    var latlng = new google.maps.LatLng(-34.66964091000385, -58.562965393066406);
                    vm.map.markers[0].setPosition(latlng);
                    vm.map.setCenter(latlng);
                }

                // navigator.geolocation.getCurrentPosition(
                //     function (pos) {
                //         var crd = pos.coords;
                //         // vm.donacion.latitud = crd.latitude;
                //         // vm.donacion.longitud = crd.longitude;
                //     },
                //     function error(err) {
                //         console.warn('ERROR(' + err.code + '): ' + err.message);

                //         //Posicion por defecto en caso de que los mapas no funcionen.
                //         var latlng = new google.maps.LatLng(-34.66964091000385, -58.562965393066406);
                //         map.markers[0].setPosition(latlng);
                //     },
                //     {
                //         enableHighAccuracy: false,
                //         timeout: 2000,
                //         maximumAge: 6000000
                //     });
            });

            ServerService.homeGetDonaciones()
                .then(function (data) {
                    console.log(data);
                    vm.donaciones = data;

                    vm.donaciones.forEach(function (e, i, a) {
                        //Valido la no existencia de la imagen:
                        if (e.imagen_path && e.imagen_path.indexOf('.') === -1) {
                            e.imagen_path = 'prueba.png';
                        }

                        if (i == 0) {
                            e.position = [-34.66492800516767, -58.57205388302003];
                        }
                        if (i == 1) {
                            e.position = [-34.672782153026866, -58.58262062072754];
                        }
                        if (i == 2) {
                            e.position = [-34.66565241857749, -58.55682849884033];
                        }
                        if (i == 3) {
                            e.position = [-34.67669971615515, -58.57403755187988];
                        }
                        if (i == 4) {
                            e.position = [-34.66981738748909, -58.59433650970459];
                        }
                        if (i == 5) {
                            e.position = [-34.679664235346756 - -58.626136779785156];
                        }
                        if (i == 6) {
                            e.position = [-34.68305212733052 - -58.53532791137695];
                        }
                        if (i == 7) {
                            e.position = [-34.642388276457744 - -58.54717254638672];
                        }
                        if (i == 8) {
                            e.position = [-34.644647902773045 - -58.62098693847656];
                        }
                    });
                });
        }

        function mapaClick(event) {
            var ll = event.latLng;
            console.log(ll.lat() + ' - ' + ll.lng());
        }

        function showDetail(e, donacion) {
            vm.donacion = donacion;
            vm.map.showInfoWindow('foo-iw', donacion.id_necesidad.toString());
        };

        function hideDetail() {
            vm.map.hideInfoWindow('foo-iw');
        };

        function clicked(don) {
            console.log(don);
        }
    }
})();