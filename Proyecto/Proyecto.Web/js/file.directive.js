angular
    .module('donarApp').directive('fileModel', ['$parse', '$http', function ($parse, $http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                var carpeta = null;
                if (attrs.fileCarpeta) {
                    carpeta = attrs.fileCarpeta;
                }

                element.bind('change', function () {
                    scope.$apply(function () {
                        var file = null;

                        if (element[0] && element[0].attributes.length > 0 && element[0].attributes['file-carpeta']) {
                            carpeta = element[0].attributes['file-carpeta'].nodeValue;
                        }

                        if (element[0].type && element[0].type === 'file') {
                            modelSetter(scope, element[0].files[0]);
                            file = element[0].files[0];
                        }
                        else {
                            var fileInput = element[0].children[1];
                            modelSetter(scope, fileInput.files[0]);
                            file = fileInput.files[0];
                        }

                        if (carpeta && file) {
                            var fd = new FormData();
                            fd.append('file', file);
                            fd.append('folder', carpeta);
                            $http.post('../subir_imagen.php', fd, {
                                transformRequest: angular.identity,
                                headers: { 'Content-Type': undefined, 'Process-Data': false }
                            })
                                .success(function (response) {
                                    console.log("Lista la imagen");
                                    console.log(response);
                                })
                                .error(function (responseError) {
                                    console.log("Error al listar la imagen");
                                    console.log(responseError);
                                });
                        }

                    });
                });
            }
        };
    }]);

// We can write our own fileUpload service to reuse it in the controller
angular
    .module('donarApp').service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl, folder) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('folder', folder);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Process-Data': false }
            });
        }
    }]);