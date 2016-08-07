(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', 'utils', 'ServerService'];
    function LoginController($scope, $rootScope, utils, ServerService) {
        var vm = this;

        //Variables
        vm.registerFormActive = false;
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
    }
})();