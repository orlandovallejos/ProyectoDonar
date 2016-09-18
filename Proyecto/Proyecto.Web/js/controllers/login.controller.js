(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', 'utils', 'ServerService', '$window', 'SessionStorageService'];

    function LoginController($scope, $rootScope, $state, utils, ServerService, $window, SessionStorageService) {
        var vm = this;

        //Variables
        vm.registerFormActive = false;
        vm.login_username = '';
        vm.login_password = '';
        vm.register_username = '';
        vm.register_password = '';
        vm.register_password_repeat = '';
        vm.register_name = '';
        vm.register_lastname = '';

        var $login_card = $('#login_card'),
            $login_form = $('#login_form'),
            $login_help = $('#login_help'),
            $register_form = $('#register_form'),
            $login_password_reset = $('#login_password_reset');

        // show login form (hide other forms)
        var login_form_show = function () {
            $login_form
                .show()
                .siblings()
                .hide();
        };

        // show register form (hide other forms)
        var register_form_show = function () {
            $register_form
                .show()
                .siblings()
                .hide();
        };

        // show login help (hide other forms)
        var login_help_show = function () {
            $login_help
                .show()
                .siblings()
                .hide();
        };

        // show password reset form (hide other forms)
        var password_reset_show = function () {
            $login_password_reset
                .show()
                .siblings()
                .hide();
        };

        //Methods
        vm.loginHelp = loginHelp;
        vm.backToLogin = backToLogin;
        vm.registerForm = registerForm;
        vm.passwordReset = passwordReset;
        vm.login = login;
        vm.register = register;

        activate();

        function activate() {
            SessionStorageService.clear();
        }

        //Method definitions
        function loginHelp($event) {
            $event.preventDefault();
            utils.card_show_hide($login_card, undefined, login_help_show, undefined);
        };

        function backToLogin($event) {
            $event.preventDefault();
            $scope.registerFormActive = false;
            utils.card_show_hide($login_card, undefined, login_form_show, undefined);
        };

        function registerForm($event) {
            $event.preventDefault();
            $scope.registerFormActive = true;
            utils.card_show_hide($login_card, undefined, register_form_show, undefined);
        };

        function passwordReset($event) {
            $event.preventDefault();
            utils.card_show_hide($login_card, undefined, password_reset_show, undefined);
        };

        function login() {
            var request = {
                username: vm.login_username,
                password: vm.login_password
            };

            ServerService.login(request)
                .then(function (response) {
                    console.log(response);
                    if (response.contrasenia) {
                        SessionStorageService.set('usuario', response);

                        $state.go('restricted.home');
                    }
                });
        }

        function register() {
            var request = {
                username: vm.register_username,
                password: vm.register_password,
                name: vm.register_name,
                lastname: vm.register_lastname
            };

            ServerService.register(request)
                .then(function () {
                    //Redireccionar al login.
                    login_form_show();

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha registrado con éxito!\nIngrese al sistema.',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                });
        }
    }
})();