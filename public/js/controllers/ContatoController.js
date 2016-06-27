angular.module('contatooh').controller('ContatoController',
  function($scope, $routeParams, $resource) {

    var Contato = $resource('/contatos/:id');
    var _id = $routeParams.contatoId;
    if(_id) {
        Contato.get({id: _id},
            function(contato){
                $scope.contato = contato;
            },
            function(erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível obter o contato.'
                };
                console.log(erro);
            }
        );
    } else {
        $scope.contato = {};
    }
  }
);
