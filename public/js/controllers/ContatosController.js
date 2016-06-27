angular.module('contatooh').controller('ContatosController',
  function($scope, $resource){

    $scope.contatos = [];
    $scope.filtro = '';
    $scope.mensagem = {texto: ''};

    var Contato = $resource('/contatos/:id');

    function buscaContatos() {
      Contato.query(
        function(contatos) {
          $scope.contatos = contatos;
        },
        function(erro) {
          console.log(erro);
          $scope.mensagem = {
              texto: 'Não foi possível obter a lista'
          };
        }
      );
    }
    buscaContatos();

    $scope.remove = function(contato) {
        Contato.delete({id: contato._id}, buscaContatos, function(erro){
            console.log(erro);
            $scope.mensagem = {
                texto: 'Não foi possível remover o contato'
            };
        });
    };
});
