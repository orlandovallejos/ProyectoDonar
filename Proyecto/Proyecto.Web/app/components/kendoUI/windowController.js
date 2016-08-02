angular
    .module('donarApp')
    .controller('windowCtrl', [
        '$scope',
        function ($scope) {
            $scope.hello = "Hello from Controller!";
        }
    ]);