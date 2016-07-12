var app = angular.module('materializeApp', ['ui.materialize'])
    .controller('BodyController', ["$scope", function ($scope) {
        
    $scope.mostraBotoes = true;
    $scope.mostraInicioOrdem = false;
    $scope.operario;
    
    $scope.inicioOrdem = function () {
     $scope.mostraBotoes = false;
        $scope.mostraInicioOrdem = true;
    }
    
        
        $scope.select = {
            value: "Option1",
            choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
        };
        
   $scope.pesquisaOperario= function () {
       alert($scope.operario);

    }
        
    }]);