angular.module('contatooh').controller('ContatoController',
  function($scope, $routeParams, Contato) {

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
        $scope.contato = new Contato();
    }

    $scope.salva = function() {
        $scope.contato.$save()
        .then(function(){
            $scope.mensagem = {texto: "Salvo com sucesso."}
            $scope.contato = new Contato();
        })
        .catch(function(erro){
            $scope.mensagem = {texto: "Não foi possível salvar."}
        });
    };

    Contato.query(function(contatos){
        $scope.contatos = contatos;
    });
  }
);
