angular
    .module('donarApp')
    .controller('top_menuCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        function ($rootScope,$scope,$timeout) {

            $rootScope.toBarActive = true;

            $rootScope.topMenuActive = true;

        }
    ]);