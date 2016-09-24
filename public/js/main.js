angular.module('contatooh', ['ngRoute', 'ngResource'])
.config(function($routeProvider, $httpProvider){

  $httpProvider.interceptors.push('meuInterceptor');

  $routeProvider
  .when('/auth', {
    templateUrl: 'partials/auth.html'
  })
  .when('/contatos', {
    templateUrl: 'partials/contatos.html',
    controller: 'ContatosController'
  })
  .when('/contato/:contatoId', {
    templateUrl: 'partials/contato.html',
    controller: 'ContatoController'
  })
  .when('/contato', {
    templateUrl: 'partials/contato.html',
    controller: 'ContatoController'
  })
  .otherwise({redirectTo: '/contatos'});
});
