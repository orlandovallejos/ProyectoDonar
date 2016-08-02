angular
    .module('donarApp')
    .controller('numericTextboxCtrl', [
        '$scope',
        function ($scope) {
            $scope.value = 50;
        }
    ]);