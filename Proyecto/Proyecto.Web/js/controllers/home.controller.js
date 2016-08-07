/*
 *  Altair Admin angularjs
 *  controller
 */
(function () {
    "use strict";

    angular
    .module('donarApp')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope'];

    function HomeController($scope, $rootScope) {
        var vm = this;

        vm.donaciones = [
        {
            titulo: "Dolores atque quibusdam enim sed aperiam",
            descripcion: "Omnis ipsum sunt similique sit eum fugiat incidunt sit sunt quis eveniet quo qui et et mollitia laboriosam ut voluptatum ut.",
            fecha: "10/07/2016",
            likes: 160,
            comentarios: 23,
            imagen: "assets/img/temp/poor1.jpg"
        },
        {
            titulo: "Dolores atque quibusdam enim sed aperiam",
            descripcion: "Omnis ipsum sunt similique sit eum fugiat incidunt sit sunt quis eveniet quo qui et et mollitia laboriosam ut voluptatum ut.",
            fecha: "10/07/2016",
            likes: 160,
            comentarios: 23,
            imagen: "assets/img/temp/poor1.jpg"
        },
        {
            titulo: "Dolores atque quibusdam enim sed aperiam",
            descripcion: "Omnis ipsum sunt similique sit eum fugiat incidunt sit sunt quis eveniet quo qui et et mollitia laboriosam ut voluptatum ut.",
            fecha: "10/07/2016",
            likes: 160,
            comentarios: 23,
            imagen: "assets/img/temp/poor1.jpg"
        }];

        
    }
})();