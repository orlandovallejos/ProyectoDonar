(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$rootScope', '$scope', 'user_data', 'SessionStorageService', '$stateParams'];
    function DonacionController($rootScope, $scope, user_data, SessionStorageService, $stateParams) {
        var vm = this;

        //Variables
        vm.user_data = user_data[0];
        vm.user_data_contacts = user_data[0].contact;
        vm.isCreatedUser = false;
        vm.donacion = {
            titulo: 'Una mano para Sarita',
            idUserCreated: 1,
            descripcion: 'Reiciendis laboriosam rerum maiores eveniet voluptate iusto perferendis ut quis doloremque quia eligendi perspiciatis quibusdam ut aspernatur dicta temporibus corporis dolor sequi eum et et a minima sapiente quam quia cum libero soluta et aut ad quia non doloremque quo pariatur neque nihil magni incidunt necessitatibus facere porro dicta est reprehenderit eos quos distinctio consectetur sit sint commodi voluptatem et vel eum optio nulla est aut consectetur dolores omnis incidunt rerum autem sed a sit qui deserunt maxime incidunt voluptatem et consequatur qui magni est deserunt est necessitatibus velit ut in fugiat blanditiis nostrum officiis nesciunt deserunt odio id adipisci rem nam non quia illum sed similique vel perspiciatis.',
            email: 'sarita@gmail.com',
            telefono: '15-3456-2345',
            facebook: '/AyudemosASarita',
            twitter:'@Sarita'
        };

        activate();

        function activate() {
            var usuario = SessionStorageService.get('usuario');
            if (usuario && usuario.usuario === vm.donacion.usuario) {
                vm.isCreatedUser = true;
            }
        }

        //Methods

    }
})();